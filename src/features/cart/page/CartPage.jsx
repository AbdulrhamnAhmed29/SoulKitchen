import React from 'react'
import { useCart } from '../hook/useCart'
import Cart from '../component/cart';

function CartPage() {
    const { query, removeMutation, updateMutation } = useCart();
    const cartItems = query.data || [];
    const totalCount = localStorage.getItem("totalCount")

    // total price 
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.product?.price || 0;

        const quantity = item.quantity || 0;
        return acc + (price * quantity);
    }, 0);


    const shipping = 50;
    const total = subtotal + shipping;



    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">

            <header className="pt-20 pb-10 text-center border-b border-white/5">
                <p className="text-[10px] tracking-[0.5em] uppercase text-gray-500 mb-4">Your Selection</p>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
                    Cart<span className="text-gray-600">.</span>
                </h1>
            </header>


            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* products */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                            <span className="text-xs tracking-widest uppercase opacity-50">Items ({totalCount || 0})</span>
                        </div>

                        <div className="luxury-cart-container">
                            <Cart
                                cartItems={cartItems}
                                remove={removeMutation}
                                updateMutation={updateMutation}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-[#0a0a0a] border border-white/5 p-10 sticky top-10">
                            <h3 className="text-sm tracking-[0.3em] uppercase mb-10 border-b border-white/10 pb-4">
                                Summary
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-500 group-hover:text-white transition-colors">Subtotal</span>
                                    <span className="font-medium">${subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-500 group-hover:text-white transition-colors">Shipping</span>
                                    <span className="text-[10px] tracking-widest uppercase text-white/40 font-light italic">${shipping}</span>
                                </div>

                                <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase text-gray-500">Total Amount</p>
                                        <p className="text-3xl font-bold mt-1">${total}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-12 group relative overflow-hidden border border-white bg-white text-black py-5 uppercase tracking-[0.3em] text-xs font-bold transition-all hover:bg-transparent hover:text-white">
                                <span className="relative z-10">Checkout Now</span>
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>

                            <p className="mt-6 text-[9px] text-center text-gray-600 uppercase tracking-[0.2em]">
                                Secure encrypted checkout
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default CartPage