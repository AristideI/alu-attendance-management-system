import axios from "axios";
import { useState } from "react";
import Loading from "react-loading";

export default function Predict() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ predicted_class: string } | null>(
    null
  );

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }

  function handleFile(file: File) {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile as Blob);

      const response = await axios.post<{ predicted_class: string }>(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="px-32 my-20">
      <article className="flex mb-12 items-center gap-20">
        <section className="w-1/2">
          <p className="font-cinzelBold text-2xl mb-6">Predict MRI Images</p>
          <p>
            The Prediction page utilizes advanced AI algorithms to analyze MRI
            images and detect potential brain tumors. Users can upload MRI
            scans, and the system will provide a detailed prediction, indicating
            the likelihood of a tumor. This page empowers healthcare providers
            with quick, reliable insights, enabling early diagnosis and more
            effective treatment planning.
          </p>
        </section>
        <form className="w-1/2" onSubmit={handleSubmit}>
          <div
            className="upload-container relative flex items-center justify-between w-full bg-primary-200/20"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <div
              className="drop-area w-full rounded-md border-2 border-dotted border-gray-200 transition-all hover:border-primary-200 text-center"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <label
                htmlFor="file-input"
                className="block w-full h-full text-gray-500 p-4 text-sm cursor-pointer"
              >
                Drop your image here or click to browse
              </label>
              <input
                name="file"
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              {imagePreview && (
                <div className="preview-container flex flex-col items-center">
                  <div
                    className="preview-image w-36 h-36 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${imagePreview})` }}
                  ></div>
                  <span className="file-name my-4 text-sm font-medium">
                    {imageFile?.name}
                  </span>
                  <p
                    className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border text-xs text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={handleRemoveImage}
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary-400 text-primary-100 font-cinzelBold py-2 px-10 rounded-lg mt-4"
          >
            {isLoading ? (
              <Loading color="#d54cc0" type="spin" height={24} width={24} />
            ) : (
              "Predict"
            )}
          </button>
        </form>
      </article>
      <section>
        {result && (
          <article className="bg-primary-200/20 p-8 rounded-lg mt-8">
            <p className="font-cinzelBold text-3xl text-center font-bold">
              {result.predicted_class === "Yes"
                ? "Tumor Detected"
                : "No Tumor Detected"}
            </p>
          </article>
        )}
      </section>
    </article>
  );
}
