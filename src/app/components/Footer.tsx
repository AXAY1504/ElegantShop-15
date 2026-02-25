import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B2B2B] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Logo className="text-white" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your ultimate destination for the latest fashion trends. Shop from our exclusive collection of ethnic and western wear.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-[#C8A951] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#C8A951] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-[#C8A951] transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[#C8A951] transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C8A951] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-white mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#C8A951] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#C8A951] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-[#C8A951] transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C8A951] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#C8A951] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                <span>123, MG Road, Bangalore, Karnataka - 560001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#C8A951] flex-shrink-0" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#C8A951] flex-shrink-0" />
                <span>support@elegantshop.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white mb-2">Subscribe to Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-[#C8A951] text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C8A951] text-white rounded-r-lg hover:bg-[#b89841] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>© 2026 ElegantShop. All rights reserved. | Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};
