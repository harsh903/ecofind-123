"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { dummyProducts } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // Find product from dummy data
    const foundProduct = dummyProducts.find((p) => p.id.toString() === id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id])

  const addToCart = () => {
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.title} (Qty: ${quantity}) has been added to your cart.`,
    })

    // In a real app, we would update cart state here
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.title} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const getCategoryBadgeClass = (category: string) => {
    const categoryClasses: Record<string, string> = {
      Clothing: "category-badge-clothing",
      Electronics: "category-badge-electronics",
      Books: "category-badge-books",
      Furniture: "category-badge-furniture",
      Accessories: "category-badge-accessories",
      "Sports & Outdoors": "category-badge-sports",
      "Home Decor": "category-badge-furniture",
      Music: "category-badge-other",
    }

    return categoryClasses[category] || "category-badge-other"
  }

  const getCategoryIcon = (category: string) => {
    const categoryIcons: Record<string, string> = {
      Clothing: "👕",
      Electronics: "📱",
      Books: "📚",
      Furniture: "🪑",
      Accessories: "👜",
      "Sports & Outdoors": "🏀",
      "Home Decor": "🏠",
      Music: "🎵",
    }

    return categoryIcons[category] || "📦"
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 hover:bg-gray-100 transition-colors" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden bg-white shadow-md">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg?height=400&width=600&query=product image of " + product.title}
              alt={product.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={toggleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </Button>
          </div>
          <div className="p-4 flex justify-between">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm ml-2 text-gray-500">(24 reviews)</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="mb-4">
              <Badge className={`${getCategoryBadgeClass(product.category)}`}>
                <span className="mr-1">{getCategoryIcon(product.category)}</span> {product.category}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-4">{product.price}</p>

            <div className="flex items-center mb-6 text-sm">
              <Truck className="h-4 w-4 mr-2 text-primary" />
              <span>Free delivery on orders over ₹999</span>
            </div>

            <div className="border-t border-b py-4 my-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="my-6">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-4 min-w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                className="flex-1 gradient-primary hover:opacity-90 text-white shadow-md transform transition-transform hover:-translate-y-1"
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10 transform transition-transform hover:-translate-y-1"
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-500 mb-2">Condition</h4>
                    <p>Excellent - minimal signs of use</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 mb-2">Material</h4>
                    <p>Eco-friendly materials</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 mb-2">Age</h4>
                    <p>2 years old</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 mb-2">Brand</h4>
                    <p>EcoStyle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium">Great product!</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This item exceeded my expectations. The quality is amazing for a second-hand item.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">By Priya S. - 2 weeks ago</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Good value</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Very happy with my purchase. Shipping was fast and the item was as described.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">By Rahul M. - 1 month ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Standard Shipping</p>
                      <p className="text-sm text-gray-600">Delivery in 3-5 business days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-gray-600">Delivery in 1-2 business days (additional ₹199)</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
