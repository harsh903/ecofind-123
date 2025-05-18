import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample previous purchases
const previousPurchases = [
  {
    id: 101,
    title: "Vintage Record Player",
    price: "₹3,499",
    date: "April 15, 2023",
    image: "https://via.placeholder.com/150",
    status: "Delivered",
  },
  {
    id: 102,
    title: "Handcrafted Ceramic Mug Set",
    price: "₹899",
    date: "February 22, 2023",
    image: "https://via.placeholder.com/150",
    status: "Delivered",
  },
  {
    id: 103,
    title: "Antique Wooden Bookshelf",
    price: "₹4,299",
    date: "December 10, 2022",
    image: "https://via.placeholder.com/150",
    status: "Delivered",
  },
]

export default function PreviousPurchases() {
  return (
    <div className="space-y-4">
      {previousPurchases.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't made any purchases yet.</p>
        </div>
      ) : (
        previousPurchases.map((purchase) => (
          <Card key={purchase.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-24 h-24 sm:w-32 sm:h-32">
                  <img
                    src={purchase.image || "/placeholder.svg"}
                    alt={purchase.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{purchase.title}</h3>
                      <p className="text-[#4CAF50] font-medium">{purchase.price}</p>
                      <p className="text-sm text-gray-500">Purchased on {purchase.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{purchase.status}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
