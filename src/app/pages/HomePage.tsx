import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Sparkles, Tag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';

export const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 8);
  const trendingProducts = mockProducts.slice(8, 16);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#6B1E3B] to-[#8B2E4B] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C8A951] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8A951] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#C8A951]" />
                <span className="text-white text-sm">New Collection 2026</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Your
                <br />
                <span className="text-[#C8A951]">Perfect Style</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8">
                Explore the latest fashion trends with up to 50% off on selected items
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products?category=Women"
                  className="px-8 py-4 bg-white text-[#6B1E3B] rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 group"
                >
                  <span>Shop Women</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?category=Men"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#6B1E3B] transition-colors"
                >
                  Shop Men
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop', color: 'from-pink-500 to-rose-500' },
              { name: 'Men', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=500&fit=crop', color: 'from-blue-500 to-indigo-500' },
              { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919436766-f2d52fd4d4c4?w=400&h=500&fit=crop', color: 'from-yellow-500 to-orange-500' },
              { name: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop', color: 'from-purple-500 to-pink-500' },
              { name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop', color: 'from-green-500 to-teal-500' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="group relative block rounded-xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  <div className="absolute inset-0 flex items-end p-4">
                    <h3 className="text-white text-xl">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-12 bg-gradient-to-r from-[#C8A951] to-[#d4b861]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Tag className="w-8 h-8 text-[#6B1E3B]" />
                <h2 className="text-3xl text-[#6B1E3B]">Flash Sale!</h2>
              </div>
              <p className="text-[#6B1E3B]/80">Limited time offer - Don't miss out!</p>
            </div>
            <Link
              to="/products?sale=true"
              className="px-8 py-3 bg-[#6B1E3B] text-white rounded-lg hover:bg-[#5a1830] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked just for you</p>
            </div>
            <Link
              to="/products"
              className="text-[#6B1E3B] hover:text-[#8B2E4B] flex items-center space-x-2 group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-[#C8A951]" />
            <div>
              <h2 className="text-3xl text-gray-900">Trending Now</h2>
              <p className="text-gray-600">Most popular items this week</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 text-center mb-12">Featured Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {['Libas', 'Biba', 'Levis', 'H&M', 'Nike', 'Zara'].map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="text-xl text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                review: 'Amazing collection and great quality! I love shopping here.',
                rating: 5,
              },
              {
                name: 'Rahul Verma',
                review: 'Fast delivery and excellent customer service. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Anita Desai',
                review: 'Best prices and trendy styles. My go-to fashion destination!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-[#C8A951]">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                <p className="text-gray-900">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-[#6B1E3B] to-[#8B2E4B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">Stay Updated!</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter and get exclusive offers and updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A951]"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#C8A951] text-white rounded-lg hover:bg-[#b89841] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
