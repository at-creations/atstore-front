import Link from "next/link"
import { Button } from "./ui/Button"

export function Hero() {
  return (
    <section className="py-20 text-center animate-fadeIn">
      <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to AT Creations</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">Discover unique and creative products</p>
      <div className="mt-8 animate-pulse">
        <Link href="/products" passHref>
          <Button>Explore Our Collection</Button>
        </Link>
      </div>
    </section>
  )
}

