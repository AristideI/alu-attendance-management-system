# MedScan 3D Frontend

## Abstract

TumorVision is a medical imaging web application that leverages AI and 3D visualization to assist in detecting and visualizing brain and lung tumors. Using Convolutional Neural Networks (CNN), the platform predicts the presence of tumors from MRI and X-ray images. It also provides interactive 3D visualizations to enhance understanding of the tumor's structure and location. Additionally, TumorVision includes a learning platform for users to explore detailed information about tumors, making it a powerful tool for medical professionals and researchers to improve diagnostics and patient outcomes.

This repository contains the frontend of **TumorVision**, a medical imaging web application designed to assist in detecting and visualizing brain and lung tumors. The frontend is built using modern tools and libraries like React, Tailwind CSS, Three.js, and others for a seamless and interactive user experience.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Three.js**: JavaScript 3D library for 3D visualization.
- **React Router**: Declarative routing for React applications.
- **Day.js**: Lightweight JavaScript library for date manipulation.
- **Axios**: Promise-based HTTP client for making API requests.
- **Vite**: Next-generation frontend tooling for fast builds and dev server.

## Features

- **Tumor Detection:** Displays results from CNN model predictions.
- **3D Visualization:** Converts 2D MRI and X-ray images into 3D models for enhanced tumor visualization using Three.js.
- **Interactive UI:** Provides an easy-to-use interface for uploading images, viewing prediction results, and learning about tumors.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: (npm comes with Node.js)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/TumorVision-Frontend.git
   cd TumorVision-Frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or if you use `yarn`:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   or with `yarn`:

   ```bash
   yarn dev
   ```

   The app should now be running on `http://localhost:3000`.

## Scripts

- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the project for production by first running TypeScript (`tsc -b`) and then building with Vite.
- **`npm run lint`**: Runs ESLint for code linting and formatting.
- **`npm run preview`**: Previews the production build.

## Project Structure

. ├── public # Static files like images ├── src │ ├── assets # Assets like images and icons │ ├── components # Reusable React components │ ├── pages # Main page components for routing │ ├── hooks # Custom hooks for logic reuse │ ├── styles # TailwindCSS configurations and global styles │ ├── utils # Utility functions like date formatting (Day.js) │ ├── App.tsx # Main React component │ └── main.tsx # React DOM rendering entry point ├── .eslintrc.js # ESLint configuration ├── tailwind.config.js # Tailwind CSS configuration └── tsconfig.json #

## Styling

The application uses **Tailwind CSS** for styling. You can easily customize the design by modifying `tailwind.config.js` or adding utility classes directly to the components.

## Routing

The application uses **React Router** for navigation. Routes are defined in the `App.tsx` file. Each page is represented as a component under the `src/pages` directory.

## API Integration

For API calls (like interacting with the backend for tumor predictions), the app uses **Axios**. API logic can be found in the `src/utils/api.js` file, which handles HTTP requests to the backend server.

## 3D Visualization

**Three.js** is used to render and manipulate 3D models of medical scans. You can find the related logic and components under the `src/components/3DViewer` directory.

## Date Handling

**Day.js** is used for formatting and manipulating dates across the application.

## Contributing

If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
