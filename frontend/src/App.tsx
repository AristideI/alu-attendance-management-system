import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage";
import Predict from "./pages/predict";
import Visualise from "./pages/visualise";
import Layout from "./components/layout";
import Retrain from "./pages/retrain";

export default function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="predict" element={<Predict />} />
        <Route path="visualise" element={<Visualise />} />
        <Route path="retrain" element={<Retrain />} />
      </Route>
    )
  );
  return (
    <article>
      <RouterProvider router={route} />
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}
