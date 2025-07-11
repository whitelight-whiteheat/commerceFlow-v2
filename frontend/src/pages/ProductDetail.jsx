import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';

// Mock product data (replace with API call later)
const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    description: "Experience high-fidelity sound with these wireless Bluetooth headphones. Comfortable fit, long battery life, and crystal-clear audio for music lovers.",
    features: [
      "Bluetooth 5.0 connectivity",
      "Up to 30 hours battery life",
      "Noise-cancelling microphone",
      "Foldable, lightweight design"
    ]
  },
  {
    id: 2,
    name: "Premium Coffee Maker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=900&h=1200&fit=crop",
    category: "Home & Kitchen",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    description: "Brew the perfect cup every time with this premium coffee maker. Features programmable settings and a sleek, modern design.",
    features: [
      "Programmable timer",
      "Thermal carafe",
      "Self-cleaning mode",
      "Sleek stainless steel body"
    ]
  },
  // ...add more products as needed
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Find product by id
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="inline-block mr-2" size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 bg-white rounded-2xl shadow-none md:shadow-large p-0 md:p-12">
        {/* Product Image */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-xl object-cover mb-8 md:mb-0 md:sticky md:top-24 shadow-none"
            style={{ aspectRatio: '3/4', background: '#f4f4f4' }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-8 text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h1 className="text-4xl font-light text-neutral-900 mb-4 tracking-tight leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg text-neutral-700 font-medium">${product.price}</span>
              <span className="text-xs text-neutral-500">{product.category}</span>
              <span className="text-xs text-neutral-400">{product.reviews} reviews</span>
            </div>
            <div className="border-b border-neutral-200 mb-8"></div>
            <p className="text-base text-neutral-700 mb-8 leading-relaxed">{product.description}</p>
            <ul className="mb-8 space-y-2">
              {product.features && product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-neutral-600 text-sm">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky Add to Cart Section */}
          <div className="mt-8 md:mt-0 md:sticky md:bottom-12 bg-white/80 md:bg-white/90 md:backdrop-blur-md rounded-xl md:shadow-soft p-6 flex flex-col gap-4 border border-neutral-100">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm text-neutral-700 font-medium">Qty:</label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
              />
              {product.inStock ? (
                <span className="text-xs text-success-700 bg-success-100 px-2 py-1 rounded-full font-medium">In Stock</span>
              ) : (
                <span className="text-xs text-error-700 bg-error-100 px-2 py-1 rounded-full font-medium">Out of Stock</span>
              )}
            </div>
            <button
              disabled={!product.inStock}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-lg",
                product.inStock
                  ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-none hover:shadow-md"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              )}
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products Placeholder */}
      <div className="max-w-6xl mx-auto mt-24">
        <h2 className="text-2xl font-light text-neutral-900 mb-8 tracking-tight">Recommended Products</h2>
        <div className="bg-neutral-100 rounded-xl p-12 text-neutral-400 text-center text-lg">
          (Recommended products carousel coming soon)
        </div>
      </div>
    </div>
  );
} 