import Image from "next/image"
import { Card } from "./ui/Card"

const promotions = [
  { id: 1, title: "Summer Sale", content: "Get 20% off on all summer products!", image: "/promo-1.jpg" },
  { id: 2, title: "New Arrivals", content: "Check out our latest collection of unique items.", image: "/promo-2.jpg" },
  { id: 3, title: "Limited Time Offer", content: "Buy one, get one 50% off on selected items.", image: "/promo-3.jpg" },
]

export function PromotionsList() {
  return (
    <div className="space-y-8">
      {promotions.map((promotion) => (
        <Card key={promotion.id} className="p-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
            <Image
              src={promotion.image || "/placeholder.svg"}
              alt={promotion.title}
              width={300}
              height={200}
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{promotion.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{promotion.content}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

