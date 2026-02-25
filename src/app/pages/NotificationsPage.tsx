import React from 'react';
import { motion } from 'motion/react';
import { Bell, Package, Tag, Gift, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useShop();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return Package;
      case 'offer':
        return Tag;
      case 'promotion':
        return Gift;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600';
      case 'offer':
        return 'bg-green-100 text-green-600';
      case 'promotion':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {notifications.filter((n) => !n.read).length} unread notifications
            </p>
          </div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={() => notifications.forEach((n) => !n.read && markNotificationAsRead(n.id))}
              className="text-[#6B1E3B] hover:text-[#8B2E4B] transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white rounded-lg shadow-sm p-6 ${
                    !notification.read ? 'border-l-4 border-[#C8A951]' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getIconColor(notification.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{notification.title}</h3>
                          <p className="text-gray-600">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-4"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(notification.date)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Bell className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl text-gray-900 mb-4">No Notifications</h2>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};
