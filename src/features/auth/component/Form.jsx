import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'; 

const schema = yup.object().shape({
    username: yup.string().when('isSignUp', {
        is: true,
        then: (s) => s.required('Required').min(3),
    }),
    email: yup.string().email('Invalid email').required(),
    password: yup.string().min(6).required(),
});

function Form({ btn, type, isloading, iserror }) {
    const navigate = useNavigate();
    const isSignUp = btn === "Sign Up";
    const [showPassword, setShowPassword] = useState(false); 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        context: { isSignUp }
    });

    useEffect(() => {
        if (iserror) {
            Swal.fire({
                icon: 'error',
                title: 'SYSTEM ERROR',
                text: iserror?.response?.data?.error?.message || "Unauthorized access",
                background: '#000',
                color: '#fff',
                confirmButtonColor: '#444',
                customClass: { popup: 'border border-white/10 rounded-none' }
            });
        }
    }, [iserror]);

    const onSubmit = (data) => {
        const payload = isSignUp
            ? { username: data.username, email: data.email, password: data.password }
            : { identifier: data.email, password: data.password };

        type(payload, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#000',
                    color: '#fff',
                });
                setTimeout(() => navigate('/'), 1500);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000] p-4 pt-28 relative font-sans">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#0a0a0a_0%,_transparent_70%)]"></div>

            <div className="relative max-w-4xl w-full flex flex-col md:flex-row bg-black border border-white/[0.05] shadow-2xl overflow-hidden">
                
                {/* Left Side: Brand Story */}
                <div className="md:w-1/2 p-12 flex flex-col justify-between bg-gradient-to-b from-[#080808] to-black border-b md:border-b-0 md:border-r border-white/5">
                    <div>
                        <h1 className="text-xl font-black text-white tracking-[0.6em] uppercase border-l-4 border-white pl-4">
                            SOUL KITCHEN
                        </h1>
                        <div className="mt-20">
                            <h2 className="text-5xl font-extralight text-white tracking-tighter leading-[0.9] mb-4">
                                {isSignUp ? 'JOIN THE \nLEGACY.' : 'ACCESS \nRESERVE.'}
                            </h2>
                            <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase font-medium">
                                Secure Culinary Portal
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-gray-500 text-[10px] tracking-widest leading-loose uppercase italic opacity-40">
                            Verified Membership Only
                        </p>
                    </div>
                </div>

                {/* Right Side: Action Area */}
                <div className="md:w-1/2 p-12 bg-[#020202]">
                    <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-8">
                            {isSignUp && (
                                <div className="group relative">
                                    <input
                                        {...register("username")}
                                        className="peer w-full bg-transparent border-b border-white/10 py-3 text-xs text-white focus:outline-none focus:border-white transition-all tracking-[0.1em] placeholder-transparent"
                                        placeholder="NAME"
                                        id="username"
                                    />
                                    <label htmlFor="username" className="absolute left-0 top-3 text-[10px] text-gray-500 tracking-[0.2em] uppercase transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white">Full Name</label>
                                    {errors.username && <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase">{errors.username.message}</span>}
                                </div>
                            )}

                            <div className="group relative">
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-xs text-white focus:outline-none focus:border-white transition-all tracking-[0.1em] placeholder-transparent"
                                    placeholder="EMAIL"
                                    id="email"
                                />
                                <label htmlFor="email" className="absolute left-0 top-3 text-[10px] text-gray-500 tracking-[0.2em] uppercase transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white">Identity / Email</label>
                                {errors.email && <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase">{errors.email.message}</span>}
                            </div>

                            <div className="group relative">
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-xs text-white focus:outline-none focus:border-white transition-all tracking-[0.1em] placeholder-transparent pr-10"
                                    placeholder="PASSWORD"
                                    id="password"
                                />
                                <label htmlFor="password" className="absolute left-0 top-3 text-[10px] text-gray-500 tracking-[0.2em] uppercase transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white">Security Key</label>
                                
                                {/* Password Toggle Button */}
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-3 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                                </button>
                                
                                {errors.password && <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase">{errors.password.message}</span>}
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <button
                                type="submit"
                                disabled={isloading}
                                className="w-full py-5 bg-white text-black text-[10px] font-black tracking-[0.5em] uppercase hover:bg-[#ccc] transition-all duration-300 active:scale-[0.98] disabled:bg-gray-800 disabled:text-gray-600"
                            >
                                {isloading ? 'PROCESSING...' : btn}
                            </button>

                            {/* Navigation Links  */}
                            <div className="text-center">
                                <Link 
                                    to={isSignUp ? "/signin" : "/signup"} 
                                    className="text-[9px] text-gray-500 tracking-[0.3em] uppercase hover:text-white transition-colors duration-300 decoration-white/20 underline-offset-8 underline"
                                >
                                    {isSignUp ? "Already a Member? Sign In" : "New Resident? Register Here"}
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="absolute bottom-6 left-6 text-[8px] text-white/10 tracking-[1em] uppercase">
                Soul Kitchen System v.2
            </div>
        </div>
    );
}

export default Form;