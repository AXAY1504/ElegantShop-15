import React from 'react';
import { Link } from 'react-router';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  const handleMoveToCart = (product: any) => {
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      removeFromWishlist(product.id);
      toast.success('Moved to cart!');
    }
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-gray-900 mb-8">My Wishlist ({wishlist.length} items)</h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlist.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group"
                >
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-[#6B1E3B] text-white px-2 py-1 rounded-md text-sm">
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-gray-800 mb-2 line-clamp-2 hover:text-[#6B1E3B] transition-colors block"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 px-4 py-2 bg-[#C8A951] text-white rounded-lg hover:bg-[#b89841] transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl text-gray-900 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite items here to buy them later</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
