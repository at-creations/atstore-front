import { Hero } from "@/app/components/Hero";
import { AboutUs } from "@/app/components/AboutUs";
import { FeaturedProducts } from "@/app/components/FeaturedProducts";
import { ContactUs } from "@/app/components/ContactUs";
import { BackgroundDecoratives } from "@/app/components/ui/BackgroundDecoratives";
import { ExploreCategories } from "../components/Categories";

export default function Home() {
  return (
    <div className="mx-auto relative overflow-hidden">
      <Hero />
      <div id="home-sections" className="space-y-72 relative pb-24">
        {/* Background decoratives that add aesthetic appeal */}
        <BackgroundDecoratives />

        <div className="relative">
          <FeaturedProducts />
        </div>

        <div className="relative">
          <ExploreCategories />
        </div>

        <div className="relative">
          <AboutUs />
        </div>

        <div className="relative">
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
