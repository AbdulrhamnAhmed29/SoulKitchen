import React from 'react';
import { motion } from 'framer-motion';
import {
    RiDeleteBinLine
} from "react-icons/ri";
import Swal from 'sweetalert2';

function TableBooking({ myBooking, myBookingIsloading, deleteBooking, isDeleting }) {

    console.log(myBooking);
    

    const handleDelete = (BookingId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This journey cannot be recovered!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Red-500
            cancelButtonColor: 'transparent',
            confirmButtonText: 'Yes, delete it!',
            background: '#0a0b11',
            color: '#fff',
            customClass: {
                popup: 'border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl',
                confirmButton: 'rounded-full px-6 py-2 font-medium',
                cancelButton: 'text-white/40 hover:text-white transition-colors'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBooking(BookingId);
            }
        });
    };
    if (myBookingIsloading) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-black/20 animate-pulse">
                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Refining your reservations...</span>
            </div>
        );
    }

    if (!myBooking || myBooking.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-black/20">
                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">No reservations found</span>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Date</th>
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Time Slot</th>
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Table</th>
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase text-center">Guests</th>
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase text-center">Status</th>
                        <th className="px-6 py-5 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                    {myBooking?.map((booking, index) => (
                        <motion.tr
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={booking.id}
                            className="group hover:bg-white/[0.02] transition-colors duration-300"
                        >
                            {/* Date */}
                            <td className="px-6 py-6 font-light text-sm text-white/80">
                                {booking.reservation_date}
                            </td>

                            {/* Time Slot */}
                            <td className="px-6 py-6 font-light text-sm text-white/80">
                                {booking.time_slot?.time || "N/A"}
                            </td>


                            {/* Guests */}
                            <td className="px-6 py-6 text-center text-sm text-white/80">
                                {booking.table?.table_number || "TBD"}
                            </td>

                            <td className="px-6 py-6 text-center text-sm text-white/80">
                                {booking.guests_count}
                            </td>
                            {/* Status */}
                            <td className="px-6 py-6 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold tracking-[0.1em] uppercase 
                                    ${booking.statustable === 'Confirmed'
                                        ? 'text-green-500 bg-green-500/5'
                                        : 'text-amber-500 bg-amber-500/5'}`}
                                >
                                    {booking.statustable}
                                </span>
                            </td>

                            {/* Delete Action */}
                            <td className="px-6 py-6 text-right">
                                <motion.button
                                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(booking.documentId)}
                                    disabled={isDeleting}
                                    className="p-2 text-white/20 hover:bg-red-500/10 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Cancel Reservation"
                                >
                                    <RiDeleteBinLine size={18} />
                                </motion.button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableBooking;