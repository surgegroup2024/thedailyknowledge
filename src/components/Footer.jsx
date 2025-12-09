import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2C2C] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-[#C97C5C]" />
              <span className="text-xl font-bold">The Daily Knowledge</span>
            </div>
            <p className="text-white/70 mb-4 max-w-md">
              Your trusted source for daily insights across lifestyle, wellness, and personal growth. 
              Empowering readers with knowledge that matters.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#C97C5C] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#C97C5C] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#C97C5C] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#C97C5C] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#C97C5C]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Categories</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Latest Articles</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#C97C5C]">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Cookie Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#C97C5C] transition-colors duration-300">Advertise</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/60 text-sm">
            © {currentYear} The Daily Knowledge. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Mail className="w-4 h-4" />
            <span>hello@thedailyknowledge.com</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;