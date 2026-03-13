import React from 'react';
import { motion } from 'framer-motion';

import { RiShoppingBag3Line, RiVipCrown2Line, RiHistoryLine, RiArrowRightUpLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import NextReservationCard from '../component/NextReservationCard';
import { useBooking } from '../../Bookings/hook/useBooking';
import { useMyorder } from '../../userOrders/hook/useMyOrders';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

function OverviewPage() {
    const { Booking, isLoading: bookingLoading } = useBooking();
    const { myOrder, isLoading: orderLoading } = useMyorder();

    // إحصائيات سريعة
    const stats = [
        {
            label: "Total Orders",
            value: myOrder?.length || 0,
            icon: <RiShoppingBag3Line size={20} />,
            color: "text-blue-400"
        },
        {
            label: "Soul Status",
            value: "Silver Member",
            icon: <RiVipCrown2Line size={20} />,
            color: "text-amber-500"
        }
    ];

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 pb-10"
        >
            
            {/* 1. Greeting Section */}
            <motion.section variants={itemVariants} className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif italic text-white tracking-tight">

                    </h1>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mt-3">
                        Experience the art of culinary excellence
                    </p>
                </div>
            </motion.section>

            {/* 2. Main Focus: Next Reservation */}
            <motion.section variants={itemVariants}>
                <NextReservationCard 
                    booking={Booking?.[0]} 
                    isLoading={bookingLoading} 
                />
            </motion.section>

            {/* 3. Stats & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Stats & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20">{stat.label}</p>
                                    <p className="text-xl font-light text-white">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    <motion.div variants={itemVariants}>
                        <Link 
                            to="/shop" 
                            className="group block p-6 rounded-3xl border border-amber-500/10 bg-amber-500/5 hover:bg-amber-500 transition-all duration-500"
                        >
                            <div className="flex justify-between items-center text-amber-500 group-hover:text-black">
                                <span className="text-xs font-bold uppercase tracking-widest">Explore Menu</span>
                                <RiArrowRightUpLine size={20} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side: Recent Orders Brief */}
                <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2 p-8 rounded-3xl border border-white/5 bg-[#0a0b1177] backdrop-blur-sm"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <RiHistoryLine className="text-white/20" />
                            <h3 className="text-sm font-medium text-white uppercase tracking-[0.2em]">Recent Orders</h3>
                        </div>
                        <Link to="/profile/orders" className="text-[9px] text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {orderLoading ? (
                             [1,2].map(i => <div key={i} className="h-12 bg-white/5 animate-pulse rounded-xl" />)
                        ) : myOrder?.length > 0 ? (
                            myOrder.slice(0, 3).map((order) => (
                                <div key={order.id} className="flex justify-between items-center p-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/80 font-light tracking-wide">Order #{order.id}</span>
                                        <span className="text-[10px] text-white/20">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-xs text-white/60 font-medium">${order.totalPrice}</span>
                                        <span className={`text-[9px] px-2 py-0.5 uppercase tracking-tighter border ${order.statusOrder === 'completed' ? 'border-green-500/20 text-green-500' : 'border-amber-500/20 text-amber-500'}`}>
                                            {order.statusOrder}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-10 text-white/10 text-[10px] uppercase tracking-widest">No recent culinary orders</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default OverviewPage;