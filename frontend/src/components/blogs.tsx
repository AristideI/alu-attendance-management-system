export default function Blogs() {
  const blogs = [
    {
      title: "Understanding Brain Tumor Detection with MRI Imaging",
      description:
        "Explore how MRI technology plays a critical role in diagnosing brain tumors and improving early detection outcomes.",
      platform: "YouTube",
      image: "/images/blog2.webp",
    },
    {
      title: "The Link Between Mental Health and Brain Imaging",
      description:
        "Discover how advancements in brain imaging help scientists better understand mental health disorders like depression and anxiety.",
      platform: "Reddit",
      image: "/images/blog3.webp",
    },
    {
      title: "AI in Brain Tumor Prediction: Revolutionizing Diagnosis",
      description:
        "Learn how artificial intelligence is transforming brain tumor prediction by analyzing MRI scans with unprecedented accuracy.",
      platform: "Medium",
      image: "/images/brain4.jpg",
    },
  ];

  const singleBlog = {
    title: "How MRI Scans Reveal the Secrets of Brain Health",
    description:
      "Dive into the fascinating world of MRI technology and how it helps researchers uncover crucial insights into brain health and neurological disorders.",
    platform: "YouTube",
    image: "/images/blog1.jpeg",
  };

  return (
    <article className="mb-12" id="blogs">
      <section className="px-32 my-12">
        <h1 className="font-serif font-bold text-4xl">Blogs</h1>
      </section>
      <section className="px-32 flex justify-between items-center gap-12">
        <img src={singleBlog.image} className="w-2/5 rounded-2xl" />
        <div className="flex flex-col gap-6">
          <h2 className="font-serif font-bold text-2xl">{singleBlog.title}</h2>
          <p>{singleBlog.description}</p>
          <p className="bg-primary-200 w-fit px-6 py-1 rounded-xl">
            {singleBlog.platform}
          </p>
        </div>
      </section>
      <section className="flex justify-between items-start gap-12 px-32 mt-20">
        {blogs.map((blog, i) => (
          <section
            key={i}
            className="w-full flex flex-col justify-between items-center gap-6"
          >
            <img
              src={blog.image}
              className="w-full rounded-2xl h-60 object-cover"
            />
            <div className="flex flex-col gap-6 w-full">
              <h2 className="font-serif font-bold text-2xl">{blog.title}</h2>
              <p>{blog.description}</p>
              <p className="bg-primary-200 w-fit px-6 py-1 rounded-xl">
                {blog.platform}
              </p>
            </div>
          </section>
        ))}
      </section>
    </article>
  );
}
