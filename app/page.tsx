import { Hero } from "@/app/components/Hero"
import { AboutUs } from "@/app/components/AboutUs"
import { FeaturedProducts } from "@/app/components/FeaturedProducts"
import { ContactUs } from "@/app/components/ContactUs"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <AboutUs />
      <FeaturedProducts />
      <ContactUs />
    </div>
  )
}

