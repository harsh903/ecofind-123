import { ArrowRight, Leaf, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-[#F5F5DC] mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#43A047]/10 to-transparent" />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Leaf className="h-4 w-4 mr-2" /> Sustainable Shopping
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] leading-tight">
              Sustainable Shopping <span className="text-primary">Starts Here.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#37474F]/80 max-w-lg">
              Browse curated second-hand items that help your wallet and the planet. Give pre-loved items a new home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="#featured-products"
                className="inline-flex items-center justify-center rounded-md gradient-primary px-6 py-3 text-white font-medium hover:opacity-90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Explore Products
              </Link>
              <Link
                href="/add-product"
                className="inline-flex items-center justify-center rounded-md bg-white border border-[#43A047] px-6 py-3 text-[#43A047] font-medium hover:bg-[#43A047]/5 transition-colors"
              >
                Sell Your Items <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-secondary/20 animate-pulse-slow"></div>
              <img
                src="/eco-friendly-shopping.png"
                alt="Sustainable shopping"
                className="relative z-10 max-w-md animate-float"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
