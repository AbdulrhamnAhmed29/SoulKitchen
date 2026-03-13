import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMyorder } from '../hook/useMyOrders';
import { motion } from 'framer-motion';
import { RiArrowLeftLine, RiTimeLine, RiHashtag, RiUserSharedLine, RiMapPin2Line, RiPhoneLine, RiMoneyDollarCircleLine } from "react-icons/ri";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { staggerChildren: 0.1, duration: 0.5 } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

function DetailOrder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { ShowOrderById: order, isLoadingDetail } = useMyorder(id);

    const orderData = order?.data || order; 
    const checkout = orderData?.checkout; // بيانات الـ Checkout

    if (isLoadingDetail) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-white/20 tracking-[.5em] uppercase text-xs">Tracing Your Order...</div>
        </div>
    );

    return (
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="max-w-5xl mx-auto p-6 md:py-12"
        >
            {/* 1. Header & Back Button */}
            <div className="flex items-center justify-between mb-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                >
                    <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">Back to My Orders</span>
                </button>
                <div className="text-right">
                    <span className={`px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border 
                        ${orderData?.statusOrder === 'completed' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-white/10 text-white/40 bg-white/5'}`}>
                        {orderData?.statusOrder || 'Processing'}
                    </span>
                </div>
            </div>

            {/* 2. Main Order Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                
                {/* Order Summary & Precise Time */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <RiHashtag className="text-white/20 mb-3" size={20} />
                            <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Order Reference</p>
                            <p className="text-white font-medium text-lg">#{orderData?.id || id}</p>
                        </div>
                        
                        <div className="h-full w-[1px] bg-white/5 hidden md:block"></div>

                        <div>
                            <RiTimeLine className="text-white/20 mb-3" size={20} />
                            <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Precise Timestamp</p>
                            <p className="text-white font-medium">
                                {new Date(orderData?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                <span className="text-white/40 mx-2">|</span>
                                <span className="text-green-400 italic">
                                    {new Date(orderData?.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Menu Items List */}
                    <div className="bg-[#0a0b1177] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md">
                        <div className="px-8 py-5 border-b border-white/5 bg-white/[0.01]">
                            <h2 className="text-xs uppercase tracking-[.3em] text-white/40">Menu Selection</h2>
                        </div>
                        <div className="divide-y divide-white/[0.03]">
                            {orderData?.orderItems?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-6 hover:bg-white/[0.01] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                                            <img 
                                                src={item?.product?.image?.url || 'https://via.placeholder.com/150'} 
                                                className="w-full h-full object-cover" 
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-sm font-medium">{item?.product?.name}</h3>
                                            <p className="text-white/20 text-[10px] uppercase tracking-wider">Qty: {item?.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-white font-medium italic font-serif">EGP {item?.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 3. Customer & Delivery Details (Sidebar) */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl"></div>
                        
                        <h2 className="text-xs uppercase tracking-[.3em] text-white/40 mb-8 flex items-center gap-2">
                            <RiUserSharedLine /> Customer Details
                        </h2>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 text-white/20"><RiUserSharedLine size={18}/></div>
                                <div>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-white text-sm font-light">{checkout?.fullName || "Guest Account"}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 text-white/20"><RiMapPin2Line size={18}/></div>
                                <div>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Shipping Address</p>
                                    <p className="text-white text-sm font-light leading-relaxed">
                                        {checkout?.address}, {checkout?.city}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 text-white/20"><RiPhoneLine size={18}/></div>
                                <div>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Contact Phone</p>
                                    <p className="text-white text-sm font-light tracking-widest">{checkout?.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/5">
                            <div className="flex justify-between items-end">
                                <div>
                                    <RiMoneyDollarCircleLine className="text-white/20 mb-2" size={20} />
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest">Total Investment</p>
                                </div>
                                <p className="text-2xl font-bold text-white italic font-serif">EGP {orderData?.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 border border-dashed border-white/5 rounded-[2rem] text-center">
                        <p className="text-[9px] uppercase tracking-[0.5em] text-white/10 italic">
                            Crafted for the soul by Soul Kitchen
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default DetailOrder;