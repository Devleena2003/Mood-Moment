import os
import csv

# Define the dataset directory
dataset_dir = "C:\\Users\\Devleena\\Desktop\\WeforShe\\DataSet"

# Create a CSV file for labels
csv_filename = 'closet_info.csv'
with open(csv_filename, 'w', newline='') as csvfile:
    fieldnames = ['Event', 'Color', 'Style', 'Image_Path', 'Type']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    
    # Traverse the dataset directory
    for event in os.listdir(dataset_dir):
        event_path = os.path.join(dataset_dir, event)
        if os.path.isdir(event_path):
            for color in os.listdir(event_path):
                color_path = os.path.join(event_path, color)
                if os.path.isdir(color_path):
                    for style in os.listdir(color_path):
                        style_path = os.path.join(color_path, style)
                        if os.path.isdir(style_path):
                            for item in os.listdir(style_path):
                                item_path = os.path.join(style_path, item)
                                if os.path.isfile(item_path) and (item.endswith(".jpg") or item.endswith(".png")):
                                    # It's a dress image
                                    dress_path = os.path.relpath(item_path, dataset_dir)
                                    writer.writerow({'Event': event, 'Color': color, 'Style': style, 'Image_Path': dress_path, 'Type': 'Dress'})
                                elif os.path.isdir(item_path) and item.lower() == 'accessories':
                                    for accessory in os.listdir(item_path):
                                        accessory_path = os.path.join(item_path, accessory)
                                        if os.path.isfile(accessory_path) and (accessory.endswith(".jpg") or accessory.endswith(".png")):
                                            accessory_relpath = os.path.relpath(accessory_path, dataset_dir)
                                            writer.writerow({'Event': event, 'Color': color, 'Style': style, 'Image_Path': accessory_relpath, 'Type': 'Accessory'})

print(f"CSV file {csv_filename} has been created successfully.")
