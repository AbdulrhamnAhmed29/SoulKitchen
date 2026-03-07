import React from 'react'
import { Link } from 'react-router-dom'

function Summary({ subtotal }) {


    return (
        <div>
            <div className="lg:col-span-4">
                <div className="bg-[#0a0a0a] border  border-white/5 p-10">
                    <h3 className="text-sm tracking-[0.3em] uppercase mb-10 border-b border-white/10 pb-4">
                        Cart Total
                    </h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center group">
                            <span className="text-gray-500 group-hover:text-white transition-colors">Subtotal</span>
                            <span className="font-medium">${subtotal}</span>
                        </div>


                        <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] tracking-widest uppercase text-gray-500">Total Amount</p>
                                <p className="text-3xl font-bold mt-1">${subtotal}</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-12 group relative overflow-hidden border rounded-lg border-white bg-white text-black py-3 uppercase tracking-[0.3em] text-xs font-bold transition-all hover:bg-transparent hover:text-white">
                        <Link to={"/checkout"} className="relative z-10">Checkout Now</Link>
                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <button className="w-full mt-2 group relative rounded-lg overflow-hidden border border-white bg-white text-black py-3 uppercase tracking-[0.3em] text-xs font-bold transition-all hover:bg-transparent hover:text-white">
                        <Link to={"/shop"} className="relative z-10">Shoping</Link>
                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    <p className="mt-6 text-[9px] text-center text-gray-600 uppercase tracking-[0.2em]">
                        Secure encrypted checkout
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Summary
