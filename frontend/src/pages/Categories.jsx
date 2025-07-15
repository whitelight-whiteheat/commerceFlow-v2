import { ShoppingBag, Home as HomeIcon, Shirt, BookOpen, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../lib/productData';

// Icon mapping for categories
const categoryIcons = {
  "Electronics": ShoppingBag,
  "Home & Kitchen": HomeIcon,
  "Clothing": Shirt,
  "Books": BookOpen,
  "Sports": Dumbbell
};

export default function Categories() {
  const navigate = useNavigate();
  const categories = getAllCategories().filter(cat => cat !== 'All');
  
  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || ShoppingBag;
  };

  const getCategoryTagline = (categoryName) => {
    const taglines = {
      "Electronics": "Latest tech & gadgets",
      "Home & Kitchen": "Essentials for every home",
      "Clothing": "Style for every season",
      "Books": "Knowledge and entertainment",
      "Sports": "Equipment for active lifestyle"
    };
    return taglines[categoryName] || "Discover amazing products";
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-light text-neutral-900 mb-8 text-center">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map(category => {
            const Icon = getCategoryIcon(category);
            return (
              <button
                key={category}
                className="group bg-white rounded-2xl shadow-soft p-8 flex flex-col items-center text-center border border-neutral-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer w-full"
                onClick={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 text-lg">{category}</h3>
                <p className="text-neutral-500 text-sm">{getCategoryTagline(category)}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 