import ProductCarousel from '../components/ProductCarousel';
import ParallaxValueProps from '../components/ParallaxValueProps';
import Footer from '../components/layout/Footer';
import { TrendingUp, Sparkles, Zap, ArrowRight, Star, Shield, Truck, Clock } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { getBestSellers, getNewReleases, getBestSales } from '../lib/productData';
import { Link } from 'react-router-dom';

function ProductRow({ title, products, seeMoreLink, icon: Icon }) {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-neutral-50 to-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="text-primary-600" size={24} />}
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">{title}</h2>
          </div>
          {seeMoreLink && (
            <Link to={seeMoreLink} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
              See more
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}

export default function Home() {
  const topRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center w-full relative z-10">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              New Collection Available
            </span>
          </div>
          <h1 className="text-6xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
            Discover Amazing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Products
            </span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Shop the latest trends with our curated collection of premium products. 
            Fast shipping, secure payments, and exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:border-primary-600 hover:text-primary-600 transition-all duration-200"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>24/7 Support</span>
          </div>
        </div>
      </section>

      {/* Product Rows */}
      <ProductRow 
        title="Best Sellers" 
        products={bestSellers} 
        seeMoreLink="/products?sort=best-sellers" 
        icon={TrendingUp}
      />
      <ProductRow 
        title="New Releases" 
        products={newReleases} 
        seeMoreLink="/products?sort=new" 
        icon={Sparkles}
      />
      <ProductRow 
        title="Best Sales of the Week" 
        products={bestSales} 
        seeMoreLink="/products?sort=deals" 
        icon={Zap}
      />

      {/* Value Props (padded section) */}
      <section className="w-full flex flex-col items-center justify-center px-0 py-24 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <ParallaxValueProps />
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-full shadow-lg p-3 transition-all duration-200 transform hover:scale-110"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
} 