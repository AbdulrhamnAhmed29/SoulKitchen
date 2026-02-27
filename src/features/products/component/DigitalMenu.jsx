import React from 'react';
import { useProducts } from '../hook/useProducts';

function DigitalMenu() {
    const { data: products, isLoading } = useProducts();

    if (isLoading) return null; 
    return (
        <section className="bg-[#0a0b0a]  text-[#e5e5e5] py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header: Our Menu */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Our Menu</h2>
                    <p className="text-gray-400 italic text-lg max-w-lg mx-auto">
                        Picky eaters, adventurous eaters, whatever your taste, we have something for you.
                    </p>
                </div>

                {/* Sub-Header: Small Bites */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <h3 className="text-2xl tracking-[0.4em] font-bold uppercase mb-2 text-white">
                        SMALL BITES
                    </h3>
                    <p className="text-gray-500 italic text-sm mb-6">Order for the table and spread the love.</p>
                    <div className="w-[2px] h-12 bg-white"></div>
                </div>

                {/* The Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                    {products?.map((item) => (
                        <div key={item._id} className="group">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-lg font-medium text-white transition-colors duration-300">
                                    {item.title}
                                </h4>
                                <span className="text-gray-400 font-light text-base">{item.price}</span>
                            </div>
                            <p className="text-gray-500  w-64 text-sm leading-relaxed italic">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default DigitalMenu;