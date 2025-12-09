import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

const Categories = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">
            Explore Our <span className="text-[#C97C5C]">Topics</span>
          </h2>
          <p className="text-lg text-[#2C2C2C]/70 max-w-2xl mx-auto">
            Dive into carefully curated content across diverse categories, each offering valuable insights and practical knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to={`/category/${category.slug}`} key={category.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-[#F5F1E8] hover:bg-white border-2 border-transparent hover:border-[#A8B8A8]/30 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg h-full"
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </motion.div>
                    <span className="text-sm font-semibold text-[#2C2C2C] group-hover:text-[#C97C5C] transition-colors duration-300 text-center">
                      {category.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#C97C5C]/0 to-[#A8B8A8]/0 group-hover:from-[#C97C5C]/5 group-hover:to-[#A8B8A8]/5 transition-all duration-300"></div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://horizons-cdn.hostinger.com/dd5ac651-6d98-4fad-a856-a2a0e939afa5/7769a74c5dadab420d901b54e47d5a01.jpg" 
              alt="Flat lay of various lifestyle categories including gardening, healthy food, DIY crafts, personal finance, and travel"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C]/80 via-[#2C2C2C]/40 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Knowledge for Every Aspect of Life
                </h3>
                <p className="text-white/90 text-lg">
                  From home to health, finances to family—we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;