import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { HiOutlineShoppingBag, HiOutlineArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from '../../../features/auth/hook/useAuth';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { cartServices } from '../../../features/cart/services/cartServices';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isToken = Cookies.get("jwt");
    const userImage = Cookies.get('userImage');
    const userName = localStorage.getItem('name') || 'Guest';
    const { logout } = useAuth();

    const { data: cartItems } = useQuery({
        queryKey: ['cart'],
        queryFn: cartServices.getAllCart,
        enabled: !!isToken
    });

    const totalCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    localStorage.setItem("totalCount", totalCount)

    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=000&color=fff&bold=true`;

    const finalProfileImage = (userImage && userImage !== 'null' && userImage !== 'undefined')
        ? userImage
        : avatarFallback;

    const handleLogout = () => {
        Swal.fire({
            title: "LOG OUT",
            text: "Are you sure you want to leave Soul Kitchen?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#27272a",
            confirmButtonText: "YES, LOGOUT",
            cancelButtonText: "STAY",
            background: "#09090b",
            color: "#fff",
            customClass: {
                popup: 'border border-white/10 rounded-none',
                confirmButton: 'rounded-none tracking-widest text-[10px] px-6 py-3',
                cancelButton: 'rounded-none tracking-widest text-[10px] px-6 py-3'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                queryClient.clear();
                localStorage.removeItem('name');
                Cookies.remove("userImage")
                setIsOpen(false);
                navigate('/signin');
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const location = useLocation();
    const isProfilePage = location.pathname.includes('/profile');
    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about' },
        { name: 'SHOP', path: '/shop' },
        { name: 'BOOKING', path: '/reservations' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isProfilePage?"hidden" :""}  ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-black text-white tracking-[0.6em] uppercase">
                    SOUL <span className="font-light">KITCHEN</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className="text-[10px] tracking-[0.3em] text-white hover:text-white/70 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                        {isToken ? (
                            <>
                                <Link to="/cart" className="relative p-2 text-white hover:text-white/70 transition-colors">
                                    <HiOutlineShoppingBag size={20} />
                                    {totalCount > 0 && (
                                        <motion.span
                                            key={totalCount}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 text-[8px] font-bold shadow-lg border border-white/10"
                                        >
                                            {totalCount}
                                        </motion.span>
                                    )}
                                </Link>

                                <Link to="/profile" className="rounded-full border border-white/10 hover:border-white/30 transition-all overflow-hidden w-8 h-8 flex items-center justify-center bg-zinc-900 shadow-inner">
                                    <img
                                        src={finalProfileImage}
                                        alt="profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => { e.target.src = avatarFallback }}
                                    />
                                </Link>

                                <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
                                    <HiOutlineArrowRightOnRectangle size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/signin" className="text-[9px] tracking-[0.3em] text-white hover:text-white/70 transition-colors">SIGN IN</Link>
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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        ref={menuRef}
                        className="fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-black z-[110] p-8 flex flex-col border-l border-white/5 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-bold">Menu</span>
                            <button className="text-white/50 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                                <HiX size={24} />
                            </button>
                        </div>

                        {isToken && (
                            <div className="flex flex-col items-center mb-12">
                                <div className="relative mb-6">
                                    <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-[8px]"></div>
                                    <img
                                        src={finalProfileImage}
                                        className="relative w-28 h-28 rounded-full border-4 border-white/10 object-cover shadow-2xl bg-zinc-950"
                                        alt="profile"
                                        onError={(e) => { e.target.src = avatarFallback }}
                                    />
                                </div>
                                <h2 className="text-white text-xl tracking-[0.15em] font-light uppercase italic text-center">
                                    {userName}
                                </h2>
                                <div className="w-12 h-[1px] bg-white/10 mt-5"></div>
                            </div>
                        )}

                        <div className="flex flex-col gap-5">
                            {navLinks.map((link, index) => (
                                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                                    <Link to={link.path} onClick={() => setIsOpen(false)} className="text-[11px] tracking-[0.4em] text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 block uppercase">
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-white/20 bg-black"></div>
                            </div>

                            {isToken ? (
                                <div className="flex flex-col gap-6">
                                    <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                                        <div className="p-3 bg-white/5 group-hover:bg-white/10 transition-all border border-white/5 relative">
                                            <HiOutlineShoppingBag size={18} />
                                            {totalCount > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-[7px] font-black shadow-xl">
                                                    {totalCount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase">My Cart ({totalCount})</span>
                                    </Link>

                                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                                        <div className="p-3 bg-white/5 group-hover:bg-white/10 transition-all border border-white/5">
                                            <HiOutlineUser size={18} />
                                        </div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase">Account Setting</span>
                                    </Link>

                                    <button onClick={handleLogout} className="flex items-center gap-4 text-red-500/70 hover:text-red-500 transition-colors mb-2 group mt-6">
                                        <div className="p-3 bg-red-500/5 group-hover:bg-red-500/10 transition-all border border-red-500/10">
                                            <HiOutlineArrowRightOnRectangle size={18} />
                                        </div>
                                        <span className="text-[10px] tracking-[0.3em] uppercase">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 mt-2">
                                    <Link to="/signin" onClick={() => setIsOpen(false)} className="w-full py-4 text-center border border-white/10 text-[10px] tracking-[0.5em] text-white/80 hover:bg-white hover:text-black transition-all font-bold">LOGIN</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-4 text-center bg-white text-[10px] tracking-[0.5em] text-black hover:bg-white/90 transition-all font-bold shadow-lg shadow-white/5">REGISTER</Link>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/5 text-center">
                            <p className="text-[7px] tracking-[0.6em] text-white/10 uppercase font-bold">Soul Kitchen • Gastronomy Experience</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[105] lg:hidden" />
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;