import numpy as np
from keras_preprocessing.image import load_img, img_to_array
import cv2


def preprocess_uploaded_image(image_path, target_size=(64, 64)):
    """
    Preprocesses the uploaded image:
    - Converts to grayscale.
    - Resizes the image to the target size.
    - Rescales pixel values to [0, 1].

    Parameters:
        - image_path: str, path to the uploaded image.
        - target_size: tuple, target image size (default is (64, 64)).

    Returns:
        - Preprocessed image ready for model prediction.
    """
    # Load the image using OpenCV in grayscale mode
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Resize image to target size
    img_resized = cv2.resize(img, target_size)

    # Rescale pixel values to [0, 1]
    img_resized = img_resized.astype("float32") / 255.0

    # Expand dimensions to match the model input (batch size, height, width, channels)
    img_resized = np.expand_dims(img_resized, axis=-1)  # Add the channel dimension
    img_resized = np.expand_dims(img_resized, axis=0)  # Add the batch dimension

    return img_resized
