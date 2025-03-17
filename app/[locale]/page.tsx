import { Hero } from "@/app/components/Hero";
import { AboutUs } from "@/app/components/AboutUs";
import { FeaturedProducts } from "@/app/components/FeaturedProducts";
import { ContactUs } from "@/app/components/ContactUs";

export default function Home() {
  return (
    <div className="mx-auto">
      <Hero />
      <FeaturedProducts />
      <AboutUs />
      <ContactUs />
    </div>
  );
}
