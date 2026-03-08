import React, { useState } from 'react';
import { HiOutlineShoppingBag, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useProducts } from '../hook/useProducts';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from '../../cart/hook/useCart';
import SkeletonCard from '../../../ui/skeletonCard';

const MenuSection = ({ page }) => {
    const { addMutation } = useCart();
    const navigate = useNavigate();
    const isShopPage = page === "shop";

    // --- Server-side States ---
    const [currentPage, setCurrentPage] = useState(1);
    const [sortQuery, setSortQuery] = useState('createdAt:desc');
    const itemsPerPage = isShopPage ? 8 : 4;

    const { data: productsData, isLoading } = useProducts({
        page: currentPage,
        pageSize: itemsPerPage,
        sort: sortQuery
    });


    const products = productsData?.data || [];
    const meta = productsData?.meta?.pagination;
    const isAuth = Cookies.get("jwt");
    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === "low") setSortQuery('price:asc');
        else if (value === "high") setSortQuery('price:desc');
        else setSortQuery('createdAt:desc');
        setCurrentPage(1);
    };

    const handleAddToCart = (productTitle, item) => {
        if (isAuth) {
            addMutation(item);
            toast.success(`${productTitle} added to your cart!`, {
                style: {
                    border: '1px solid #333',
                    padding: '16px',
                    color: '#fff',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '0px',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                },
                iconTheme: { primary: '#fff', secondary: '#000' },

            });
        } else {
            Swal.fire({
                title: "AUTHENTICATION REQUIRED",
                text: "Please sign in to enjoy the full Soul Kitchen experience.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#fff",
                cancelButtonColor: "#18181b",
                confirmButtonText: "SIGN IN NOW",
                background: "#09090b",
                color: "#fff",
                customClass: {
                    popup: 'border border-white/10 rounded-none',
                    confirmButton: 'rounded-none tracking-[0.2em] text-[10px] px-8 py-3 text-black font-bold',
                    cancelButton: 'rounded-none tracking-[0.2em] text-[10px] px-8 py-3 text-white'
                }
            }).then((result) => {
                if (result.isConfirmed) navigate('/signin');
            });
        }
    };

    return (
        <section className={`bg-black px-6 lg:px-12 ${isShopPage ? "py-16  bg-gradient-to-t  from-black via-stone-950 to bottom to-stone-950  text-[#e5e5e5]" : ""}`}>
            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 mt-10 text-center">
                    <h3 className="text-3xl tracking-[0.4em] font-bold uppercase mb-4 text-white">
                        {isShopPage ? "The Shop" : "Signature Offerings"}
                    </h3>
                    <p className="text-gray-500 italic text-sm mb-8 font-light">
                        {isShopPage ? "Explore our complete culinary collection." : "A curated selection for your table."}
                    </p>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-20"></div>
                </div>
                {/* sorting  */}
                <div className='w-full flex flex-row justify-start'>
                    {isShopPage && (
                        <select
                            onChange={handleSortChange}
                            className="bg-transparent border border-white/10 text-[10px] tracking-[0.2em] text-white px-8 rounded py-3 outline-none focus:border-white/40 transition-all uppercase mb-8"
                        >
                            <option value="default" className="bg-black">Default Sorting</option>
                            <option value="low" className="bg-black">Price: Low to High</option>
                            <option value="high" className="bg-black">Price: High to Low</option>
                        </select>
                    )}
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <SkeletonCard />
                ) : (
                    <>
                        <div className="grid grid-cols-1 wrapper sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
                            {products.map((item) => {

                                return (
                                    <div key={item.id} className="group card relative flex flex-col h-full bg-transparent">

                                        {/* Image Container */}
                                        <div className={`relative aspect-[3/4] overflow-hidden mb-8 transition-all duration-700"
                                            }`}>
                                            <img
                                                src={item?.image?.url ? `${imageUrl}${item.image.url}` : ''}
                                                alt={item?.title}
                                                className="w-full h-full rounded object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.2s] ease-in-out group-hover:scale-105"
                                            />

                                            {/* Overlay Smooth Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Floating Price Tag - */}
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
                                                <span className="text-white text-[11px] font-medium tracking-[0.2em]">
                                                    ${item.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col items-start text-left px-1">
                                            {/* Title */}
                                            <h3 className="text-[13px] font-bold tracking-[0.25em] text-white uppercase mb-3 group-hover:text-zinc-400 transition-colors duration-300">
                                                {item?.title}
                                            </h3>

                                            {/* Description -*/}
                                            <p className="text-zinc-500 text-[10px] leading-relaxed mb-6 font-extralight tracking-wider line-clamp-2">
                                                {item?.description}
                                            </p>

                                            <button
                                                onClick={() => handleAddToCart(item?.title, item)}
                                                className=" relative w-full   py-4 transition-all duration-500 "
                                            >

                                                <div className="relative z-10 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white italic hover:text-orange-600 transition-colors duration-500 ">
                                                    <HiOutlineShoppingBag size={16} className="transition-transform duration-500 group-hover:-translate-y-1" />
                                                    <span>Add To Cart</span>
                                                </div>
                                            </button>
                                        </div>


                                    </div>
                                );
                            })}
                        </div>

                        {/* Server-side Pagination */}
                        {isShopPage && meta?.pageCount > 1 && (
                            <div className="flex justify-center  items-center gap-12 mt-24">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => {
                                        setCurrentPage(prev => prev - 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="text-white disabled:opacity-10 hover:scale-110 transition-transform p-2 border border-white/5"
                                >
                                    <HiChevronLeft size={20} />
                                </button>

                                <span className="text-[9px] tracking-[0.6em] text-white/40 uppercase font-bold">
                                    Page {meta?.page} of {meta?.pageCount}
                                </span>

                                <button
                                    disabled={currentPage === meta?.pageCount}
                                    onClick={() => {
                                        setCurrentPage(prev => prev + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="text-white disabled:opacity-10 hover:scale-110 transition-transform p-2 border border-white/5"
                                >
                                    <HiChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {!isShopPage && (
                            <div className="mt-16 flex justify-center">
                                <Link to="/shop" className="group relative px-10 py-4 overflow-hidden border border-white/10 rounded-lg transition-all duration-500">
                                    <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
                                    <span className="relative text-1xl rounded-lg font-semibold tracking-wide text-white group-hover:text-black transition-colors duration-1000">
                                        FULL MENU
                                    </span>
                                </Link>
                            </div>
                        )}
                    </>
                )}

                {!isLoading && products.length === 0 && (
                    <div className="py-20 text-center text-zinc-700 tracking-[0.5em] uppercase text-[10px]">
                        No items found in our vault.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuSection;