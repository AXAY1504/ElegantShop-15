import React, { useState } from 'react';
import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../context/ShopContext';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToWishlist, removeFromWishlist, wishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast.success('Added to cart');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-[#6B1E3B] text-white px-2 py-1 rounded-md text-sm">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-[#6B1E3B] rounded-full shadow-lg hover:bg-[#6B1E3B] hover:text-white transition-colors flex items-center space-x-2 z-10"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Quick Add</span>
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="text-gray-800 mb-2 line-clamp-2 group-hover:text-[#6B1E3B] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1 bg-[#C8A951] text-white px-2 py-0.5 rounded text-xs">
              <span>{product.rating}</span>
              <span>★</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-sm text-green-600">({product.discount}% OFF)</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
