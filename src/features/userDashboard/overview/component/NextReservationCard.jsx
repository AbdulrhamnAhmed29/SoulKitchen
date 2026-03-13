import React from 'react';
import { motion } from 'framer-motion';
import { RiTimeLine, RiRestaurantLine, RiMapPin2Line, RiArrowRightLine } from "react-icons/ri";
import { useBooking } from '../../Bookings/hook/useBooking';
import { Link } from 'react-router-dom';

function NextReservationCard() {
    const { bookingData, isLoading } = useBooking()
    if (isLoading) {
        return <div className="w-full h-48 bg-white/5 animate-pulse rounded-3xl border border-white/5" />;
    }
    const booking = bookingData;


    if (!booking) {
        return (
            <div className="w-full p-10 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4">
                <RiRestaurantLine size={32} className="text-white/10" />
                <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">No upcoming culinary journeys</p>
                <Link to={"/reservations"} className="text-[10px] text-amber-500 underline tracking-[0.2em] uppercase">Book a Table</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121318] to-[#0a0b11] p-8 md:p-10 shadow-2xl"
        >
            {/*Abstract Shapes) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -mr-20 -mt-20" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[9px] font-bold tracking-[0.2em] text-amber-500 uppercase">Next Reservation </span>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
                            {booking.reservation_date}
                        </h2>
                        <div className="flex flex-wrap gap-6 mt-4">
                            {/* الوقت - Level 3 Data */}
                            <div className="flex items-center gap-3">
                                <RiTimeLine className="text-amber-500" size={20} />
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30">Arrival Time</p>
                                    <p className="text-sm text-white/80 font-light">{booking.time_slot?.time || "TBD"}</p>
                                </div>
                            </div>

                            {/* - Level 3 Data */}
                            <div className="flex items-center gap-3">
                                <RiRestaurantLine className="text-amber-500" size={20} />
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30">Reserved Table</p>
                                    <p className="text-sm text-white/80 font-light italic">Table #{booking.table?.table_number || "Pending"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <RiMapPin2Line className="text-amber-500" size={20} />
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30">Location</p>
                                    <p className="text-sm text-white/80 font-light">Main Dining Hall</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group cursor-pointer"
                >
                    <Link to={"/profile/booking"}>
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] group-hover:text-white/40 transition-colors">View Details</p>
                        </div>
                        <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500 transition-all duration-500">
                            <RiArrowRightLine className="text-white group-hover:text-black transition-colors" size={24} />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default NextReservationCard;