import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

// Inline ProductCard (copied from Products.jsx for reuse)
function ProductCard({ product, onAddToCart }) {
  // Ensure HTTPS URLs and provide fallback
  const getImageUrl = (url, images) => {
    if (images && images.length > 0) return images[0].replace('http://', 'https://');
    if (!url) return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
    return url.replace('http://', 'https://');
  };

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 overflow-hidden group w-full max-w-[280px] min-w-[240px]">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageUrl(product.image, product.images)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
          }}
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-neutral-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating)
                    ? "text-accent-500 fill-current"
                    : "text-neutral-300"
                )}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-neutral-600">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-neutral-900">${product.price}</span>
          <button
            disabled={!product.inStock}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              product.inStock
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
            )}
            onClick={onAddToCart ? (e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(product); } : undefined}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel({ products, onAddToCart }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [products]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white text-primary-600 shadow-lg p-2 rounded-full border border-neutral-200 transition-all duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white text-primary-600 shadow-lg p-2 rounded-full border border-neutral-200 transition-all duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2"
      >
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="shrink-0">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Link>
        ))}
      </div>


    </div>
  );
}