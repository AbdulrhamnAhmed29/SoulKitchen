import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiDeleteBin7Line,  RiLoader4Line } from "react-icons/ri";

function Table({ isDeleting, myOrderIsloading, myOrders, deletOrder, isError }) {

    // 1. Skeleton Loader 
    if (myOrderIsloading) {
        return (
            <div className="w-full space-y-4 p-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 w-full bg-white/[0.03] animate-pulse rounded-xl border border-white/5" />
                ))}
            </div>
        );
    }

    // 2. Error State
    if (isError) {
        return (
            <div className="p-20 text-center text-red-400/60 font-light italic">
                Something went wrong while fetching your orders.
            </div>
        );
    }

    // 3. Empty State
    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="p-20 text-center text-white/20 font-light italic tracking-widest text-sm">
                NO ORDERS FOUND IN YOUR HISTORY
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/30">
                        <th className="px-8 py-5 font-medium">Order ID</th>
                        <th className="px-8 py-5 font-medium">Date</th>
                        <th className="px-8 py-5 font-medium">Status</th>
                        <th className="px-8 py-5 font-medium">Total</th>
                        <th className="px-8 py-5 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <AnimatePresence>
                        {myOrders.map((order, index) => (
                            <motion.tr
                                key={order.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
                            >
                                <td className="px-8 py-5 text-white font-medium">
                                    #{order.id}
                                </td>
                                <td className="px-8 py-5 text-white/80 font-medium">
                                    {new Date(order.createdAt).toLocaleString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    }).replace(',', ' at')}
                                </td>

                                <td className="px-8 py-5">
                                    <span className={` ${order.statusOrder === "deliverd" ? "bg-green-700" : "bg-white/5 border border-white/10"}  px-3 py-1 rounded-full text-[10px]  text-white/70  `}>
                                        {order.statusOrder || 'pending'}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-white  italic">
                                    ${order.totalPrice}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-3  group-hover:opacity-100 ">
                                       
                                        <button
                                            onClick={() => deletOrder(order.documentId)}
                                            disabled={isDeleting}
                                            className="p-2 text-white/40 hover:text-red-500  "
                                        >
                                            {isDeleting ? <RiLoader4Line className="animate-spin" size={18} /> : <RiDeleteBin7Line size={18} />}
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