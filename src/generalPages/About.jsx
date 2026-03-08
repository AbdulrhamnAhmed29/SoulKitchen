import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-light overflow-x-hidden">
      
      {/* 1. Hero Section -     */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" 
            alt="Luxury Kitchen" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, tracking: "0.1em" }}
            animate={{ opacity: 1, tracking: "0.6em" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-[10px] uppercase text-gray-400 mb-4 block"
          >
            Discover Our Essence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-9xl font-semibold tracking-tighter mb-6 italic"
          >
            Soul Kitchen
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="h-[1px] bg-white/30 mx-auto"
          />
        </div>
      </section>

      {/* 2. Our Philosophy - */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            {...fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight">
              Where Culinary Art <br /> <span className="text-gray-500 italic">Meets The Soul.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg font-light max-w-xl">
              Started in 2021, Soul Kitchen was born from a desire to redefine the dining experience. 
              We don't just serve food; we curate moments of pure sensory delight through 
              meticulous craftsmanship.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500"></div>
                <span className="text-xs uppercase tracking-[0.3em]">Our Heritage</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80" 
                alt="Chef Craft" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. The Excellence Pillars - Stagger Animation */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { num: "01", title: "Pure Ingredients", desc: "Sourced from private organic farms, ensuring every bite is pure." },
              { num: "02", title: "Master Chefs", desc: "Led by world-class visionaries who blend tradition with innovation." },
              { num: "03", title: "Luxe Ambiance", desc: "An atmosphere designed for intimacy and unforgettable memories." }
            ].map((pillar, index) => (
              <motion.div key={index} variants={fadeInUp} className="space-y-4">
                <span className="text-2xl font-serif italic text-gray-600">{pillar.num}</span>
                <h4 className="text-sm uppercase tracking-[0.4em] font-medium">{pillar.title}</h4>
                <p className="text-gray-500 text-xs leading-loose px-4">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Signature Quote */}
      <section className="py-40 text-center px-6">
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl mx-auto space-y-10"
        >
          <h3 className="text-3xl md:text-5xl font-light italic leading-relaxed tracking-tight text-gray-200">
            "We believe that the best ingredient in any kitchen is the soul of the people who cook within it."
          </h3>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">— Master Chef Favour Osim</p>
        </motion.div>
      </section>

      {/* 5. Call to Action - الأزرار الجديدة */}
      <section className="pb-40 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border border-white/10 p-16 md:p-24 max-w-5xl mx-auto rounded-sm bg-gradient-to-t from-white/[0.03] to-transparent"
        >
          <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">Begin your journey.</h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* زرار التسوق الجديد */}
            <Link to="/shop" className="w-full md:w-auto">
              <button className="w-full md:px-12 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold border border-white hover:bg-transparent hover:text-white transition-all duration-500">
                Start Shopping
              </button>
            </Link>

            {/* زرار الحجز */}
            <Link to="/reservations" className="w-full md:w-auto">
              <button className="w-full md:px-12 py-5 bg-transparent text-white text-[10px] uppercase tracking-[0.4em] font-bold border border-white/20 hover:border-white transition-all duration-500">
                Book a Table
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;