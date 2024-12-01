import os
import zipfile
import shutil
import tensorflow as tf
from keras_preprocessing.image import ImageDataGenerator, img_to_array, load_img
from keras.models import load_model
import numpy as np


def unzip_file(zip_file, extract_to_path):
    """
    Unzips the uploaded file (zip) containing 'no' and 'yes' folders to the specified directory.

    Parameters:
        - zip_file: Uploaded file (file-like object)
        - extract_to_path: str, directory where the ZIP file should be extracted

    Returns:
        - None
    """
    with zipfile.ZipFile(zip_file, "r") as zip_ref:
        zip_ref.extractall(extract_to_path)
    print(f"Extracted zip file to {extract_to_path}")


def process_images(image_dir, target_size=(64, 64)):
    """
    Processes the images in the provided directory.
    It loads and resizes them into the target size for training.

    Parameters:
        - image_dir: str, directory containing images to be processed
        - target_size: tuple, the target image size

    Returns:
        - Numpy array of processed images and their labels
    """
    images = []
    labels = []

    # Loop through the "yes" and "no" folders
    for label, folder_name in enumerate(["yes", "no"]):
        folder_path = os.path.join(image_dir, folder_name)

        for img_name in os.listdir(folder_path):
            img_path = os.path.join(folder_path, img_name)
            img = load_img(img_path, target_size=target_size, color_mode="grayscale")
            img_array = img_to_array(img) / 255.0  # Normalize to [0, 1]
            images.append(img_array)
            labels.append(label)  # 0 for 'no', 1 for 'yes'

    images = np.array(images)
    labels = np.array(labels)

    return images, labels


def retrain_model(
    uploaded_zip_file, model_save_path="../models/brain_tumor_model.keras"
):
    try:
        # Save the file locally to process it
        with open("uploaded_file.zip", "wb") as f:
            shutil.copyfileobj(uploaded_zip_file, f)

        # Step 1: Unzip the data
        extract_dir = "temp_data"
        if not os.path.exists(extract_dir):
            os.makedirs(extract_dir)
        unzip_file("uploaded_file.zip", extract_to_path=extract_dir)

        # Check if the extraction was successful
        if not os.path.exists(extract_dir):
            raise FileNotFoundError(
                f"Extraction failed, directory {extract_dir} not found."
            )

        # Step 2: Process the images in the extracted folder
        images, labels = process_images(extract_dir)

        # Step 3: Prepare the data for training
        images = images.reshape(
            (-1, 64, 64, 1)
        )  # Ensure the correct shape for the model

        # Convert labels to categorical (one-hot encoding)
        labels = tf.keras.utils.to_categorical(labels, num_classes=2)

        # Step 4: Load the pre-trained model
        model = load_model(model_save_path)

        # Step 5: Fine-tune the pre-trained model with new data
        model.fit(images, labels, epochs=10, batch_size=32)

        # Step 6: Save the retrained model
        model.save(model_save_path)
        print(f"Retrained model saved to {model_save_path}")

        # Clean up extracted data
        shutil.rmtree(extract_dir)

    except Exception as e:
        print(f"An error occurred: {e}")
