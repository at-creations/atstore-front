import Link from "next/link"
import { Home, ShoppingBag, Search, Tag } from "lucide-react"
import Image from "next/image"
import { CDN_HOST } from "../constants"

export default function Header() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Search", href: "/search", icon: Search },
    // { name: "Promotions", href: "/promotions", icon: Tag },
  ]

  return (
    <header className="gradient-bg text-white fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0 animate-fadeIn">
          <Image
            src={`${CDN_HOST}/data/brand_logo.png`}
            alt="Logo"
            width={250}
            height={64}
            className="w-auto h-12"
          />
        </Link>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={item.name} className="animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <Link
                href={item.href}
                className="flex items-center hover:text-blue-200 dark:text-gray-300 dark:hover:text-blue-300 transition-colors duration-300"
              >
                <item.icon className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

