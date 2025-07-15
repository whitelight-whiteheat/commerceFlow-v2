import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Plus,
  Settings,
  LogOut,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { cn } from '../lib/utils';

// Mock analytics data (replace with API calls)
const mockAnalytics = {
  totalRevenue: 15420.50,
  totalOrders: 342,
  totalProducts: 156,
  totalCustomers: 89,
  revenueChange: 12.5,
  ordersChange: -2.3,
  productsChange: 8.7,
  customersChange: 15.2
};

const recentOrders = [
  { id: 1, customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-15' },
  { id: 2, customer: 'Jane Smith', amount: 149.50, status: 'processing', date: '2024-01-14' },
  { id: 3, customer: 'Mike Johnson', amount: 89.99, status: 'shipped', date: '2024-01-14' },
  { id: 4, customer: 'Sarah Wilson', amount: 199.99, status: 'pending', date: '2024-01-13' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 45, revenue: 4045.55 },
  { name: 'Smart Watch', sales: 32, revenue: 9596.68 },
  { name: 'Coffee Maker', sales: 28, revenue: 5599.72 },
  { name: 'Water Bottle', sales: 67, revenue: 1674.33 },
];

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-800';
      case 'processing': return 'bg-warning-100 text-warning-800';
      case 'shipped': return 'bg-primary-100 text-primary-800';
      case 'pending': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <h1 className="text-xl font-bold text-neutral-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600">
                Welcome, {user?.firstName || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">${mockAnalytics.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-primary-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className={cn("w-4 h-4", mockAnalytics.revenueChange > 0 ? "text-success-500" : "text-error-500")} />
              <span className={cn("text-sm font-medium ml-1", mockAnalytics.revenueChange > 0 ? "text-success-600" : "text-error-600")}>
                {Math.abs(mockAnalytics.revenueChange)}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-secondary-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowDownRight className={cn("w-4 h-4", mockAnalytics.ordersChange > 0 ? "text-success-500" : "text-error-500")} />
              <span className={cn("text-sm font-medium ml-1", mockAnalytics.ordersChange > 0 ? "text-success-600" : "text-error-600")}>
                {Math.abs(mockAnalytics.ordersChange)}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Products</p>
                <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Package className="text-accent-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className={cn("w-4 h-4", mockAnalytics.productsChange > 0 ? "text-success-500" : "text-error-500")} />
              <span className={cn("text-sm font-medium ml-1", mockAnalytics.productsChange > 0 ? "text-success-600" : "text-error-600")}>
                {Math.abs(mockAnalytics.productsChange)}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Customers</p>
                <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Users className="text-success-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className={cn("w-4 h-4", mockAnalytics.customersChange > 0 ? "text-success-500" : "text-error-500")} />
              <span className={cn("text-sm font-medium ml-1", mockAnalytics.customersChange > 0 ? "text-success-600" : "text-error-600")}>
                {Math.abs(mockAnalytics.customersChange)}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <Package className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Manage Products</h3>
                <p className="text-sm text-neutral-600">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                <ShoppingCart className="text-secondary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Manage Orders</h3>
                <p className="text-sm text-neutral-600">View and update order status</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/customers"
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center group-hover:bg-success-200 transition-colors">
                <Users className="text-success-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Manage Customers</h3>
                <p className="text-sm text-neutral-600">View customer information</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                <BarChart3 className="text-accent-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Analytics</h3>
                <p className="text-sm text-neutral-600">Detailed reports and insights</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{order.customer}</p>
                    <p className="text-sm text-neutral-600">${order.amount}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(order.status))}>
                      {order.status}
                    </span>
                    <span className="text-sm text-neutral-500">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Top Products</h2>
              <Link
                to="/admin/products"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{product.name}</p>
                    <p className="text-sm text-neutral-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neutral-900">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-neutral-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 