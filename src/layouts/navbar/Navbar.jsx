import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { HiOutlineShoppingBag, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from '../../features/auth/hook/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isToken = Cookies.get("jwt");
    const { logout } = useAuth();

    // 1. هندلة تسجيل الخروج بسويت اليرت
    const handleLogout = () => {
        Swal.fire({
            title: "LOG OUT",
            text: "Are you sure you want to leave Soul Kitchen?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f97316", // Orange
            cancelButtonColor: "#27272a", // Zinc
            confirmButtonText: "YES, LOGOUT",
            cancelButtonText: "STAY",
            background: "#09090b",
            color: "#fff",
            customClass: {
                popup: 'border border-white/10 rounded-none',
                confirmButton: 'rounded-none tracking-widest text-xs',
                cancelButton: 'rounded-none tracking-widest text-xs'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                queryClient.clear(); // تنظيف كاش الداتا تماماً
                setIsOpen(false);
                navigate('/signin');
            }
        });
    };

    // background change on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
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
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
            isScrolled ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'
        }`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-black text-white tracking-[0.6em] uppercase">
                    SOUL <span className="font-light">KITCHEN</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className="text-[10px] tracking-[0.3em] text-white hover:text-orange-500 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                        {isToken ? (
                            <>
                                <Link to="/cart" className="relative p-2 text-white hover:text-orange-500 transition-colors">
                                    <HiOutlineShoppingBag size={20} />
                                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[8px] font-bold">0</span>
                                </Link>
                                <Link to="/profile" className="rounded-full border border-white/20 hover:border-orange-500 transition-all">
                                    <img src="/user.png" alt="profile" className="h-7 w-7 rounded-full object-cover" />
                                </Link>
                                <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
                                    <HiOutlineArrowRightOnRectangle size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/signin" className="text-[9px] tracking-[0.3em] text-white hover:text-orange-500 transition-colors">SIGN IN</Link>
                                <Link to="/signup" className="px-5 py-2 border border-white text-[9px] tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all">SIGN UP</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX size={26} /> : <HiOutlineMenuAlt3 size={26} />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4 }}
                        ref={menuRef}
                        className="fixed top-0 right-0 h-screen w-3/4 bg-zinc-950 z-[110] p-12 flex flex-col border-l border-white/5 shadow-2xl"
                    >
                        <button className="self-end text-white mb-12" onClick={() => setIsOpen(false)}>
                            <HiX size={30} />
                        </button>

                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-xs tracking-[0.4em] text-white hover:text-orange-500 transition-colors">
                                    {link.name}
                                </Link>
                            ))}

                            <div className="h-[1px] w-full bg-white/5 my-4"></div>

                            {isToken ? (
                                <div className="flex flex-col gap-8">
                                    <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-white">
                                        <HiOutlineShoppingBag size={22} /> <span className="text-[10px] tracking-[0.3em]">CART (0)</span>
                                    </Link>
                                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-white">
                                        <img src="/user.png" className="w-8 h-8 rounded-full border border-white/10" alt="profile" /> <span className="text-[10px] tracking-[0.3em]">PROFILE</span>
                                    </Link>
                                    <button onClick={handleLogout()} className="flex items-center gap-4 text-red-500">
                                        <HiOutlineArrowRightOnRectangle size={22} /> <span className="text-[10px] tracking-[0.3em]">LOGOUT</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    <Link to="/signin" onClick={() => setIsOpen(false)} className="text-[10px] tracking-[0.4em] text-white">SIGN IN</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="text-[10px] tracking-[0.4em] text-orange-500">SIGN UP</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden"></div>}
        </nav>
    );
};

export default Navbar;