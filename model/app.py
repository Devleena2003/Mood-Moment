from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os


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



# Run the app with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



