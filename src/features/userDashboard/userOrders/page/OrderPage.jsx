import React from 'react'
import { useMyorder } from '../hook/useMyOrders'
import Table from '../../component/Table';
import { RiOrderPlayLine, RiInformationLine } from "react-icons/ri";
import { motion } from 'framer-motion';

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

function OrderPage() {
    const { isDeleting, deleteOrder, isError, isLoading, myOrder } = useMyorder();
    const orders = myOrder;
    console.log(orders);
    
    

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
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="p-2 bg-white/5 rounded-lg border border-white/10"
                        >
                            <RiOrderPlayLine className="text-white" size={24} />
                        </motion.div>
                        <h1 className="text-3xl font-serif italic text-white tracking-tight">
                            My Orders
                        </h1>
                    </div>
                    <p className="text-white/40 text-sm font-light max-w-md">
                        Review your past culinary journeys and track your current reservations.
                    </p>
                </div>

                {/* Quick Stats Summary */}
                <div className="flex gap-8 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                    <div className="text-center">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">Total</span>
                        <motion.span 
                            key={orders?.length} 
                            initial={{ scale: 1.5, color: "#fff" }}
                            animate={{ scale: 1, color: "#fff" }}
                            className="text-xl font-bold text-white inline-block"
                        >
                            {orders?.length || 0}
                        </motion.span>
                    </div>
                    <div className="w-[1px] bg-white/5 h-10 my-auto"></div>
                    <div className="text-center">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">Active</span>
                        <span className="text-xl font-bold text-green-500">
                            {orders?.filter(o => o.status === 'pending').length || 0}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* 2. Info Alert */}
            <motion.div 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="mb-8 flex items-center gap-3 px-5 py-3 bg-blue-500/5 border border-blue-500/10 rounded-xl cursor-default"
            >
                <RiInformationLine className="text-blue-400" size={18} />
                <p className="text-[11px] text-blue-200/60 uppercase tracking-widest font-medium">
                    Orders can be cancelled within 15 minutes of placement.
                </p>
            </motion.div>

            {/* 3. Table Container */}
            <motion.div 
                variants={itemVariants}
                className="relative overflow-hidden w-full rounded-2xl border border-white/5 bg-[#0a0b1177] shadow-2xl"
            >
                <Table
                    myOrders={orders}
                    myOrderIsloading={isLoading}
                    isError={isError}
                    deletOrder={deleteOrder}
                    isDeleting={isDeleting}
                />
            </motion.div>

            {/* 4. Footer Placeholder */}
            <motion.div 
                variants={itemVariants}
                className="mt-8 text-center"
            >
                <p className="text-[10px] text-white/10 uppercase tracking-[0.4em]">
                    Soul Kitchen • Crafted for the soul
                </p>
            </motion.div>
        </motion.div>
    )
}

export default OrderPage;