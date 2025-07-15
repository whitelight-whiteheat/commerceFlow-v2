import ProductCarousel from '../components/ProductCarousel';
import ParallaxValueProps from '../components/ParallaxValueProps';
import Footer from '../components/layout/Footer';
import { TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useRef } from 'react';
import { getBestSellers, getNewReleases, getBestSales } from '../lib/productData';

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

  // Get products from centralized data
  const bestSellers = getBestSellers();
  const newReleases = getNewReleases();
  const bestSales = getBestSales();

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