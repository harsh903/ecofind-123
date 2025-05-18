import ProductFeed from "@/components/product-feed"
import CategoryFilter from "@/components/category-filter"
import HeroBanner from "@/components/hero-banner"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner />
      <CategoryFilter />
      <ProductFeed />
    </div>
  )
}
