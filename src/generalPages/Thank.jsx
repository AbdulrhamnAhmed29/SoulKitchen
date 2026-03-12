import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePrinter, HiOutlineShoppingBag } from "react-icons/hi2";
import { useMyorder } from '../features/userDashboard/userOrders/hook/useMyOrders';

function Thank() {
    const { ShowMyOrdersItems } = useMyorder();
    
    // my user 
    const orderState = ShowMyOrdersItems;
    const orders = orderState?.orders || [];
    const handlePrint = () => {
        window.print();
    };
    const [lastItem] = orders.slice(-1);
    ;
    

    return (
        <div className="min-h-screen bg-[#050505]  flex items-center justify-center p-4 sm:p-8 selection:bg-white/10">

            {/* الريسيت الورقي - Thermal Receipt */}
            <div id="receipt-content" className="w-full max-w-[380px] bg-white text-black mt-20 p-6 md:p-8 shadow-2xl font-mono relative print:m-0 print:w-full print:shadow-none">

                {/* Header Section */}
                <div className="text-center border-b-2 border-black pb-4 mb-4">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Soul Kitchen</h1>
                    <p className="text-[10px] leading-tight font-bold">
                        123 CULINARY AVE, CAIRO, EGYPT<br />
                        TEL: +201128787885<br />
                        ST# 58296 - REG# 001
                    </p>
                </div>

                {/* Customer & Order Info */}
                <div className="text-[11px] space-y-1 mb-4 border-b border-dashed border-black/30 pb-4">
                    <div className="flex justify-between font-bold">
                        <span>ORDER ID:</span>
                        <span>{lastItem?.id || '12644'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>DATE:</span>
                        <span>{new Date().toLocaleString()}</span>
                    </div>
                    <div className="mt-3 space-y-0.5 ">
                        <p className="font-black border-b border-black w-fit mb-1">CUSTOMER INFO:</p>
                        <p className="uppercase">  Name: {lastItem?.checkout?.userName || 'User Name'}</p>
                        <p>  Phone: {lastItem?.checkout?.phone || '+20 1012345678'}</p>
                        <p className="normal-case italic ">   Address: {lastItem?.checkout?.Address || 'Maadi, Cairo, Egypt'}</p>
                    </div>
                </div>

                {/* Items List */}
                <div className="text-[11px] mb-4">
                    {/* Header */}
                    <div className="flex justify-between font-black border-b-2 border-black mb-2 pb-1 uppercase tracking-tighter">
                        <span className="w-1/2 text-left">Products</span>
                        <span className="w-1/4 text-center">QTY</span>
                        <span className="w-1/4 text-right">PRICE</span>
                    </div>

                    {/* Body: Loop واحدة فقط */}
                    <div className="space-y-3">
                        {lastItem?.orderitems?.map((item, index) => (
                            <div key={index} className="flex justify-between items-start leading-tight">

                                {/* 1. Product Name: */}
                                <div className="w-1/2 pr-2">
                                    <span className="uppercase font-bold block break-words">
                                        {item.product?.title ||  'Signature Dish'}
                                    </span>
                                    <span className="text-[9px] opacity-60">
                                        Unit: EGP {item.product?.price}
                                    </span>
                                </div>

                                {/* 2. QUANTITY: في النص */}
                                <span className="w-1/4 text-center font-bold">
                                    x{item.quantity}
                                </span>

                                {/* 3. TOTAL PRICE: */}
                                <span className="w-1/4 text-right font-black">
                                    EGP {item.price || (item.quantity * item.product?.price)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Calculation */}
                <div className="border-t-2 border-black pt-3 space-y-1">
                    <div className="flex justify-between text-[11px]">
                        <span>SUBTOTAL:</span>
                        <span>EGP{lastItem?.totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                        <span>Shiping:</span>
                        <span>EGP 50</span>
                    </div>

                    <div className="flex justify-between font-black text-lg border-t border-dashed border-black mt-2 pt-2">
                        <span>TOTAL:</span>
                        <span>EGP {lastItem?.totalPrice || '350.00'}</span>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="text-center mt-8">
                    <p className="text-[10px] font-black uppercase mb-4 tracking-widest">*** THANK YOU ***</p>

                    {/* Barcode Section */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px,black_3px,black_4px,transparent_4px,transparent_5px)]"></div>
                        <span className="text-[8px] tracking-[0.6em] font-bold">SOUL-{lastItem?.id}-KITCHEN</span>
                    </div>
                    <p className="text-[8px] mt-4 opacity-50 uppercase">Please keep this receipt for your records</p>
                </div>

                {/* Floating Actions (Hidden on Print) */}
                <div className="absolute top-0 -right-16 flex flex-col gap-3 print:hidden animate-in fade-in slide-in-from-left-4 duration-700">
                    <button
                        onClick={handlePrint}
                        className="p-3 bg-white text-black rounded-full shadow-2xl hover:bg-gray-100 transition-all active:scale-90"
                        title="Print"
                    >
                        <HiOutlinePrinter size={22} />
                    </button>
                    <Link
                        to="/profile/orders"
                        className="p-3 bg-white text-black rounded-full shadow-2xl hover:bg-gray-100 transition-all active:scale-90"
                        title="Dashboard"
                    >
                        <HiOutlineShoppingBag size={22} />
                    </Link>
                </div>
            </div>

            {/* Print Logic Optimized */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body * { 
                        visibility: hidden; 
                    }
                    #receipt-content, #receipt-content * { 
                        visibility: visible; 
                        color: black !important;
                    }
                    #receipt-content { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 300px; 
                        margin: 0;
                        padding: 10px;
                        border: none;
                        box-shadow: none;
                    }
                    .print\\:hidden { 
                        display: none !important; 
                    }
                    @page {
                        margin: 0;
                        size: auto;
                    }
                }
            `}} />
        </div>
    );
}

export default Thank;