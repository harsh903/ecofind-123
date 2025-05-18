"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import PreviousPurchases from "@/components/previous-purchases"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [profileData, setProfileData] = useState({
    username: "EcoSam",
    email: "ecosam@example.com",
    bio: "Passionate about sustainable living and finding pre-loved treasures. I believe in giving items a second life!",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/diverse-group.png" alt="@ecosam" />
                <AvatarFallback>ES</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change avatar</span>
              </Button>
            </div>
            <div>
              <CardTitle className="text-2xl">@{profileData.username}</CardTitle>
              <p className="text-sm text-gray-500">Member since May 2023</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </CardHeader>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="purchases">Previous Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={profileData.username} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#4CAF50] hover:bg-[#4CAF50]/90" onClick={handleSave}>
                Save Changes
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="purchases">
            <CardContent className="pt-6">
              <PreviousPurchases />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
