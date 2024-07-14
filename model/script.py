import os
import csv

# Define the dataset directory
dataset_dir = "C:\\Users\\Devleena\\Desktop\\Myntra-Hackerramp2024\\DataSet"

# Create a CSV file for labels
csv_filename = 'closet_info_new.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Event', 'Color', 'Style', 'Dress_Path', 'Accessory_Path']
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
                            dress_folder = os.path.join(style_path, 'Dress')
                            accessories_folder = os.path.join(style_path, 'Accessories')

                            # Check if Accessories folder exists
                            if not os.path.exists(accessories_folder):
                                print(f"Accessories folder not found: {accessories_folder}")
                                continue

                            # Collect dress paths
                            dress_paths = [os.path.join(dress_folder, img) for img in os.listdir(dress_folder) if img.endswith('.jpg') or img.endswith('.png') or img.endswith('.jpeg')]

                            # Collect accessory paths corresponding to each dress
                            for dress_path in dress_paths:
                                accessories_paths = [os.path.join(accessories_folder, img) for img in os.listdir(accessories_folder) if img.endswith('.jpg') or img.endswith('.png') or img.endswith('.jpeg')]
                                
                                # Write each dress-accessory pair to CSV
                                for accessory_path in accessories_paths:
                                    writer.writerow({
                                        'Event': event,
                                        'Color': color,
                                        'Style': style,
                                        'Dress_Path': dress_path,
                                        'Accessory_Path': accessory_path
                                    })

print(f"CSV file {csv_filename} has been created successfully.")
