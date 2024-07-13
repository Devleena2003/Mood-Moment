import pandas as pd
from pymongo import MongoClient
from bson import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Function to load and preprocess the dataset
def load_dataset(csv_file_path):
    df = pd.read_csv(csv_file_path)
    df['features'] = df['Event'] + ' ' + df['Color'] + ' ' + df['Style']
    return df

# Function to fetch user preferences from MongoDB
def fetch_user_preferences(user_id, db):
    preferences_collection = db["users"]
    user_preferences = preferences_collection.find_one({"_id": ObjectId(user_id)})
    if user_preferences is None:
        raise ValueError(f"No user found with ID {user_id}")
    return user_preferences["preferredColors"], user_preferences["preferredStyles"]

# Function to get recommendations based on the event
def get_recommendations(event, preferred_colors, preferred_styles, df, vectorizer, tfidf_matrix):
    queries = [f"{event} {color} {style}" for color in preferred_colors for style in preferred_styles]
    
    similarities = []
    for query in queries:
        query_vec = vectorizer.transform([query])
        similarity = cosine_similarity(query_vec, tfidf_matrix).flatten()
        similarities.append(similarity)
    
    combined_similarity = sum(similarities)
    indices = combined_similarity.argsort()[-5:][::-1]
    
    recommendations = df.iloc[indices]
    return recommendations['Image_Path'].tolist()

# Function to fetch all user IDs from MongoDB
def fetch_all_user_ids(db):
    preferences_collection = db["users"]
    user_ids = preferences_collection.find({}, {"_id": 1})
    return [str(user["_id"]) for user in user_ids]

# Main function
def main(user_ids, event):
    csv_file_path = 'closet_info.csv'
    df = load_dataset(csv_file_path)
    
    client = MongoClient("mongodb+srv://devleena2003:ifGmK9Hxf9RayupH@cluster0.zmv03yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["users"]
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df['features'])
    
    recommendations = []
    for user_id in user_ids:
        preferred_colors, preferred_styles = fetch_user_preferences(user_id, db)
        user_recommendations = get_recommendations(event, preferred_colors, preferred_styles, df, vectorizer, tfidf_matrix)
        recommendations.extend(user_recommendations)
    
    return recommendations

# Example usage
if __name__ == "__main__":
    import sys

    client = MongoClient("mongodb+srv://devleena2003:ifGmK9Hxf9RayupH@cluster0.zmv03yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["users"]
    
    user_ids = fetch_all_user_ids(db)
    print("Available User IDs:")
    for i, uid in enumerate(user_ids, 1):
        print(f"{i}: {uid}")
    
    selected_ids = input("Enter the ObjectId strings corresponding to the user IDs (comma-separated): ")
    selected_ids = selected_ids.split(",")
    selected_ids = [oid.strip() for oid in selected_ids]
    
    event = input("Enter event: ")

    try:
        recommendations = main(selected_ids, event)
        print("Recommended Images:")
        for image in recommendations:
            print(image)
    except ValueError as e:
        print(e)
