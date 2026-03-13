import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ActionSection = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* 1. Background Image with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/img.png" 
          alt="Soul Kitchen Experience" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* 2. Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-yellow-600 tracking-[0.5em] uppercase text-xs font-bold mb-4 block"
        >
          Elevate Your Evening
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-white mb-12 leading-tight"
        >
          Whether at our table <br /> or yours.
        </motion.h2>

        {/* 3. Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          {/* Book a Table Button */}
          <Link 
            to="/reservations" 
            className="group relative px-12 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden transition-all duration-500 hover:text-white"
          >
            <span className="relative z-10">Book a Table</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>

          {/* Delivery Order Button */}
          <Link 
            to="/shop" 
            className="group px-12 py-4 border border-white text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-500"
          >
            Delivery Order
          </Link>
        </motion.div>
      </div>

      {/* Optional: Subtle Border Frame */}
      <div className="absolute inset-8 border border-white/10 pointer-events-none z-20"></div>
    </section>
  );
};

export default ActionSection;