import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hook/useCart';

function Summary({ subtotal, page }) {
    const { query } = useCart();
    const cartItems = query?.data || [];
    const isCheckoutPage = page === "checkout";
    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";



    const totalAmount = subtotal;

    return (
        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit sticky top-10">
            <div className="bg-[#111111] border border-white/5 p-8 rounded-sm">
                {/* Your Order */}
                <h3 className="text-2xl font-semibold text-white mb-8 tracking-tight">
                    Your order
                </h3>

                <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10 text-sm font-medium text-white tracking-wider uppercase">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </div>

                    <div className="space-y-5 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.documentId || item.id} className="flex justify-between items-center text-sm gap-4"> {/* أضفت gap-4 هنا عشان السعر ميبقاش لازق */}
                                    <div className="flex gap-3 items-center flex-1 min-w-0"> {/* flex-1 و min-w-0 مهمين عشان النص الطويل ميضربش التصميم */}

                                        <div className="w-12 h-12 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden flex-shrink-0">
                
                                            <img
                                                src={`${imageUrl}${item.product?.image.url}`} 
                                                alt={item.product?.title || "Product image"}
                                                className="w-full h-full object-cover" 
                                                loading="lazy" 
                                            />
                                        </div>

                                        <div className="flex flex-col gap-0.5 min-w-0"> 
                                            <span className="text-gray-300 font-medium truncate"> 
                                                {item.product?.title}
                                            </span>
                                            <span className="text-gray-500 font-mono text-xs tabular-nums"> 
                                                QTY: {item.quantity} 
                                            </span>
                                        </div>
                                    </div>

                                    <span className="text-gray-300 font-light tabular-nums flex-shrink-0"> {/* flex-shrink-0 مهم عشان السعر ميبقاش ضيق */}
                                            EGP {(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600 py-4 text-xs uppercase tracking-widest">
                                Cart is empty
                            </div>
                        )}
                    </div>
                    <div className="border-b border-white/10 pt-2"></div>

                    {/* - Subtotal */}
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="text-gray-400 font-light">Subtotal</span>
                        <span className="text-white font-medium tabular-nums">
                            EGP{parseFloat(subtotal).toFixed(2)}
                        </span>
                     
                    </div>

{/* total  */}
                    <div className="flex justify-between items-center pt-5 border-t border-white/10 mt-6">
                        <span className="text-gray-400 font-light text-sm">Total</span>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-white tabular-nums">
                                EGP {parseFloat(totalAmount).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {!isCheckoutPage ? (
                    <button className="w-full mt-10 group relative overflow-hidden rounded-sm bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-all hover:bg-gray-200">
                        <Link to={"/checkout"} className="relative z-10 block w-full">
                            Proceed to Checkout
                        </Link>
                    </button>
                ) : (
                    <div className="mt-10 p-4 bg-[#1a1a1a] border border-white/5 rounded-sm">
                        <p className="text-[12px] text-gray-400 font-light leading-relaxed">
                            Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.
                        </p>
                    </div>
                )}

                {/*continue shipping button -  */}
                {!isCheckoutPage && (
                    <button className="w-full mt-3 group relative rounded-sm overflow-hidden border border-white/20 bg-transparent text-white/70 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-all hover:border-white hover:text-white">
                        <Link to={"/shop"} className="relative z-10 block w-full">
                            Continue Shopping
                        </Link>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Summary