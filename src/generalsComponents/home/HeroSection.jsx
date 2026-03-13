import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function HeroSection() {
    

    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">

            {/* 1. Background Image */}
            <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/images/resturent.jpg')`, 
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]"></div>
            </motion.div>

            {/* 2. Content - محتوى الهيرو */}
            <div className="relative z-10 text-center px-4 max-w-5xl">

                {/* */}
                <motion.p 
                    initial={{ opacity: 0, tracking: "0.2em" }}
                    animate={{ opacity: 0.8, tracking: "0.8em" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="text-white text-[10px] md:text-xs uppercase mb-6 font-light"
                >
                    Enjoy an unforgettable experience
                </motion.p>

                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-black text-white tracking-[0.1em] leading-none uppercase mb-12"
                >
                    Soul <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white italic font-serif">
                        Kitchen
                    </span>
                </motion.h1>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
                >
                    <button className="group relative px-12 py-4 bg-transparent border border-white text-white text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
                        <Link to={"/shop"} className="relative z-10">See Menu</Link>
                    </button>

                    <button className="group relative px-12 py-4 bg-white text-black text-[10px] tracking-[0.4em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500 overflow-hidden">
                        <Link to={"/reservations"} className="relative z-10">Book Your Table</Link>
                    </button>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute left-8 top-60 hidden lg:block"
            >
                <p className="text-white/50 text-[12px] tracking-[1em] uppercase rotate-90 origin-left font-bold">
                    Welcome
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent shadow-[0_0_8px_white]"
                />
            </motion.div>

        </section>
    )
}

export default HeroSection