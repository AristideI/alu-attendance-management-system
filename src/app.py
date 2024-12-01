from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from prediction import load_trained_model, predict_image
import os
import shutil
from retrain import retrain_model


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to a list of allowed origins in production.
    allow_credentials=True,
    allow_methods=["*"],  # Specify allowed methods like ["GET", "POST"] if needed.
    allow_headers=["*"],  # Specify allowed headers if necessary.
)

MODEL_PATH = "../models/brain_tumor_model.keras"  # Path to your retrained model

# Load the model once when the app starts
model = load_trained_model(MODEL_PATH)


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Create a temporary file to save the uploaded image
        temp_file_path = "temp_image.jpg"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Predict the image class using the predict function
        predicted_class = predict_image(temp_file_path, model)

        # Clean up the temporary image file
        os.remove(temp_file_path)

        return JSONResponse(
            content={"predicted_class": predicted_class}, status_code=200
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/retrain/")
async def retrain(file: UploadFile = File(...)):
    try:
        # Reset file pointer to the beginning
        await file.seek(0)

        # Call the retrain function, passing the uploaded file
        retrain_model(file.file)  # Use file.file to pass to retrain_model

        return JSONResponse(
            content={"message": "Model retrained successfully!"}, status_code=200
        )

    except Exception as e:
        return JSONResponse(content={"error here": str(e)}, status_code=500)
