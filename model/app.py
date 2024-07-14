from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "*"],
    allow_credentials=True,
  allow_methods=["*"],
    allow_headers=["*"],
)

# Load the CSV file into a pandas DataFrame
csv_filename = 'dataset_labels.csv'
df = pd.read_csv(csv_filename)

# Assuming 'filename' column contains relative paths
df['filepath'] = df['filename'].apply(lambda x: os.path.join('dataset', x))

# Convert the DataFrame to a dictionary of lists
mood_to_dresses = df.groupby('mood')['filepath'].apply(list).to_dict()

@app.get("/dresses/")
async def get_dresses(mood: str):
    print(mood)
    if mood not in mood_to_dresses:
        raise HTTPException(status_code=404, detail="Mood not found")
    
    dresses = mood_to_dresses[mood]
    return dresses

@app.get("/show_dress/")
async def show_dress(filename: str):
    dress_path = os.path.join('dataset', filename)
    if not os.path.isfile(dress_path):
        raise HTTPException(status_code=404, detail="Dress not found")
    
    return FileResponse(dress_path, media_type='image/jpg')

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mood-based Dress Recommendation API"}



# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware

# import pandas as pd

# app = FastAPI()

# # Allow CORS (for frontend to communicate with backend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust this as needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Connect to MongoDB
client = MongoClient("mongodb+srv://devleena2003:ifGmK9Hxf9RayupH@cluster0.zmv03yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]

# Load dataset and preprocess
csv_file_path = 'closet_info_new.csv'
df = pd.read_csv(csv_file_path)

# Define Pydantic models
class EventRequest(BaseModel):
    event_name: str

class DressSelectionRequest(BaseModel):
    selected_dresses: list[str]

class Dress(BaseModel):
    image_path: str
    dress_type: str

class Accessory(BaseModel):
    name: str
    category: str

# Endpoint for fetching dresses by event
@app.post("/event-dresses/")
async def fetch_dresses_by_event(request: EventRequest):
    try:
        event_name = request.event_name
        
        # Filter dresses based on event name
        filtered_dresses = df[df['Event'] == event_name][['Dress_Path']].to_dict(orient='records')
        
        return {"dresses": filtered_dresses}
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# Endpoint for fetching accessories for selected dresses
@app.post("/event-accessories/")
async def fetch_accessories_for_dresses(request: DressSelectionRequest):
    try:
        selected_dress_accessories = []
        for dress in request.selected_dresses:
            # Filter accessories based on the selected dress paths
            accessories = df[(df['Accessory_Path'].notna()) & (df['Dress_Path'] == dress)]['Accessory_Path'].values.tolist()
            selected_dress_accessories.extend(accessories)
        
        accessory_details = [{"name": acc.split('/')[-1], "category": "Accessory"} for acc in selected_dress_accessories]
        return {"accessories": accessory_details}
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


# Run the app with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



