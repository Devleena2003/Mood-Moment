import pandas as pd
from pymongo import MongoClient
from bson import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Function to load the dataset from CSV
def load_dataset(csv_file_path):
    # Read the CSV file with specified delimiter and quoting to handle paths with commas
    df = pd.read_csv(csv_file_path, delimiter=',', quotechar="'", engine='python')
    
    # Replace empty strings with NaN in the 'Accessory_Path' column
    df['Accessory_Path'] = df['Accessory_Path'].replace('', np.nan)
    
    return df

# Function to fetch user preferences and events from MongoDB
def fetch_user_preferences(user_id, db):
    preferences_collection = db["users"]
    user_preferences = preferences_collection.find_one({"_id": ObjectId(user_id)})
    if user_preferences is None:
        raise ValueError(f"No user found with ID {user_id}")
    
    # Fetch preferred colors and styles
    preferred_colors = user_preferences.get("preferredColors", [])
    preferred_styles = user_preferences.get("preferredStyles", [])
    
    return preferred_colors, preferred_styles

# Function to perform recommendations based on user preferences and events
def get_recommendations(event, preferred_colors, preferred_styles, df, vectorizer, tfidf_matrix):
    # Filter dataset based on the event
    event_df = df[df['Event'].str.lower() == event.lower()]
    
    if event_df.empty:
        return []  # No recommendations found for the given event
    
    # Generate queries based on event, preferred colors, and styles
    queries = [f"{event} {color} {style}" for color in preferred_colors for style in preferred_styles]
    
    similarities = []
    for query in queries:
        query_vec = vectorizer.transform([query])
        similarity = cosine_similarity(query_vec, tfidf_matrix[event_df.index]).flatten()
        similarities.append(similarity)
    
    combined_similarity = np.sum(similarities, axis=0)
    
    if combined_similarity.size == 0:
        return []  # No recommendations found
    
    # Get indices of top recommendations based on similarity
    indices = np.argsort(-combined_similarity)[:5]  # Get up to 5 recommendations
    
    recommendations = event_df.iloc[indices]
    return recommendations[['Dress_Path', 'Accessory_Path', 'Color', 'Style']].values.tolist()

# Function to fetch all user IDs from MongoDB
def fetch_all_user_ids(db):
    preferences_collection = db["users"]
    user_ids = preferences_collection.find({}, {"_id": 1})
    return [str(user["_id"]) for user in user_ids]

# Main function
def main(user_ids, event):
    csv_file_path = 'closet_info_new.csv'  # Path to your existing CSV file
    df = load_dataset(csv_file_path)
    
    client = MongoClient("mongodb+srv://devleena2003:ifGmK9Hxf9RayupH@cluster0.zmv03yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["test"]  # Ensure correct database name
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df[['Event', 'Color', 'Style']].apply(lambda x: ' '.join(x), axis=1))
    
    recommendations = []
    for user_id in user_ids:
        try:
            preferred_colors, preferred_styles = fetch_user_preferences(user_id, db)
            
            # Perform recommendation based on user preferences and events
            user_recommendations = get_recommendations(event, preferred_colors, preferred_styles, df, vectorizer, tfidf_matrix)
            
            # Print user preferred colors and styles
            print(f"User ID: {user_id}")
            print(f"Preferred Colors: {', '.join(preferred_colors)}")
            print(f"Preferred Styles: {', '.join(preferred_styles)}")
            
            # Print recommendations
            print("Recommended Images:")
            for dress_path, accessory_path, color, style in user_recommendations:
                print(f"Dress Path: {dress_path}")
                print(f"Accessory Path: {accessory_path}")
                print(f"Color: {color}")
                print(f"Style: {style}")
                print("--------------------")
            
            recommendations.extend(user_recommendations)
        
        except ValueError as e:
            print(e)
            continue
    
    return recommendations

# Example usage
if __name__ == "__main__":
    import sys
    
    client = MongoClient("mongodb+srv://devleena2003:ifGmK9Hxf9RayupH@cluster0.zmv03yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["test"]  # Ensure correct database name
    
    # Fetch and display all user IDs
    try:
        user_ids = fetch_all_user_ids(db)
        print("Available User IDs:")
        for i, uid in enumerate(user_ids, 1):
            print(f"{i}: {uid}")
    except Exception as e:
        print(f"Error fetching user IDs: {e}")
        sys.exit(1)
    
    selected_ids = input("Enter the ObjectId strings corresponding to the user IDs (comma-separated): ")
    selected_ids = selected_ids.split(",")
    selected_ids = [oid.strip() for oid in selected_ids]
    
    event = input("Enter event: ")
    
    try:
        recommendations = main(selected_ids, event)
    except ValueError as e:
        print(e)
    except Exception as e:
        print(f"Error: {e}")
