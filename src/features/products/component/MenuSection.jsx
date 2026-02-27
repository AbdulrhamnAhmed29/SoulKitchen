import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useProducts } from '../hook/useProducts';

const MenuSection = () => {


    const { data: productsData, isLoading } = useProducts();

    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";
    const products = productsData || [];



    const handleAddToCart = (product) => {
        console.log("Added to cart:", product);
    };

    return (
        <section className="bg-black  py-20 px-6 lg:px-12">
            <div className="max-w-[1400px] mx-auto">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl capitalize md:text-5xl font-serif mb-4 text-white">
                            Our  Offerings
                        </h2>
                    </div>


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
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#111] mb-5 border border-white/5">
                                        <img
                                            src={item?.image?.url ? `${imageUrl}${item.image.url}` : ''}
                                            alt={item?.title}
                                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
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
                                                    {item?.title}
                                                </h3>
                                            </div>
                                            <span className="font-serif italic text-lg text-white">${item?.price}</span>
                                        </div>

                                        {/* Description  */}
                                        <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2 italic font-light">
                                            {item?.description }
                                        </p>

                                        <button
                                            onClick={() => handleAddToCart(item?.title)}
                                            className="w-full py-3 flex items-center justify-center gap-3 text-white text-[10px] tracking-[0.2em] uppercase 
                        opacity-0 translate-y-10  group-hover:opacity-100 group-hover:translate-y-0  transition-all duration-500 ease-out   hover:text-yellow-200 "
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