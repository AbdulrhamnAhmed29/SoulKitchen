import React from 'react'
import CheckoutForm from '../component/CheckoutForm'
import { useCheckout } from '../hook/useCheckout'
import Summary from "../../cart/component/Summary"
import { useCart } from '../../cart/hook/useCart';

function CheckoutPage() {
    const { isCreating, createOrder } = useCheckout();
    const { query } = useCart();
    const cartItems = query.data || [];

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 0;
        return acc + (price * quantity);
    }, 0);

    const shipping = 50;
    const total = subtotal + shipping;
    localStorage.setItem("productPrice", total);


    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
            {/* Header الفخامة */}
            <header className="pt-24 pb-12 text-center border-b border-white/5">
                <p className="text-[10px] tracking-[0.6em] uppercase text-gray-500 mb-4 animate-pulse">Secure Checkout</p>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    Finalize Order<span className="text-gray-600">.</span>
                </h1>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <div className="relative p-1 border-t border-l border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                            <div className="bg-[#080808] p-8 md:p-12">
                                <h2 className="text-xs tracking-[0.4em] uppercase mb-12 flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-white"></span>
                                    Checkout & Form
                                </h2>
                                <CheckoutForm
                                    createOrder={createOrder}
                                    isCreating={isCreating}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2 sticky top-28">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                            <div className="relative">
                                <Summary
                                    page={"checkout"}
                                    total={total}
                                    subtotal={subtotal}
                                    shipping={shipping}
                                />


                            </div>
                        </div>
                    </div>

                </div>
            </main>


        </div>
    )
}

export default CheckoutPage