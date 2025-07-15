import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, getItemCount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const taxRate = 0.08;
  const shippingCost = 0; // Free shipping
  const subtotal = getTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  const handleShippingChange = (field, value) => {
    setShippingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateShippingForm = () => {
    const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode'];
    for (const field of required) {
      if (!shippingData[field]?.trim()) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateShippingForm()) {
      setCurrentStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        shippingAddress: {
          street: shippingData.street,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
          country: shippingData.country
        },
        paymentMethod,
        customerInfo: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
          phone: shippingData.phone
        }
      };

      const response = await api.post('/orders/create', orderData);
      const { order } = response.data;
      
      setOrderId(order.id);
      setOrderComplete(true);
      setCurrentStep(3);
      
      // Clear cart after successful order
      await clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Order creation error:', error);
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-soft p-12">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Your cart is empty</h1>
            <p className="text-neutral-600 mb-6">You need items in your cart to proceed to checkout.</p>
            <button
              onClick={handleBackToCart}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToCart}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= step
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-200 text-neutral-600"
                )}>
                  {currentStep > step ? <CheckCircle size={16} /> : step}
                </div>
                {step < 3 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-2",
                    currentStep > step ? "bg-primary-600" : "bg-neutral-200"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-neutral-600">
            <span className={cn("mx-8", currentStep >= 1 && "text-primary-600 font-medium")}>
              Shipping
            </span>
            <span className={cn("mx-8", currentStep >= 2 && "text-primary-600 font-medium")}>
              Payment
            </span>
            <span className={cn("mx-8", currentStep >= 3 && "text-primary-600 font-medium")}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={24} className="text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={shippingData.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={shippingData.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingData.street}
                      onChange={(e) => handleShippingChange('street', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingData.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={shippingData.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={shippingData.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Country
                    </label>
                    <select
                      value={shippingData.country}
                      onChange={(e) => handleShippingChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleProceedToPayment}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={24} className="text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <CreditCard size={20} className="text-neutral-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                  </div>

                  <div className="border border-neutral-200 rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="font-medium">PayPal</span>
                    </label>
                  </div>

                  {/* Mock Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    ← Back to Shipping
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={cn(
                      "bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors",
                      isProcessing
                        ? "bg-neutral-300 cursor-not-allowed"
                        : "hover:bg-primary-700"
                    )}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && orderComplete && (
              <div className="bg-white rounded-xl shadow-soft p-6 text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-success-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Order Confirmed!</h2>
                <p className="text-neutral-600 mb-4">
                  Thank you for your order. We've sent a confirmation email to {shippingData.email}.
                </p>
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-neutral-600">Order ID: <span className="font-mono font-medium">{orderId}</span></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleContinueShopping}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/orders')}
                    className="border border-neutral-300 text-neutral-700 px-6 py-3 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0] || item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-900 truncate">{item.product.name}</h4>
                      <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-200 pt-4 space-y-3">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({getItemCount()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-success-600">Free</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-neutral-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">Including tax</p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Lock size={16} />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 