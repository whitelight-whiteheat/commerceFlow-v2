import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Star, Tag, Minus, Plus, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { getProductById } from '../lib/productData';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { addToCart, isInCart, getCartItem, updateQuantity } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  // Find product by id using centralized data
  const product = getProductById(id);
  
  // Check if product is already in cart
  const cartItem = product ? getCartItem(product.id) : null;
  const isProductInCart = product ? isInCart(product.id) : false;

  // Update quantity if product is in cart
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!product.inStock) {
      toast.error('This product is out of stock');
      return;
    }

    setIsAddingToCart(true);
    try {
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    if (!cartItem) return;
    
    try {
      await updateQuantity(cartItem.id, newQuantity);
      setQuantity(newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cartItem) return;
    
    try {
      await updateQuantity(cartItem.id, 0);
      setQuantity(1);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="inline-block mr-2" size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 bg-white rounded-2xl shadow-none md:shadow-large p-0 md:p-12">
        {/* Product Image */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
          <img
            src={product.detailImage || product.image}
            alt={product.name}
            className="w-full max-w-md rounded-xl object-cover mb-8 md:mb-0 md:sticky md:top-24 shadow-none"
            style={{ aspectRatio: '3/4', background: '#f4f4f4' }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-8 text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>
            
            {/* Product Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.isNew && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Tag size={12} /> New
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <h1 className="text-4xl font-light text-neutral-900 mb-4 tracking-tight leading-tight">{product.name}</h1>
            
            {/* Price Section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-neutral-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
                )}
              </div>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">{product.category}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cn(
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400 fill-current" 
                        : "text-neutral-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">({product.reviews} reviews)</span>
            </div>

            <div className="border-b border-neutral-200 mb-8"></div>
            
            {/* Description */}
            <p className="text-base text-neutral-700 mb-8 leading-relaxed">{product.description}</p>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-neutral-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-neutral-600 text-sm">
                      <span className="w-2 h-2 bg-neutral-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Add to Cart Section */}
          <div className="mt-8 md:mt-0 md:sticky md:bottom-12 bg-white/80 md:bg-white/90 md:backdrop-blur-md rounded-xl md:shadow-soft p-6 flex flex-col gap-4 border border-neutral-100">
            {/* Stock Status */}
            <div className="flex items-center gap-4">
              {product.inStock ? (
                <span className="text-xs text-success-700 bg-success-100 px-2 py-1 rounded-full font-medium">In Stock</span>
              ) : (
                <span className="text-xs text-error-700 bg-error-100 px-2 py-1 rounded-full font-medium">Out of Stock</span>
              )}
              
              {isProductInCart && (
                <span className="text-xs text-primary-700 bg-primary-100 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle size={12} />
                  In Cart
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm text-neutral-700 font-medium">Qty:</label>
              <div className="flex items-center border border-neutral-200 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={cn(
                    "p-2 transition-colors",
                    quantity <= 1
                      ? "text-neutral-300 cursor-not-allowed"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <Minus size={16} />
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={e => handleQuantityChange(Number(e.target.value))}
                  className="w-16 px-3 py-2 text-center border-0 focus:ring-0 focus:outline-none bg-transparent"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={cn(
                    "p-2 transition-colors",
                    quantity >= 10
                      ? "text-neutral-300 cursor-not-allowed"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isProductInCart ? (
                <>
                  <button
                    onClick={() => handleUpdateQuantity(quantity)}
                    disabled={isAddingToCart}
                    className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-primary-600 text-white hover:bg-primary-700"
                  >
                    {isAddingToCart ? "Updating..." : "Update Cart"}
                  </button>
                  <button
                    onClick={handleRemoveFromCart}
                    disabled={isAddingToCart}
                    className="py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-lg",
                    product.inStock && !isAddingToCart
                      ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-none hover:shadow-md"
                      : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                  )}
                >
                  <ShoppingCart size={22} />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => navigate('/cart')}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                View Cart
              </button>
              <span className="text-neutral-300">•</span>
              <button
                onClick={() => navigate('/checkout')}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Placeholder */}
      <div className="max-w-6xl mx-auto mt-24">
        <h2 className="text-2xl font-light text-neutral-900 mb-8 tracking-tight">Recommended Products</h2>
        <div className="bg-neutral-100 rounded-xl p-12 text-neutral-400 text-center text-lg">
          (Recommended products carousel coming soon)
        </div>
      </div>
    </div>
  );
} 