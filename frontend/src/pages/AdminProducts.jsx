import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Package,
  ArrowUpDown,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { allProducts, getAllCategories } from '../lib/productData';

// Convert centralized product data to admin format
const convertToAdminFormat = (products) => {
  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.inStock ? Math.floor(Math.random() * 100) + 10 : 0, // Mock stock based on inStock
    category: product.category,
    status: product.inStock ? "active" : "inactive",
    image: product.image,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last 30 days
  }));
};

const adminProducts = convertToAdminFormat(allProducts);
const categories = getAllCategories();

export default function AdminProducts() {
  const [products, setProducts] = useState(adminProducts);
  const [filteredProducts, setFilteredProducts] = useState(adminProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [_isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [_isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [_editingProduct, setEditingProduct] = useState(null);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return a.stock - b.stock;
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);
//select product
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
//select all
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };
//delete selected
  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };
//edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };
//get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'inactive': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };
//get stock color
  const getStockColor = (stock) => {
    if (stock === 0) return 'text-error-600';
    if (stock < 10) return 'text-warning-600';
    return 'text-success-600';
  };

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
              <h1 className="text-xl font-bold text-neutral-900">Product Management</h1>
            </div>
            {/* add product */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-neutral-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="text-neutral-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="createdAt">Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 px-3 py-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-neutral-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-neutral-600">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-neutral-900">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("font-medium", getStockColor(product.stock))}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(product.status))}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-neutral-600">{product.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-neutral-400 hover:text-error-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No products found</h3>
            <p className="mt-1 text-sm text-neutral-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modals would go here */}
    </div>
  );
} 