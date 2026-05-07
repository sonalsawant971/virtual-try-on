import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, size, color, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
