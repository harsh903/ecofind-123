"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { dummyProducts } from "@/lib/data"

export default function MyListingsPage() {
  const router = useRouter()
  const [listings, setListings] = useState(dummyProducts)

  const handleDelete = (id: number) => {
    setListings(listings.filter((listing) => listing.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Listings</h1>
        <Button onClick={() => router.push("/add-product")} className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 mb-4">You don't have any listings yet</p>
          <Button onClick={() => router.push("/add-product")} className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">
            <Plus className="mr-2 h-4 w-4" /> Create Your First Listing
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-[#4CAF50] hover:bg-[#4CAF50]/90">{listing.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                <p className="font-medium text-[#4CAF50]">{listing.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" size="sm" onClick={() => router.push(`/edit-product/${listing.id}`)}>
                  <Edit2 className="h-4 w-4 mr-1" /> Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your listing. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(listing.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
