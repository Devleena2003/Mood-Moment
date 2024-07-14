from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
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
    dress_path: str
    accessory_path: str

# Endpoint for fetching dresses by event
@app.post("/closet/")
async def fetch_dresses_by_event(request: EventRequest):
    try:
        event_name = request.event_name
        
        # Filter dresses based on event name
        filtered_dresses = df[df['Event'] == event_name][['Dress_Path']].to_dict(orient='records')
        
        return {"dresses": filtered_dresses}
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# Endpoint for fetching accessories for selected dresses
@app.post("/accessories/")
async def fetch_accessories_for_dresses(request: DressSelectionRequest):
    try:
        selected_dress_accessories = []
        
        for dress in request.selected_dresses:
            # Fetch accessories for each dress
            accessories = df[df['Dress_Path'] == dress]['Accessory_Path'].values.tolist()
            selected_dress_accessories.extend(accessories)
        
        return {"accessories": selected_dress_accessories}
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


# Run the app with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
