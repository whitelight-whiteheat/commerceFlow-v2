import { ShoppingBag, Home as HomeIcon, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockCategories = [
  { id: 1, name: "Electronics", icon: ShoppingBag, tagline: "Latest tech & gadgets" },
  { id: 2, name: "Home & Kitchen", icon: HomeIcon, tagline: "Essentials for every home" },
  { id: 3, name: "Clothing", icon: Shirt, tagline: "Style for every season" }
];

export default function Categories() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-light text-neutral-900 mb-8 text-center">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockCategories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="group bg-white rounded-2xl shadow-soft p-8 flex flex-col items-center text-center border border-neutral-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer w-full"
                onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 text-lg">{category.name}</h3>
                <p className="text-neutral-500 text-sm">{category.tagline}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 