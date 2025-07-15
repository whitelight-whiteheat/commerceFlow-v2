import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { useAuthStore } from './authStore';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      // Load cart from server
      loadCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) return;

        set({ isLoading: true });
        try {
          const response = await api.get('/cart');
          set({ 
            items: response.data.items || [],
            isLoading: false 
          });
        } catch (error) {
          console.error('Failed to load cart:', error);
          set({ isLoading: false });
        }
      },

      // Add item to cart
      addToCart: async (productId, quantity = 1) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) {
          toast.error('Please login to add items to cart');
          return { success: false };
        }

        set({ isLoading: true });
        try {
          const response = await api.post('/cart/add', { productId, quantity });
          const { item } = response.data;
          
          set(state => ({
            items: state.items.map(existingItem => 
              existingItem.product.id === productId 
                ? { ...existingItem, quantity: existingItem.quantity + quantity }
                : existingItem
            ).concat(
              state.items.some(existingItem => existingItem.product.id === productId) 
                ? [] 
                : [item]
            ),
            isLoading: false
          }));

          toast.success('Added to cart!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Failed to add to cart';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Update cart item quantity
      updateQuantity: async (itemId, quantity) => {
        set({ isLoading: true });
        try {
          const response = await api.put(`/cart/update/${itemId}`, { quantity });
          const { item } = response.data;
          
          set(state => ({
            items: state.items.map(cartItem => 
              cartItem.id === itemId ? item : cartItem
            ),
            isLoading: false
          }));

          toast.success('Cart updated!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Failed to update cart';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Remove item from cart
      removeFromCart: async (itemId) => {
        set({ isLoading: true });
        try {
          await api.delete(`/cart/remove/${itemId}`);
          
          set(state => ({
            items: state.items.filter(item => item.id !== itemId),
            isLoading: false
          }));

          toast.success('Item removed from cart');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Failed to remove item';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Clear cart
      clearCart: async () => {
        set({ isLoading: true });
        try {
          await api.delete('/cart/clear');
          set({ items: [], isLoading: false });
          toast.success('Cart cleared');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Failed to clear cart';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Get cart total
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          return total + (item.product.price * item.quantity);
        }, 0);
      },

      // Get cart item count
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Check if product is in cart
      isInCart: (productId) => {
        const { items } = get();
        return items.some(item => item.product.id === productId);
      },

      // Get cart item by product ID
      getCartItem: (productId) => {
        const { items } = get();
        return items.find(item => item.product.id === productId);
      },

      // Sync cart with server (called on auth state change)
      syncCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          await get().loadCart();
        } else {
          set({ items: [] });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
); 