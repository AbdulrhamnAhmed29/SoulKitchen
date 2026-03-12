import React from 'react';
import {  RiDeleteBin7Line, RiTimeLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

function Table({ myOrders, myOrderIsloading, isError, deletOrder, isDeleting }) {

    const handleDelete = (orderId) => {
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
                deletOrder(orderId);
            }
        });
    };

    if (myOrderIsloading) {
        return <div className="p-20 text-center text-white/20 uppercase tracking-[0.3em] text-xs animate-pulse">Refining your history...</div>;
    }

    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="p-20 text-center border border-dashed border-white/5 m-4 rounded-xl">
                <p className="text-white/20 tracking-widest italic font-light">No culinary journeys found yet.</p>
            </div>
        );
    }

    if (isError) {
        return <div className="p-10 text-center text-red-400/60 font-light italic">Something went wrong...</div>;
    }

    return (
        <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5">
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Order ID</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Date</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium text-center">Status</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Total</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                    <AnimatePresence mode='popLayout'>
                        {myOrders.map((order) => (
                            <motion.tr
                                key={order.documentId || order.id}
                                layout // 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                                className="group hover:bg-white/[0.01] transition-colors"
                            >
                                {/* Order ID */}
                                <td className="px-8 py-6">
                                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors tracking-tight">
                                        #{order.id}
                                    </span>
                                </td>
                                <td className="px-8 py-6 min-w-[180px]"> {/* ضفنا min-w عشان نضمن مساحة كافية */}
                                    <div className="flex flex-col justify-center gap-1">
                                        <span className="text-sm text-white/80 font-medium tracking-tight">
                                            {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] flex items-center gap-1">
                                            <RiTimeLine size={12} className="text-white/10" /> {/* أيقونة بسيطة تدي شياكة */}
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-8 py-6 text-center">
                                    <span className={`px-3 py-1 rounded-full border text-[9px] uppercase tracking-widest transition-all
                                        ${order.statusOrder === "completed"
                                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                                            : "bg-white/5 border-white/10 text-white/40"}`}
                                    >
                                        {order.statusOrder}
                                    </span>
                                </td>

                                {/* Total Price */}
                                <td className="px-8 py-6">
                                    <span className="text-sm font-semibold text-white italic">
                                        EGP {order.totalPrice}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-3">
                                       
                                        <button
                                            onClick={() => handleDelete(order.documentId)}
                                            disabled={isDeleting}
                                            className={`p-2 transition-all rounded-lg 
        ${order.statusOrder === "pending" ? "inline-block" : "hidden"} 
        text-white/20 hover:text-red-400 hover:bg-red-400/5`}
                                        >
                                            <RiDeleteBin7Line size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
}

export default Table;