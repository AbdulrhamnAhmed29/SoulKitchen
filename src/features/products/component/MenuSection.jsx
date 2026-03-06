import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useProducts } from '../hook/useProducts';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from '../../cart/hook/useCart';

const MenuSection = () => {
    const { addMutation } = useCart()
    const navigate = useNavigate();
    const { data: productsData, isLoading } = useProducts();

    // variables 
    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";
    const products = productsData?.data || [];
    const isAuth = Cookies.get("jwt");

    // functions 
    const handleAddToCart = (productTitle, item) => {
        if (isAuth) {

            addMutation(item);
            toast.success(`${productTitle} added to your cart!`, {
                style: {
                    border: '1px solid #333',
                    padding: '16px',
                    color: '#fff',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '8px',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                },
                iconTheme: { primary: '#fff', secondary: '#000' },
                duration: 3000,
            });
        } else {
            Swal.fire({
                title: "AUTHENTICATION REQUIRED",
                text: "Please sign in to add items to your cart and enjoy the full experience.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#fff",
                cancelButtonColor: "#18181b",
                confirmButtonText: "SIGN IN NOW",
                cancelButtonText: "MAYBE LATER",
                background: "#09090b",
                color: "#fff",
                iconColor: "#fff",
                customClass: {
                    popup: 'border border-white/10 rounded-none',
                    confirmButton: 'rounded-none tracking-[0.2em] text-[10px] px-8 py-3 text-black font-bold',
                    cancelButton: 'rounded-none tracking-[0.2em] text-[10px] px-8 py-3 text-white'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin');
                }
            });
        }
    };

    return (
        <section className="bg-black py-20 px-6 lg:px-12">
            <div className="max-w-[1400px] mx-auto wrapper">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-16 gap-8">
                    <div className="flex flex-col items-center mb-4 text-center">
                        <h3 className="text-3xl tracking-[0.4em] font-bold uppercase mb-2 text-white">
                            Our Offerings
                        </h3>
                        <p className="text-gray-500 italic text-sm mb-6">Order for the table and spread the love.</p>
                        <div className="w-[2px] h-12 bg-white"></div>
                    </div>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center text-white tracking-[0.5em] animate-pulse uppercase text-xs">
                        Curating the finest...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {products.slice(0, 4).map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col h-full opacity-100 transition-all duration-700"
                            >
                                <div className='card flex flex-col h-full'>
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-5 border border-white/10 shadow-2xl">
                                        <img
                                            src={item?.image?.url ? `${imageUrl}${item.image.url}` : 'https/image'}
                                            alt={item?.title}
                                            className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-50" />

                                        {item?.price && (
                                            <div className="absolute bottom-4 right-4 backdrop-blur-md bg-white/5 px-3 py-1 rounded-full border border-white/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <span className="text-white text-[10px] font-light tracking-widest">${item.price}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Content */}
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase font-bold">
                                                    {item?.category?.name || "Signature"}
                                                </span>
                                                <h3 className="text-lg font-light tracking-wide text-white uppercase group-hover:text-gray-400 transition-colors duration-300">
                                                    {item?.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2 italic font-light">
                                            {item?.description}
                                        </p>

                                        <button
                                            onClick={() => handleAddToCart(item?.title, item)}
                                            className="w-full py-4 mt-auto flex items-center justify-center gap-3 text-white text-[10px] tracking-[0.3em] uppercase 
                                            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out border border-white/5 hover:bg-white hover:text-black"
                                        >
                                            <HiOutlineShoppingBag size={14} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && products.length === 0 && (
                    <div className="py-20 text-center text-gray-500 tracking-widest uppercase text-xs">
                        No dishes found matching your selection.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MenuSection;