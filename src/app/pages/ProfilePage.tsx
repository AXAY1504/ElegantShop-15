import React from 'react';
import { useNavigate, Link } from 'react-router';
import { User, Package, MapPin, Heart, Bell, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { user, logout, orders } = useShop();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-r from-[#6B1E3B] to-[#C8A951] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                  {user.name[0]}
                </div>
                <h2 className="text-xl text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-[#6B1E3B]/5 text-[#6B1E3B] rounded-lg">
                  <Package className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
                <Link
                  to="/wishlist"
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/notifications"
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Account Details</h2>
                <button className="text-[#6B1E3B] hover:text-[#8B2E4B]">Edit</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone</label>
                  <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                </div>
              </div>
            </motion.div>

            {/* Saved Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Saved Addresses</h2>
                <button className="text-[#6B1E3B] hover:text-[#8B2E4B]">+ Add New</button>
              </div>

              {user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-900">{address.name}</p>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-gray-600">{address.phone}</p>
                            {address.isDefault && (
                              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="text-[#6B1E3B] hover:text-[#8B2E4B]">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No saved addresses</p>
              )}
            </motion.div>

            {/* Order History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl text-gray-900 mb-6">Order History</h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-[#C8A951] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={`${item.id}-${item.selectedSize}`}
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-sm">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{order.items.length} items</p>
                          <p className="text-lg text-gray-900">₹{order.total.toFixed(2)}</p>
                        </div>
                        <button className="flex items-center space-x-2 text-[#6B1E3B] hover:text-[#8B2E4B]">
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link
                    to="/products"
                    className="inline-block px-6 py-2 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
