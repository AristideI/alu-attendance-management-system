import { useNavigate } from "react-router";
import CustomButton from "./CustomButton";
import Logo from "./logo";
import { NavLink } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <article className="py-6 px-32 md:px-20 sm:px-10 flex justify-between items-center border-b border-primary-200/20">
      <Logo />
      <section className="flex items-center gap-4">
        <CustomLink href="/" text="Home" />
        <CustomLink href="/predict" text="Predict" />
        <CustomLink href="/visualise" text="Visualise" />
        <CustomLink href="#blogs" text="Blogs" isHash />
        <CustomLink href="#testimonials" text="Testimonial" isHash />
        <CustomButton
          text="Get Started"
          onClick={() => navigate("/predict")}
          variant="secondary"
          className="ml-20"
        />
      </section>
    </article>
  );
}

function CustomLink({
  href,
  text,
  isHash,
}: {
  href: string;
  text: string;
  isHash?: boolean;
}) {
  return !isHash ? (
    <NavLink to={href} className="text-white">
      {text}
    </NavLink>
  ) : (
    <a href={href} className="text-white">
      {text}
    </a>
  );
}
