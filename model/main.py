# import os
# import csv

# # Define the dataset directory and categories
# dataset_dir = "C:\\Users\\Devleena\\Desktop\\dataset"

# categories = ['happy', 'sad', 'frustated', 'festive']

# # Create a CSV file for labels
# csv_filename = 'dataset_labels.csv'
# with open(csv_filename, 'w', newline='') as csvfile:
#     fieldnames = ['filename', 'mood']
#     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#     writer.writeheader()
    
#     for category in categories:
#         category_dir = os.path.join(dataset_dir, category)
#         for filename in os.listdir(category_dir):
#             if filename.endswith(".jpg") or filename.endswith(".png"):
#                 writer.writerow({'filename': f"{category}/{filename}", 'mood': category})

# print(f"CSV file {csv_filename} has been created successfully.")


import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.models import load_model

# Load the CSV file
csv_filename = 'dataset_labels.csv'
data = pd.read_csv(csv_filename)

# Print the first few rows to check the paths
print(data.head())

# Verify that the files exist
for filename in data['filename']:
    full_path = os.path.join('dataset/', filename)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")

# Define image dimensions and batch size
img_height, img_width = 150, 150
batch_size = 32

# Prepare the ImageDataGenerator for loading images
datagen = ImageDataGenerator(rescale=0.2, validation_split=0.2)

# Load training data
train_generator = datagen.flow_from_dataframe(
    data,
    directory='dataset/',
    x_col='filename',
    y_col='mood',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'
)

# Load validation data
validation_generator = datagen.flow_from_dataframe(
    data,
    directory='dataset/',
    x_col='filename',
    y_col='mood',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'
)

# Build the model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(img_height, img_width, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(4, activation='softmax')  # 4 classes for 4 moods
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
epochs = 10

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // batch_size,
    epochs=epochs
)

# Evaluate the model
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(epochs)

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()

# Save the model
# print(f"Saving model to: C:\\Users\\Devleena\\Desktop\\model\\mood_classifier_model.h5")
# model.save('C:\\Users\\Devleena\\Desktop\\model\\mood_classifier_model.h5')

model_path = 'C:\\Users\\Devleena\\Desktop\\WeforShe\\model\\mood_classifier_model.h5'
# Load the model
model = load_model(model_path)

# Print model summary
print(model.summary())
