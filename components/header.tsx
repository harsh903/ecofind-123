"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Leaf, Menu, Search, ShoppingCart, User, LogIn, UserPlus, ChevronDown, Sun, Moon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import LoginForm from "@/components/login-form"
import RegisterForm from "@/components/register-form"
import { useTheme } from "next-themes"

export default function Header() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show header on login page
  if (pathname === "/login") return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">EcoFinds</span>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span>EcoFinds</span>
              </Link>
              <Link href="/" className="block px-2 py-1 text-lg">
                Home
              </Link>
              <Link href="/my-listings" className="block px-2 py-1 text-lg">
                My Listings
              </Link>
              <Link href="/add-product" className="block px-2 py-1 text-lg">
                Add Product
              </Link>
              <Link href="/cart" className="block px-2 py-1 text-lg">
                Cart
              </Link>
              <Link href="/profile" className="block px-2 py-1 text-lg">
                Profile
              </Link>
              {!isLoggedIn && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full gradient-primary text-white">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <LoginForm onSuccess={() => setIsLoggedIn(true)} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" /> Register
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <RegisterForm />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl ml-2">EcoFinds</span>
        </Link>

        <div className="flex-1 md:flex md:justify-center">
          {isSearchOpen ? (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] rounded-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <div className="hidden md:flex md:flex-1 md:justify-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Categories <ChevronDown className="h-4 w-4 ml-1" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {categories.map((category) => (
                          <li key={category.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={category.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center">
                                  <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${category.iconBg} mr-2`}
                                  >
                                    {category.icon}
                                  </span>
                                  <span className="text-sm font-medium leading-none">{category.title}</span>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/add-product" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sell</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="hidden md:flex"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                2
              </span>
            </Button>
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user-profile-illustration.png" alt="@ecosam" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/my-listings">
                  <DropdownMenuItem>
                    <span>My Listings</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/purchases">
                  <DropdownMenuItem>
                    <span>Purchases</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <LoginForm onSuccess={() => setIsLoggedIn(true)} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gradient-primary text-white hover:opacity-90 shadow-sm">
                    <UserPlus className="mr-2 h-4 w-4" /> Register
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <RegisterForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const categories = [
  {
    title: "Clothing",
    description: "Pre-loved clothing items including vintage and designer pieces.",
    href: "/?category=clothing",
    icon: <span className="text-sm">👕</span>,
    iconBg: "bg-[#20c997]/20",
  },
  {
    title: "Electronics",
    description: "Refurbished and second-hand electronics in good working condition.",
    href: "/?category=electronics",
    icon: <span className="text-sm">📱</span>,
    iconBg: "bg-[#339af0]/20",
  },
  {
    title: "Books",
    description: "Used books, textbooks, and collectible editions.",
    href: "/?category=books",
    icon: <span className="text-sm">📚</span>,
    iconBg: "bg-[#9775fa]/20",
  },
  {
    title: "Furniture",
    description: "Second-hand furniture pieces for your sustainable home.",
    href: "/?category=furniture",
    icon: <span className="text-sm">🪑</span>,
    iconBg: "bg-[#ff922b]/20",
  },
  {
    title: "Accessories",
    description: "Pre-owned bags, jewelry, and other accessories.",
    href: "/?category=accessories",
    icon: <span className="text-sm">👜</span>,
    iconBg: "bg-[#f06595]/20",
  },
  {
    title: "Sports & Outdoors",
    description: "Used sporting goods and outdoor equipment.",
    href: "/?category=sports",
    icon: <span className="text-sm">🏀</span>,
    iconBg: "bg-[#22b8cf]/20",
  },
]
