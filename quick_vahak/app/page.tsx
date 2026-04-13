import { PRODUCTS } from "./data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black font-sans">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-2xl font-bold text-orange-600">🚚 QUICK VAHAK</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Cart (0)</button>
      </header>

      {/* Product Grid */}
      <main className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <span className="text-4xl">{item.icon}</span>
            <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
            <p className="text-gray-500 mt-1">Fresh & Homemade</p>
            <div className="flex justify-between items-center mt-6">
              <span className="text-lg font-bold">₹{item.price}</span>
              <button className="border border-orange-500 text-orange-500 px-4 py-1 rounded-md hover:bg-orange-50">
                Add
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}