import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch,  HiOutlineShoppingBag } from 'react-icons/hi';
import { useProducts } from '../hook/useProducts';
import { useCategories } from '../hook/useCategory';

const MenuSection = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { data: categoriesData } = useCategories();
    const { data: productsData, isLoading } = useProducts({
        page,
        searchTerm: search,
        categoryName: selectedCategory
    });

    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";
    const categories = categoriesData || [];
    const products = productsData || [];

    const dynamicCategories = [
        "All",
        ...categories.map(cat => cat?.name).filter(Boolean)
    ];

    const handleAddToCart = (product) => {
        console.log("Added to cart:", product.name);
    };

    return (
        <section className="bg-black min-h-screen py-20 px-6 lg:px-12">
            <div className="max-w-[1400px] mx-auto">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                            Our Culinary <span className="font-sans not-italic font-black block md:inline">OFFERINGS</span>
                        </h2>
                    </div>

                    <div className="relative w-full md:w-[400px] group">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="Find your desire..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#111] border border-white/10 py-4 pl-12 pr-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all rounded-none"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center md:justify-center gap-4 mb-16 border-b border-white/5 pb-8">
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setPage(1); }}
                            className={`text-[10px] tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300 ${
                                selectedCategory === cat
                                ? "bg-white text-black font-bold"
                                : "text-gray-500 hover:text-white border border-white/5"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center text-white tracking-[0.5em] animate-pulse">
                        CURATING THE FINEST...
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        <AnimatePresence>
                            {products.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-5 border border-white/5">
                                        <img
                                            src={item?.image?.url ? `${imageUrl}${item.image.url}` : ''}
                                            alt={item?.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        />
                                        
                                        {/* Quick View Overlay (Optional) */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    {/* Info Content */}
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">
                                                    {item?.category?.name || "Signature"}
                                                </span>
                                                <h3 className="text-lg font-light tracking-wide text-white uppercase group-hover:text-gray-300 transition-colors">
                                                    {  item?.title}
                                                </h3>
                                            </div>
                                            <span className="font-serif italic text-lg text-white">${item?.price}</span>
                                        </div>

                                        {/* Description  */}
                                        <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2 italic font-light">
                                            {item?.deccription || "A masterfully crafted dish using only the freshest seasonal ingredients."}
                                        </p>

                                        {/* Add to Cart Button*/}
                                        <button 
                                            onClick={() => handleAddToCart(item)}
                                            className="mt-auto w-full border border-white/10 py-3 flex items-center justify-center gap-3 text-white text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
                                        >
                                            <HiOutlineShoppingBag size={14} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && products.length === 0 && (
                    <div className="py-20 text-center text-gray-500 tracking-widest uppercase">
                        No dishes found matching your selection.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuSection;