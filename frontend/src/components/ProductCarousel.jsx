import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

// Inline ProductCard (copied from Products.jsx for reuse)
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 overflow-hidden group min-w-[220px] max-w-[240px] w-full">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel({ products }) {
  // Remove refs, state, and scroll logic
  return (
    <div 
      className="relative w-full group"
    >
      {/* Left Arrow - visually present but disabled */}
      <button
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-100 text-primary-600 shadow p-1.5 rounded-full border border-neutral-300 transition-all duration-200 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none items-center justify-center"
        style={{ left: 0, pointerEvents: 'none', opacity: 0.5 }}
        tabIndex={-1}
        disabled
      >
        <ChevronLeft size={20} className="text-primary-600" />
      </button>
      {/* Always show on mobile - visually present but disabled */}
      <button
        aria-label="Scroll left"
        className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-100 text-primary-600 shadow p-1.5 rounded-full border border-neutral-300 transition-all duration-200 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none items-center justify-center"
        style={{ left: 0, pointerEvents: 'none', opacity: 0.5 }}
        tabIndex={-1}
        disabled
      >
        <ChevronLeft size={20} className="text-primary-600" />
      </button>
      <div
        className="flex gap-4 w-full justify-center py-2 px-8"
        style={{ overflowX: 'visible' }}
      >
        {products.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="shrink-0">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      {/* Right Arrow - visually present but disabled */}
      <button
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-100 text-primary-600 shadow p-1.5 rounded-full border border-neutral-300 transition-all duration-200 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none items-center justify-center"
        style={{ right: 0, pointerEvents: 'none', opacity: 0.5 }}
        tabIndex={-1}
        disabled
      >
        <ChevronRight size={20} className="text-primary-600" />
      </button>
      {/* Always show on mobile - visually present but disabled */}
      <button
        aria-label="Scroll right"
        className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-100 text-primary-600 shadow p-1.5 rounded-full border border-neutral-300 transition-all duration-200 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none items-center justify-center"
        style={{ right: 0, pointerEvents: 'none', opacity: 0.5 }}
        tabIndex={-1}
        disabled
      >
        <ChevronRight size={20} className="text-primary-600" />
      </button>
    </div>
  );
}