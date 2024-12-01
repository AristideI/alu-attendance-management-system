import { useState } from "react";
import Loading from "react-loading";
import axios from "axios";

export default function Retrain() {
  const retrainingPageDescription = `
    The Retraining page allows users to enhance the AI model by uploading new datasets.
    This ensures the model remains up-to-date with the latest medical data, improving its accuracy and adaptability.
    By retraining the model, healthcare professionals can ensure that predictions remain relevant and effective
    in diverse clinical scenarios, making it a powerful tool for personalized diagnostics.
  `;

  const [isLoading, setIsLoading] = useState(false);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
    if (file.type === "application/zip") {
      setZipFile(file);
      setMessage(null);
    } else {
      setMessage("Please upload a valid .zip file.");
    }
  }

  function handleRemoveFile() {
    setZipFile(null);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!zipFile) {
      setMessage("Please upload a .zip file before submitting.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", zipFile);

      const response = await axios.post(
        "http://localhost:8000/retrain",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message || "Model retrained successfully!");
    } catch (error) {
      setMessage("Error retraining model. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="px-32 my-20">
      <article className="flex mb-12 items-center gap-20">
        <section className="w-1/2">
          <p className="font-cinzelBold text-2xl mb-6">Retrain Model</p>
          <p>{retrainingPageDescription}</p>
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
                Drop your zip file here or click to browse
              </label>
              <input
                name="file"
                type="file"
                id="file-input"
                accept=".zip"
                className="hidden"
                onChange={handleChange}
              />
              {zipFile && (
                <div className="preview-container flex flex-col items-center">
                  <span className="file-name my-4 text-sm font-medium">
                    {zipFile.name}
                  </span>
                  <p
                    className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border text-xs text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={handleRemoveFile}
                  >
                    Remove
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
              "Retrain"
            )}
          </button>
        </form>
      </article>
      <section>
        {message && (
          <article className="bg-primary-200/20 p-8 rounded-lg mt-8">
            <p className="font-cinzelBold text-2xl text-center">{message}</p>
          </article>
        )}
      </section>
    </article>
  );
}
