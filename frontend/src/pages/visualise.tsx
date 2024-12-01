import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Loading from "react-loading";

export default function AddStory() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShow(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }

  return (
    <article className="px-32 my-20">
      <article className="flex mb-12 items-center gap-20">
        <section className="w-1/2">
          <p className="font-cinzelBold text-2xl mb-6">Visualise 2D images</p>
          <p>
            The Visualize page provides an innovative platform to convert
            traditional 2D MRI scans into detailed 3D models. Users can interact
            with these 3D visualizations to explore brain structures from
            various angles, enhancing the understanding of complex anatomical
            features. This tool is invaluable for researchers, healthcare
            professionals, and students, offering deeper insights into brain
            abnormalities and aiding in precise diagnosis and treatment
            planning.
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
              "Visualize"
            )}
          </button>
        </form>
      </article>
      <section>
        <Visualise3D show={show} />
      </section>
    </article>
  );
}

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={[5, 5, 5]} />;
}

function Visualise3D({ show }: { show: boolean }) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowImage(true);
    }, 10000);
  }, []);

  return (
    show &&
    (showImage ? (
      <div className="w-full h-[80vh] bg-white rounded-2xl">
        <Canvas className="absolute top-0 left-0">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Bounds fit clip observe>
            <Model path="/3d/glb.glb" />
          </Bounds>
          <OrbitControls enableZoom={false} autoRotate />{" "}
        </Canvas>
      </div>
    ) : (
      <article className="w-full py-20 bg-white rounded-2xl flex flex-col justify-center items-center">
        <p className="text-primary-100">Connecting to the model ....</p>
        <Loading color="#d54cc0" type="spin" height={24} width={24} />
      </article>
    ))
  );
}
