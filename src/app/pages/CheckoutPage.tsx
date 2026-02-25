import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Wallet, Building2, Banknote, Check, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const CheckoutPage: React.FC = () => {
  const { cart, user, placeOrder } = useShop();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [showSuccess, setShowSuccess] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.addresses?.[0]?.address || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const deliveryCharges = subtotal > 999 ? 0 : 99;
  const total = subtotal + gst + deliveryCharges;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.pincode) {
      toast.error('Please fill in all shipping details');
      return;
    }

    const address = {
      id: '1',
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: shippingInfo.pincode,
      isDefault: true,
    };

    placeOrder(address, paymentMethod);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-6 h-6 text-[#C8A951]" />
                <h2 className="text-xl text-gray-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C8A951] focus:ring-1 focus:ring-[#C8A951]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-6">Payment Method</h2>

              <div className="space-y-3">
                {[
                  { id: 'upi', icon: Wallet, label: 'UPI (Google Pay, PhonePe, Paytm)' },
                  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
                  { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                  { id: 'cod', icon: Banknote, label: 'Cash on Delivery' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full p-4 border-2 rounded-lg transition-all flex items-center space-x-4 ${
                      paymentMethod === method.id
                        ? 'border-[#6B1E3B] bg-[#6B1E3B]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      paymentMethod === method.id ? 'border-[#6B1E3B]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-3 h-3 bg-[#6B1E3B] rounded-full"></div>
                      )}
                    </div>
                    <method.icon className="w-6 h-6 text-gray-600" />
                    <span className="flex-1 text-left text-gray-900">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-3">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-900 mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>
              <h2 className="text-2xl text-gray-900 mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been confirmed and will be delivered soon.
              </p>
              <div className="animate-pulse text-sm text-gray-500">
                Redirecting to your orders...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
