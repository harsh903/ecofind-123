"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { dummyProducts } from "@/lib/data"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ProductFeed() {
  const [products] = useState(dummyProducts)
  const { toast } = useToast()
  const [likedProducts, setLikedProducts] = useState<number[]>([])

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

  const handleAddToCart = (e: React.MouseEvent, productName: string) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    })
  }

  const toggleLike = (e: React.MouseEvent, productId: number) => {
    e.preventDefault()
    e.stopPropagation()

    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId))
    } else {
      setLikedProducts([...likedProducts, productId])
    }
  }

  return (
    <div className="mt-8" id="featured-products">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Card className="overflow-hidden h-full card-hover bg-white border-0 shadow-sm">
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="rounded-full">
                    <Eye className="h-4 w-4 mr-1" /> Quick View
                  </Button>
                </div>
                <Badge className={`absolute top-2 right-2 ${getCategoryBadgeClass(product.category)}`}>
                  <span className="mr-1">{getCategoryIcon(product.category)}</span> {product.category}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 left-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => toggleLike(e, product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${likedProducts.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                  <p className="font-bold text-primary">{product.price}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  onClick={(e) => handleAddToCart(e, product.title)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
