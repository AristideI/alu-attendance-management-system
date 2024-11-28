import os
import numpy as np
from keras_preprocessing.image import load_img, img_to_array
from keras.models import load_model

MODEL_PATH = "../models/brain_tumor_model.keras"  # Path to your retrained model


# Load the trained model
def load_trained_model(model_path=MODEL_PATH):
    """
    Load and return the pre-trained model.
    """
    model = load_model(model_path)
    print(f"Model loaded from {model_path}")
    return model


# Function to predict the image
def predict_image(image_path, model):
    """
    Predict the class of a single image.
    :param image_path: str, path to the image to be predicted.
    :param model: Keras model object
    :return: Predicted class label
    """
    # Load and preprocess the image
    image = load_img(image_path, target_size=(64, 64), color_mode="grayscale")
    input_arr = img_to_array(image) / 255.0  # Normalize the image
    input_arr = np.array([input_arr])  # Convert single image to a batch

    # Make prediction
    predictions = model.predict(input_arr)
    predicted_class = np.argmax(predictions, axis=1)

    # Get class labels (adjust according to your model's class mapping)
    class_labels = {0: "No", 1: "Yes"}  # Adjust this based on your class labels
    predicted_label = class_labels[predicted_class[0]]

    print(f"Predicted Class: {predicted_label}")
    return predicted_label
