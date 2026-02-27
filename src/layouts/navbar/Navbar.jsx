import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // backgrounf change 
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // when click out side close nav 
      useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about' },
        { name: 'MENUS', path: '/menus' },
        { name: 'SHOP', path: '/shop' },
        { name: 'CONTACT', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                isScrolled 
                ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' 
                : 'bg-transparent py-8'
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                
                {/* Logo (Centered) */}
                <Link to="/" className="text-xl md:text-2xl font-black text-white tracking-[0.6em] uppercase">
                    SOUL <span className="font-light">KITCHEN</span>
                </Link>
                {/* Desktop Left Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path} 
                            className="text-[10px] tracking-[0.3em] text-white hover:text-gray-400 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>


                {/* Desktop Right Links & Auth Buttons */}
                <div className="hidden lg:flex items-center gap-8">
                

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-6">
                        <Link to="/signin" className="text-[9px] tracking-[0.3em] text-white hover:opacity-60 transition-opacity">SIGN IN</Link>
                        <Link to="/signup" className="px-5 py-2 border border-white text-[9px] tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all">SIGN UP</Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4 }}
                        ref={menuRef}
                        className="fixed top-0 right-0 h-screen w-3/4 bg-black z-[110] p-12 flex flex-col shadow-2xl border-l border-white/5"
                    >
                        <button className="self-end text-white mb-12" onClick={() => setIsOpen(false)}>
                            <HiX size={30} />
                        </button>
                        
                        <div className="flex flex-col  gap-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs tracking-[0.4em] text-white hover:text-gray-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-[1px] w-full bg-white/10 my-4"></div>
                            <Link to="/signin" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.4em] text-white">SIGN IN</Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.4em] text-orange-500">SIGN UP</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay for Click Outside */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden"></div>
            )}
        </nav>
    );
};

export default Navbar;