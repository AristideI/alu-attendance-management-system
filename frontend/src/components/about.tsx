export default function About() {
  const about = {
    title: "About Our Mission",
    description:
      "We are dedicated to advancing brain health through cutting-edge research in MRI imaging, AI-driven diagnostics, and mental health awareness. Our goal is to empower healthcare professionals with the tools they need to detect and treat brain disorders early, improving outcomes and transforming lives.",
  };

  const all = [
    {
      title: "Visualize",
      description:
        "Transform 2D MRI images into interactive 3D visualizations, providing a deeper understanding of brain structures and abnormalities.",
      icon: "/images/visualisation.png", // Brain icon representing visualization
    },
    {
      title: "Predict",
      description:
        "Leverage advanced AI to analyze MRI images and predict the presence of brain tumors with high accuracy and speed.",
      icon: "/images/microchip.png", // Magnifying glass icon representing prediction
    },
    {
      title: "Model Retraining",
      description:
        "Adapt and enhance our predictive model by retraining it with new datasets, ensuring continuous improvement and accuracy.",
      icon: "/images/practice.png", // Circular arrows icon representing retraining
    },
  ];

  return (
    <article className="px-32">
      <section className="w-1/2 flex flex-col gap-6">
        <h1 className="font-serif text-3xl font-bold">{about.title}</h1>
        <p>{about.description}</p>
      </section>
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold">Our Features</h2>
        <div className="flex justify-between gap-6 mt-10">
          {all.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </article>
  );
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <article className="w-1/3 bg-primary-300 p-8 gap-6 flex flex-col relative rounded-xl">
      <div className="absolute -top-6 right-6 bg-primary-200 p-4 rounded-xl">
        <img src={icon} alt={title} className="w-12 h-12 object-contain " />
      </div>
      <h2 className="font-bold text-xl">{title}</h2>
      <p>{description}</p>
    </article>
  );
}
