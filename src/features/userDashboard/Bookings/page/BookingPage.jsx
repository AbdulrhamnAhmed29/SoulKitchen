import React from 'react';
import { useBooking } from '../hook/useBooking';
import { RiCalendarEventLine, RiInformationLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import TableBooking from '../../component/TableBooking';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

function BookingPage() {
    const { isloading, bookingData, isDeleting, deleteBooking } = useBooking();
    const reservations = bookingData || [];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen p-4 md:p-0"
        >
            {/* 1. Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            className="p-2 bg-white/5 rounded-lg border border-white/10"
                        >
                            <RiCalendarEventLine className="text-white" size={24} />
                        </motion.div>
                        <h1 className="text-3xl font-serif italic text-white tracking-tight">
                            My Reservations
                        </h1>
                    </div>
                    <p className="text-white/40 text-sm font-light max-w-md">
                        Secure your table at Soul Kitchen and manage your upcoming dining experiences.
                    </p>
                </div>

                {/* Quick Stats Summary */}
                <div className="flex gap-8 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                    <div className="text-center">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">Total</span>
                        <motion.span
                            key={reservations.length}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-xl font-bold text-white inline-block"
                        >
                            {reservations.length}
                        </motion.span>
                    </div>
                    <div className="w-[1px] bg-white/5 h-10 my-auto"></div>
                    <div className="text-center">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">Pending</span>
                        <span className="text-xl font-bold text-amber-500">
                            {reservations.filter(r => r.statustable === 'Pending').length}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* 2. Info Alert */}
            <motion.div
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="mb-8 flex items-center gap-3 px-5 py-3 bg-amber-500/5 border border-amber-500/10 rounded-xl cursor-default"
            >
                <RiInformationLine className="text-amber-400" size={18} />
                <p className="text-[11px] text-amber-200/60 uppercase tracking-widest font-medium">
                    Please arrive 10 minutes before your reservation time to ensure your table is ready.
                </p>
            </motion.div>

            {/* 3. Table Container */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden w-full rounded-2xl border border-white/5 bg-[#0a0b1177] shadow-2xl"
            >
                <TableBooking
                    myBooking={reservations}
                    myBookingIsloading={isloading}
                    isDeleting={isDeleting}
                    deleteBooking={deleteBooking}
                />

                {reservations.length === 0 && !isloading && (
                    <div className="text-center py-20 bg-black/20">
                        <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-bold">
                            No Table Reservations Found
                        </p>
                    </div>
                )}
            </motion.div>

            {/* 4. Footer Placeholder */}
            <motion.div
                variants={itemVariants}
                className="mt-8 text-center"
            >
                <p className="text-[10px] text-white/10 uppercase tracking-[0.4em]">
                    Soul Kitchen • Gastronomy Experience
                </p>
            </motion.div>
        </motion.div>
    );
}

export default BookingPage;