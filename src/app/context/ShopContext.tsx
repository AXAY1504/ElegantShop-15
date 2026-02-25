import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockProducts } from '../data/mockData';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  hoverImage?: string;
  category: string;
  subCategory?: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'promotion';
  date: string;
  read: boolean;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  orders: Order[];
  notifications: Notification[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  placeOrder: (address: Address, paymentMethod: string) => Order;
  markNotificationAsRead: (notificationId: string) => void;
  unreadNotificationCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to ElegantShop!',
      message: 'Get 20% off on your first order. Use code: FIRST20',
      type: 'offer',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'New Collection Alert',
      message: 'Check out our latest summer collection',
      type: 'promotion',
      date: new Date(Date.now() - 86400000).toISOString(),
      read: false,
    },
  ]);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('elegantshop_cart');
    const savedWishlist = localStorage.getItem('elegantshop_wishlist');
    const savedUser = localStorage.getItem('elegantshop_user');
    const savedOrders = localStorage.getItem('elegantshop_orders');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('elegantshop_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('elegantshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('elegantshop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('elegantshop_user');
    }
  }, [user]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('elegantshop_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color))
    );
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    setUser({
      id: '1',
      name: 'Priya Sharma',
      email: email,
      phone: '+91 98765 43210',
      addresses: [
        {
          id: '1',
          name: 'Priya Sharma',
          phone: '+91 98765 43210',
          address: 'Flat 301, Green Valley Apartments, MG Road',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          isDefault: true,
        },
      ],
    });
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would call an API
    setUser({
      id: '1',
      name: name,
      email: email,
      phone: '',
      addresses: [],
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
  };

  const placeOrder = (address: Address, paymentMethod: string): Order => {
    const order: Order = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'confirmed',
      address,
    };

    setOrders((prev) => [order, ...prev]);
    clearCart();

    // Add notification
    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        title: 'Order Confirmed',
        message: `Your order ${order.id} has been confirmed and will be delivered soon.`,
        type: 'order',
        date: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);

    return order;
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Products from mock data
  const products: Product[] = mockProducts;

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        orders,
        notifications,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        login,
        signup,
        logout,
        placeOrder,
        markNotificationAsRead,
        unreadNotificationCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};