import React from 'react'
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion' // أضفنا framer-motion

function Cart({ updateMutation, remove, cartItems }) {
    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";

    if (!cartItems || cartItems.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center border border-dashed border-white/10 rounded-2xl"
            >
                <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Your bag is currently empty</p>
            </motion.div>
        )
    }

    return (
        <div className="group/list space-y-8">
            <AnimatePresence mode="popLayout"> 
                {cartItems.map((item, index) => (
                    <motion.div
                        key={item.id} 
                        layout 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }} 
                        transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            ease: [0.43, 0.13, 0.23, 0.96] 
                        }}
                        className="card group relative flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-white/5 transition-all duration-500 
                                   group-has-[.card:hover]/list:not-hover:opacity-30 group-has-[.card:hover]/list:not-hover:scale-[0.98]"
                    >
                        {/* image product  */}
                        <div className="relative h-40 w-40 overflow-hidden bg-[#111] rounded-sm">
                            <img
                                src={`${imageUrl}${item?.product?.image?.url}`}
                                alt={item?.product?.title}
                                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                        </div>

                        {/* product data  */}
                        <div className="flex-1 flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-medium uppercase tracking-wider text-white">
                                        {item?.product?.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                                        {item?.product?.description || 'Signature Dish'}
                                    </p>
                                </div>
                                <p className="text-lg font-light tracking-tighter">${item?.product?.price}</p>
                            </div>

                            {/* delete and quantity  */}
                            <div className="flex items-center justify-between mt-auto pt-4">
                                <div className="flex items-center border border-white/10 px-2 py-1 gap-6">
                                    <button
                                        onClick={() => updateMutation({ id: item.documentId, quantity: item.quantity - 1 })} 
                                        className="hover:text-white text-gray-500 transition-colors p-1 disabled:opacity-20"
                                        disabled={item.quantity <= 1}
                                    >
                                        <HiOutlineMinus size={14} />
                                    </button>

                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>

                                    <button
                                        onClick={() => updateMutation({ id: item.documentId, quantity: item.quantity + 1 })}
                                        className="hover:text-white text-gray-500 transition-colors p-1"
                                    >
                                        <HiOutlinePlus size={14} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => remove.mutate(item.documentId)}
                                    disabled={remove.isPending} // في TanStack Query v5 نستخدم isPending
                                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-red-500 transition-all duration-300 group/del"
                                >
                                    <HiOutlineTrash size={16} className="group-hover/del:rotate-12 transition-transform" />
                                    <span>{remove.isPending ? 'Removing...' : 'Remove'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Cart