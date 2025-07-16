import { ShoppingBag, Home as HomeIcon, Shirt, BookOpen, Dumbbell, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productApi } from '../lib/productApi';

// Icon mapping for categories
const categoryIcons = {
  "Electronics": ShoppingBag,
  "Clothing": Shirt,
  "Home & Garden": HomeIcon,
  "Books": BookOpen,
  "Sports & Outdoors": Dumbbell
};

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await productApi.getCategories();
        const categoryArray = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData.categories;
        setCategories(categoryArray);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || ShoppingBag;
  };

  const getCategoryTagline = (categoryName) => {
    const taglines = {
      "Electronics": "Latest tech & gadgets",
      "Clothing": "Style for every season",
      "Home & Garden": "Essentials for every home",
      "Books": "Knowledge and entertainment",
      "Sports & Outdoors": "Equipment for active lifestyle"
    };
    return taglines[categoryName] || "Discover amazing products";
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="max-w-4xl mx-auto w-full text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <h2 className="text-xl font-semibold text-neutral-900">Loading categories...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Categories</h1>
          <p className="text-lg text-neutral-600">Explore our curated product categories</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const Icon = getCategoryIcon(category.name);
            return (
              <button
                key={category.id}
                className="group bg-white rounded-2xl shadow-soft p-6 sm:p-8 flex flex-col items-center text-center border border-neutral-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer w-full"
                onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white group-hover:scale-110 transition-transform">
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 text-lg">{category.name}</h3>
                <p className="text-neutral-500 text-sm mb-3">{getCategoryTagline(category.name)}</p>
                {category.productCount > 0 && (
                  <p className="text-xs text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full">
                    {category.productCount} products
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 