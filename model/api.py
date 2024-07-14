from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import pandas as pd

app = FastAPI()

# Allow CORS (for frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
