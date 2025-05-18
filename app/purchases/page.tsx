import PreviousPurchases from "@/components/previous-purchases"

export default function PurchasesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Previous Purchases</h1>
      <PreviousPurchases />
    </div>
  )
}
