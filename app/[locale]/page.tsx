import { Hero } from "@/app/components/Hero"
import { AboutUs } from "@/app/components/AboutUs"
import { FeaturedProducts } from "@/app/components/FeaturedProducts"
import { ContactUs } from "@/app/components/ContactUs"

export default function Home() {
  return (
    <div className="mx-auto">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-20">
        <FeaturedProducts />
      </div>
      <AboutUs />
      <ContactUs />
    </div>
  );
}

