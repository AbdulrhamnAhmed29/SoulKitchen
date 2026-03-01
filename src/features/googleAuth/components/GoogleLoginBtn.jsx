import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GoogleLoginBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // التحقق مما إذا كان هناك خطأ عائد من جوجل أو استرابي في الـ URL
        const params = new URLSearchParams(location.search);
        const error = params.get('error');
        const errorMsg = params.get('message'); // استرابي بيبعت المسج هنا أحياناً

        if (error || errorMsg) {
            Swal.fire({
                title: 'AUTHENTICATION ERROR',
                text: errorMsg === "Email is already taken." 
                      ? "This email is already registered. Please login with your password."
                      : "We couldn't connect to your Google account.",
                icon: 'error',
                background: '#000', 
                color: '#fff',
                confirmButtonColor: '#ea580c',
                confirmButtonText: 'TRY AGAIN',
                customClass: {
                    popup: 'border border-white/10 rounded-none', 
                    title: 'tracking-[0.2em] text-sm font-light',
                    htmlContainer: 'text-[10px] tracking-widest opacity-70 uppercase',
                    confirmButton: 'rounded-none text-[10px] tracking-[0.2em] px-10'
                }
            });
            
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleLogin = () => {
        window.location.href = "http://localhost:1337/api/connect/google";
    };

    return (
        <button
            onClick={handleLogin}
            className="group relative flex w-full items-center justify-center gap-3 border border-white/10 bg-black px-6 py-3.5 transition-all duration-500 hover:border-white/40 hover:bg-[#0a0a0a]"
        >
            <div className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:bg-orange-500/5 group-hover:opacity-100" />

            <div className="relative z-10 flex items-center justify-center rounded-full p-1.5 shadow-sm transition-transform duration-500 group-hover:scale-110">
               <FcGoogle size={18} />
            </div>

            <span className="relative z-10 text-[11px] font-light tracking-[0.3em] text-white/80 uppercase transition-colors duration-500 group-hover:text-white">
                Continue with Google
            </span>

            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent transition-all duration-700 group-hover:w-full" />
        </button>
    );
};

export default GoogleLoginBtn;