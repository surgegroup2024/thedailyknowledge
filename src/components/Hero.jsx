import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F1E8] via-[#E8DFD0] to-[#F5F1E8] py-20 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#A8B8A8] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C97C5C] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#C97C5C]" />
            <span className="text-sm font-medium text-[#2C2C2C]">Daily Essential Reading</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-[#2C2C2C] mb-6 tracking-tight"
          >
            The Daily <span className="text-[#C97C5C]">Knowledge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-[#2C2C2C]/80 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Your daily essential resource for reliable, insightful articles spanning lifestyle, wellness, and personal growth. 
            Discover trusted knowledge that enriches your everyday life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-[#A8B8A8]"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Curated with care, delivered daily</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://horizons-cdn.hostinger.com/dd5ac651-6d98-4fad-a856-a2a0e939afa5/de839865593b524dda6c81e6f32e4f10.jpg" 
              alt="Woman reading and learning with tablet in cozy home setting"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/60 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;