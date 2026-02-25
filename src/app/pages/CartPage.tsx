import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0; // In real app, would calculate based on coupon
  const gst = subtotal * 0.18; // 18% GST
  const deliveryCharges = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + gst + deliveryCharges;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST20') {
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
          <Link
            to="/products"
            className="px-8 py-3 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-gray-900 mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-40 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="text-lg text-gray-900 hover:text-[#6B1E3B] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(item.id, item.selectedSize, item.selectedColor);
                            toast.success('Removed from cart');
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        <span>Size: {item.selectedSize}</span>
                        <span>|</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl text-gray-900">₹{item.price * item.quantity}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice * item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-5 h-5 text-[#C8A951]" />
                  <label className="text-gray-900">Apply Coupon</label>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-2 bg-[#C8A951] text-white rounded-lg hover:bg-[#b89841] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
                </div>
              </div>

              {subtotal < 999 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Add items worth ₹{(999 - subtotal).toFixed(2)} more to get FREE delivery!
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-6 py-4 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-[#6B1E3B] hover:text-[#8B2E4B] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
