import ProductCarousel from '../components/ProductCarousel';
import ParallaxValueProps from '../components/ParallaxValueProps';
import Footer from '../components/layout/Footer';
import { TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useRef } from 'react';

// Best Sellers - high-rated, popular products
const bestSellers = [
  {
    id: 101,
    name: "Premium Wireless Earbuds",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 1247,
    inStock: true
  },
  {
    id: 102,
    name: "Smart Home Hub",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 892,
    inStock: true
  },
  {
    id: 103,
    name: "Designer Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    category: "Clothing",
    rating: 4.7,
    reviews: 567,
    inStock: true
  },
  {
    id: 104,
    name: "Professional Coffee Grinder",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.9,
    reviews: 734,
    inStock: true
  },
  {
    id: 105,
    name: "Ultra HD Webcam",
    price: 79.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 445,
    inStock: true
  },
  {
    id: 106,
    name: "Memory Foam Pillow Set",
    price: 49.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.8,
    reviews: 623,
    inStock: true
  }
];

// New Releases - latest products
const newReleases = [
  {
    id: 201,
    name: "AI-Powered Smart Mirror",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isNew: true
  },
  {
    id: 202,
    name: "Sustainable Bamboo Cutlery Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    isNew: true
  },
  {
    id: 203,
    name: "Smart Plant Watering System",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.4,
    reviews: 123,
    inStock: true,
    isNew: true
  },
  {
    id: 204,
    name: "Wireless Gaming Mouse",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isNew: true
  },
  {
    id: 205,
    name: "Organic Cotton Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Clothing",
    rating: 4.2,
    reviews: 78,
    inStock: true,
    isNew: true
  },
  {
    id: 206,
    name: "Portable Solar Charger",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.1,
    reviews: 45,
    inStock: true,
    isNew: true
  }
];

// Best Sales of the Week - discounted products
const bestSales = [
  {
    id: 301,
    name: "Premium Bluetooth Speaker",
    price: 79.99,
    originalPrice: 159.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: 302,
    name: "Designer Sunglasses",
    price: 89.99,
    originalPrice: 179.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Clothing",
    rating: 4.5,
    reviews: 189,
    inStock: true
  },
  {
    id: 303,
    name: "Smart LED Strip Lights",
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 156,
    inStock: true
  },
  {
    id: 304,
    name: "Wireless Keyboard & Mouse",
    price: 49.99,
    originalPrice: 99.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 267,
    inStock: true
  },
  {
    id: 305,
    name: "Organic Tea Collection",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 134,
    inStock: true
  },
  {
    id: 306,
    name: "Fitness Resistance Bands",
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.8,
    reviews: 445,
    inStock: true
  }
];

function ProductRow({ title, products, seeMoreLink }) {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-neutral-50 to-neutral-100 border-b border-neutral-200">
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">{title}</h2>
          </div>
          {seeMoreLink && (
            <a href={seeMoreLink} className="text-primary-600 hover:underline text-sm font-medium">See more</a>
          )}
        </div>
        {/* Use ProductCarousel for arrows and horizontal scroll */}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}

export default function Home() {
  const topRef = useRef(null);
  const handleBackToTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div ref={topRef} />
      {/* Hero Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-b from-neutral-50 to-neutral-100" style={{ scrollSnapAlign: 'start' }}>
        <div className="max-w-3xl mx-auto text-center w-full">
          <h1 className="text-5xl font-light text-neutral-900 mb-6 tracking-tight">Welcome to CommerceFlow</h1>
          <p className="text-neutral-600 mb-10 text-lg">Discover modern products and shop with ease.</p>
        </div>
      </section>

      {/* Product Rows (not snap, not full-screen) */}
      <ProductRow title="Best Sellers" products={bestSellers} seeMoreLink="/products?sort=best-sellers" />
      <ProductRow title="New Releases" products={newReleases} seeMoreLink="/products?sort=new" />
      <ProductRow title="Best Sales of the Week" products={bestSales} seeMoreLink="/products?sort=deals" />

      {/* Value Props (padded section) */}
      <section className="w-full flex flex-col items-center justify-center px-0 py-24 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <ParallaxValueProps />
      </section>

      {/* Footer as a padded section */}
      <section className="w-full flex flex-col items-stretch justify-end px-0 py-24 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <Footer />
      </section>

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-8 right-8 z-50 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg p-3 transition-all border-2 border-white"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
} 