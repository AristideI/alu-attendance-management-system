# MedScan: Brain Tumor Detection Model

MedScan is a brain tumor detection application using a Dockerized frontend and backend architecture. The project leverages React for the frontend and FastAPI for the backend to provide a seamless user experience in predicting brain tumors from medical scans.

## Project Links

- **Frontend**: [MedScan Frontend](https://alu-brain-tumor-prediction-model.vercel.app/)
- **Backend**: [MedScan Backend](https://alu-brain-tumor-prediction-model.onrender.com/)
- **GitHub Repository**: [MedScan GitHub Repo](https://github.com/AristideI/alu-brain-tumor-prediction-model)
- **Video Demo**: [Youtube Video Demo](https://youtu.be/5i9THS6I1To)
## Prerequisites

- Docker
- Docker Compose (for the frontend)

---

## Frontend Setup

The frontend is built with React and Dockerized using Docker Compose. It includes an interactive UI to upload and analyze medical scans.

### Clone the Repository

```bash
git clone https://github.com/AristideI/alu-brain-tumor-prediction-model.git
cd alu-brain-tumor-prediction-model/frontend
```

## Run the Frontend

Build and run the frontend using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at **http://localhost:5173.**

#### Scripts and Dependencies

Scripts:

```json
"scripts": {
  "dev": "vite",
  "start": "vite --port 5173",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

#### Dependencies:

- @gsap/react
- @react-three/drei
- @react-three/fiber
- axios
- dayjs
- gsap
- react
- react-dom
- react-hook-form
- react-hot-toast
- react-loading
- react-router
- react-router-dom
- three
- type-fest

## Backend Setup

The backend is built with FastAPI and uses machine learning libraries for brain tumor detection.

#### Clone the Repository
```bash
git clone https://github.com/AristideI/alu-brain-tumor-prediction-model.git
cd alu-brain-tumor-prediction-model/backend
```

### Run the Backend
Build the Docker image:

```bash
docker build -t fastapi-app .
```

#### Run the Docker container:

```bash
docker run -d -p 8000:8000 fastapi-app
``` 

The backend will be available at **http://localhost:8000.**

- Dependencies
- fastapi==0.111.1
- fastapi-cli==0.0.4
- gunicorn==22.0.0
- imbalanced-learn==0.12.3
- joblib==1.4.2
- keras==3.6.0
- lazy_loader==0.4
- matplotlib==3.9.1
- opencv-python==4.10.0.84
- opencv-python-headless==4.10.0.84
- pandas==2.2.2
- pydantic==1.10.8
- pydantic_core==2.20.1
- scikit-image==0.24.0
- scikit-learn==1.2.2
- seaborn==0.13.2
- tensorflow==2.16.2
- tensorflow-io-gcs-filesystem==0.37.1
- transformers==4.23.0
- uvicorn==0.30.3
- keras_preprocessing
