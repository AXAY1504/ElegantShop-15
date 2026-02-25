import React from 'react';
import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="text-9xl font-bold text-[#6B1E3B] mb-4">404</h1>
        <h2 className="text-3xl text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/products"
            className="px-8 py-3 border-2 border-[#6B1E3B] text-[#6B1E3B] rounded-lg hover:bg-[#6B1E3B] hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
