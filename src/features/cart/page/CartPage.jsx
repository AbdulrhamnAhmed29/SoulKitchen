import React from 'react'
import { useCart } from '../hook/useCart'
import Cart from '../component/cart';
import Summary from '../component/Summary';

function CartPage() {
    const { query, removeMutation, updateMutation } = useCart();
    const cartItems = query.data || [];
    const totalCount = localStorage.getItem("totalCount");
    // total price 
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.product?.price || 0;

        const quantity = item.quantity || 0;
        return acc + (price * quantity);
    }, 0);
    const shipping = 50;
    const total = subtotal + shipping;



    return (
        <div className="min-h-screen lg:col-span-8 bg-[#050505] text-white font-sans selection:bg-white selection:text-black">

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


                    {/* ----------- summary component --------- */}
                    <div className='lg:col-span-4 rounded-2xl shadow-sm h-fit sticky top-10"'>
                        <Summary
                            page={"cart"}
                            total={total}
                            subtotal={subtotal}
                            shipping={""}

                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CartPage