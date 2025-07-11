import { useCartStore } from '../stores/cartStore';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, getTotal, getItemCount } = useCartStore();

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-xl shadow-soft p-8">
        <h1 className="text-3xl font-bold mb-8 text-neutral-900">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center text-neutral-500 py-24">
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link to="/products" className="text-primary-600 hover:underline font-medium">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-neutral-900">{item.name}</h2>
                    <div className="text-neutral-500 text-sm">${item.price} x {item.quantity}</div>
                  </div>
                  <div className="font-bold text-neutral-900 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-error-600 hover:text-error-800 text-sm font-medium px-3 py-1 rounded-lg border border-error-100 hover:bg-error-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-100 flex flex-col gap-4 h-fit">
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <div className="flex justify-between text-neutral-700">
                <span>Items</span>
                <span>{getItemCount()}</span>
              </div>
              <div className="flex justify-between text-neutral-900 font-bold text-lg">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 