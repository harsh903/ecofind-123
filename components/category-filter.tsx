"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Shirt, Smartphone, BookOpen, Sofa, Briefcase, Dumbbell, Gamepad2, Palette, LayoutGrid } from "lucide-react"

const categories = [
  { id: "all", name: "All", icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
  { id: "clothing", name: "Clothing", icon: <Shirt className="h-4 w-4 mr-2" /> },
  { id: "electronics", name: "Electronics", icon: <Smartphone className="h-4 w-4 mr-2" /> },
  { id: "books", name: "Books", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { id: "furniture", name: "Furniture", icon: <Sofa className="h-4 w-4 mr-2" /> },
  { id: "accessories", name: "Accessories", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { id: "sports", name: "Sports", icon: <Dumbbell className="h-4 w-4 mr-2" /> },
  { id: "toys", name: "Toys & Games", icon: <Gamepad2 className="h-4 w-4 mr-2" /> },
  { id: "art", name: "Art", icon: <Palette className="h-4 w-4 mr-2" /> },
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("all")

  const getCategoryClass = (categoryId: string) => {
    if (categoryId === "all") {
      return activeCategory === categoryId
        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md"
        : "bg-white border border-gray-200"
    }

    const categoryClasses: Record<string, string> = {
      clothing: "category-badge-clothing",
      electronics: "category-badge-electronics",
      books: "category-badge-books",
      furniture: "category-badge-furniture",
      accessories: "category-badge-accessories",
      sports: "category-badge-sports",
      toys: "category-badge-other",
      art: "category-badge-other",
    }

    return activeCategory === categoryId
      ? `${categoryClasses[categoryId]} bg-opacity-100 shadow-md`
      : "bg-white border border-gray-200"
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 pb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className={`rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 ${getCategoryClass(category.id)}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
