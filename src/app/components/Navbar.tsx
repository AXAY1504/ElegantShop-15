import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Heart, User, Menu, X, Bell } from 'lucide-react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { cart, wishlist, user, unreadNotificationCount } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Women', path: '/products?category=Women' },
    { name: 'Men', path: '/products?category=Men' },
    { name: 'Kids', path: '/products?category=Kids' },
    { name: 'Footwear', path: '/products?category=Footwear' },
    { name: 'Accessories', path: '/products?category=Accessories' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6B1E3B] to-[#C8A951] text-white text-center py-2 text-sm">
        <p>✨ Festive Sale Live! Get Up to 50% OFF on Select Items | Free Shipping Above ₹999</p>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Logo />

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-gray-700 hover:text-[#6B1E3B] transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* User */}
              <Link
                to={user ? '/profile' : '/login'}
                className="flex items-center space-x-1 text-gray-700 hover:text-[#6B1E3B] transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden lg:inline text-sm">{user ? user.name.split(' ')[0] : 'Login'}</span>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-gray-700 hover:text-[#6B1E3B] transition-colors">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#C8A951] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Notifications */}
              {user && (
                <Link to="/notifications" className="relative text-gray-700 hover:text-[#6B1E3B] transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadNotificationCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </motion.span>
                  )}
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative text-gray-700 hover:text-[#6B1E3B] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute -top-2 -right-2 bg-[#6B1E3B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C8A951]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block py-3 text-lg text-gray-700 hover:text-[#6B1E3B] border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
