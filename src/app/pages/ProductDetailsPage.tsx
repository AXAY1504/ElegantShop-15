import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Heart, ShoppingCart, Share2, Truck, RefreshCw, Shield, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { mockProducts } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { toast } from 'sonner';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();

  const product = mockProducts.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Product not found</p>
          <Link to="/products" className="text-[#6B1E3B] hover:text-[#8B2E4B]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      toast.error('Please select a color');
      return;
    }

    addToCart(product, selectedSize || product.sizes[0], selectedColor || product.colors[0], quantity);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#6B1E3B]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#6B1E3B]">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-[#6B1E3B]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-[#6B1E3B] text-white px-3 py-1 rounded-md">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail images would go here in a real app */}
              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-[#6B1E3B]' : 'border-transparent'
                    }`}
                  >
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-4">
                <p className="text-gray-500 mb-1">{product.brand}</p>
                <h1 className="text-3xl text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-1 bg-[#C8A951] text-white px-3 py-1 rounded">
                  <span>{product.rating}</span>
                  <span>★</span>
                </div>
                <span className="text-gray-600">{product.reviews} Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                <span className="text-3xl text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="text-xl text-green-600">({product.discount}% OFF)</span>
                  </>
                )}
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-900">Select Size</label>
                    <button className="text-sm text-[#6B1E3B] hover:text-[#8B2E4B]">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded-lg transition-all ${
                          selectedSize === size
                            ? 'bg-[#6B1E3B] text-white border-[#6B1E3B]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#6B1E3B]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="text-gray-900 mb-3 block">Select Color</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border rounded-lg transition-all ${
                          selectedColor === color
                            ? 'bg-[#6B1E3B] text-white border-[#6B1E3B]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#6B1E3B]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-gray-900 mb-3 block">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-[#C8A951] text-white rounded-lg hover:bg-[#b89841] transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleWishlistToggle}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isInWishlist ? 'Saved' : 'Wishlist'}</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">For orders above ₹999</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">7 days return policy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% secure transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[
              { name: 'Anjali Mehta', rating: 5, review: 'Excellent quality and perfect fit!', date: '2 days ago' },
              { name: 'Raj Kumar', rating: 4, review: 'Good product but delivery was slightly delayed.', date: '1 week ago' },
              { name: 'Sneha Patel', rating: 5, review: 'Loved it! Exactly as shown in pictures.', date: '2 weeks ago' },
            ].map((review, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#C8A951] rounded-full flex items-center justify-center text-white">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-[#C8A951] text-white px-2 py-1 rounded text-sm">
                    <span>{review.rating}</span>
                    <span>★</span>
                  </div>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
