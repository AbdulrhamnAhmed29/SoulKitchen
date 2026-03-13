import React from 'react';
import BookForm from '../component/Book';
import { useCreateReservations } from "../hook/useBooking";
import { motion } from 'framer-motion';
import { RiTimeLine, RiInformationLine, RiDoubleQuotesL } from "react-icons/ri";

function BookPage() {
    const { isError, isLoading, BookTable } = useCreateReservations();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-10 overflow-hidden"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />

            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-20 relative z-10">
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4"
                >
                    <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase block">The Art of Dining</span>
                    <h1 className="text-5xl md:text-7xl font-serif italic font-light tracking-tight text-white uppercase">
                        Reserve A Table
                    </h1>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"></div>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                
                {/* Left Side: Information & Quote */}
                <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-4 space-y-8 lg:sticky lg:top-32"
                >
                    {/* Opening Hours Card */}
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-3xl backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <RiTimeLine className="text-white/40" size={20} />
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Opening Hours</h3>
                        </div>
                        <ul className="space-y-6 text-sm">
                            {[
                                { day: "Mon - Fri", time: "10:00 AM - 11:00 PM" },
                                { day: "Saturday", time: "12:00 PM - 12:00 AM" },
                                { day: "Sunday", time: "Closed", special: true }
                            ].map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center group">
                                    <span className="text-white/40 group-hover:text-white/60 transition-colors font-light">{item.day}</span>
                                    <span className={`font-medium tracking-wide ${item.special ? 'text-amber-700 italic' : 'text-white/80'}`}>
                                        {item.time}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brand Quote */}
                    <div className="px-6 py-4 border-l border-white/10 italic">
                        <RiDoubleQuotesL className="text-white/10 mb-2" size={30} />
                        <p className="text-white/40 text-sm leading-relaxed font-light">
                            "Cooking is an art, but all art requires knowing something about the craft."
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: The Form */}
                <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-8"
                >
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        {/* Decorative glow inside form */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/[0.01] rounded-full blur-[80px] group-hover:bg-white/[0.03] transition-all duration-700" />
                        
                        <div className="mb-12 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-[1px] w-8 bg-white/20"></span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Secure Your Table</span>
                            </div>
                            <h2 className="text-3xl font-light text-white mb-4 italic font-serif">Book Your Experience</h2>
                            <p className="text-white/30 text-xs max-w-md leading-relaxed font-light uppercase tracking-widest">
                                Join us for an unforgettable evening. Please provide your details to complete the reservation.
                            </p>
                        </div>
                        
                        <div className="relative z-10">
                            <BookForm
                                Book={BookTable}
                                isLoading={isLoading}
                                isError={isError}
                            />
                        </div>

                        {/* Note at the bottom */}
                        <div className="mt-10 flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <RiInformationLine className="text-white/20 mt-0.5" size={16} />
                            <p className="text-[10px] text-white/30 leading-normal uppercase tracking-widest">
                                For parties larger than 8, please contact our concierge directly via phone for special arrangements.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}

export default BookPage;