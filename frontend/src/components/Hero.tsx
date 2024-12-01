import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Bounds } from "@react-three/drei";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={[2.5, 2.5, 2.5]} />;
}

export default function App() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const brainRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        scrub: true,
        anticipatePin: 1,
      },
    });

    tl.to(brainRef.current, {
      scale: 2,
      rotateX: "0",
      duration: 0.2,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <article>
      <article
        className="relative w-full flex justify-center items-center px-32"
        id="home"
      >
        <section className="flex justify-center flex-col gap-8 w-1/2 items-start">
          <p className="text-primary-400">Revolutionizing Medical Imaging</p>
          <p className="font-serif font-bold text-6xl">
            AI-Powered Tumor Detection and 3D Visualization
          </p>
          <p>
            Transforming the way tumors are detected and understood with
            advanced AI models and immersive 3D technology. Experience precision
            and clarity like never before.
          </p>

          <CustomButton
            text="Get Started Now"
            onClick={() => navigate("/signup")}
            variant="secondary"
          />
        </section>
        <div className="w-1/2 h-[80vh]">
          <Canvas className="absolute top-0 left-0">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Bounds fit clip observe>
              <Model path="/3d/brain.glb" />
            </Bounds>
            <OrbitControls enableZoom={false} autoRotate />{" "}
          </Canvas>
        </div>
      </article>
    </article>
  );
}
