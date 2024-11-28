from keras.models import Sequential, load_model
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from keras.optimizers import Adam
from keras.metrics import Precision, Recall
from keras.callbacks import ModelCheckpoint
import os


# Define the model architecture
def build_model(input_shape=(64, 64, 1), num_classes=3):
    """
    Builds the CNN model architecture.

    Parameters:
        - input_shape: tuple, shape of the input image (height, width, channels)
        - num_classes: int, number of classes for the classification task

    Returns:
        - Compiled Keras model
    """
    model = Sequential()

    noOfFilter1 = 32
    noOfFilter2 = 64
    sizeOfFilter1 = (3, 3)
    sizeOfFilter2 = (3, 3)
    sizeOfPool = (2, 2)
    noOfNodes = (16, 32, 64, 128)

    # Add first convolutional layer
    model.add(
        Conv2D(noOfFilter1, sizeOfFilter1, activation="relu", input_shape=input_shape)
    )
    model.add(MaxPooling2D(pool_size=sizeOfPool))

    # Add second convolutional layer
    model.add(Conv2D(noOfFilter2, sizeOfFilter2, activation="relu"))
    model.add(MaxPooling2D(pool_size=sizeOfPool))

    # Flatten the feature maps
    model.add(Flatten())

    # Add fully connected layers
    model.add(Dense(noOfNodes[2], activation="relu"))
    model.add(Dense(noOfNodes[1], activation="relu"))
    model.add(
        Dense(num_classes, activation="softmax")
    )  # Softmax for multi-class classification

    # Compile the model
    model.compile(
        optimizer=Adam(),
        loss="categorical_crossentropy",
        metrics=["accuracy", Precision(), Recall()],
    )

    return model


# Function to train the model
def train_model(
    model,
    train_generator,
    validation_generator,
    epochs=10,
    batch_size=32,
    model_save_path="model.h5",
):
    """
    Trains the CNN model and saves the best model based on validation accuracy.

    Parameters:
        - model: Keras model object
        - train_generator: training data generator
        - validation_generator: validation data generator
        - epochs: number of training epochs
        - batch_size: batch size for training
        - model_save_path: path to save the best model

    Returns:
        - History object containing training details
    """
    # Define a model checkpoint callback to save the best model
    checkpoint = ModelCheckpoint(
        model_save_path, monitor="val_loss", save_best_only=True, mode="min", verbose=1
    )

    # Train the model
    history = model.fit(
        train_generator,
        epochs=epochs,
        validation_data=validation_generator,
        batch_size=batch_size,
        callbacks=[checkpoint],
    )

    return history


# Function to load the trained model
def load_trained_model(model_path="model.h5"):
    """
    Loads a pre-trained model from the given file path.

    Parameters:
        - model_path: str, path to the saved model

    Returns:
        - Loaded Keras model
    """
    if os.path.exists(model_path):
        return load_model(model_path)
    else:
        raise FileNotFoundError(f"Model file not found at {model_path}")


# Function to make a prediction using the trained model
def predict(model, image):
    """
    Makes a prediction on a preprocessed image.

    Parameters:
        - model: Keras model object
        - image: Preprocessed image (numpy array)

    Returns:
        - Predicted class label
    """
    predictions = model.predict(image)
    predicted_class = predictions.argmax(
        axis=-1
    )  # Get the class with the highest probability
    return predicted_class
