import { Outlet } from "react-router";
import Header from "./Header";
import Blogs from "./blogs";
import Testimonials from "./testimonials";
import Footer from "./footer";

export default function Layout() {
  return (
    <article>
      <Header />
      <Outlet />
      <Blogs />
      <Testimonials />
      <Footer />
    </article>
  );
}
