import React from 'react'
import { useForm } from 'react-hook-form';

function CheckoutForm({ isCreating, createOrder }) {
    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = (data) => {        
        createOrder(data);
    };
    // Styles
    const inputStyle = "w-full bg-transparent border-b border-white/10 py-3 text-sm outline-none focus:border-white transition-colors duration-500 placeholder:text-zinc-700 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em]";
    const labelStyle = "block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2";
    const errorStyle = "text-[9px] text-red-500 tracking-widest uppercase mt-1 italic";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

            {/* Shipping Section */}
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="group">
                        <label className={labelStyle}>Full Name</label>
                        <input
                            {...register("userName", { required: "Name is required" })}
                            type="text"
                            placeholder="Enter your name"
                            className={`${inputStyle} ${errors.customerName ? 'border-red-900' : ''}`}
                        />
                        {errors.customerName && <p className={errorStyle}>{errors.customerName.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="group">
                        <label className={labelStyle}>Phone Number</label>
                        <input
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: { value: /^[0-9]+$/, message: "Invalid phone number" }
                            })}
                            type="tel"
                            placeholder="+20 --- --- ----"
                            className={`${inputStyle} ${errors.phoneNumber ? 'border-red-900' : ''}`}
                        />
                        {errors.phoneNumber && <p className={errorStyle}>{errors.phoneNumber.message}</p>}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="group">
                    <label className={labelStyle}>Shipping Address</label>
                    <input
                        {...register("Address", { required: "Address is required" })}
                        type="text"
                        placeholder="Area, Street, Building, Apartment"
                        className={`${inputStyle} ${errors.address ? 'border-red-900' : ''}`}
                    />
                    {errors.address && <p className={errorStyle}>{errors.address.message}</p>}
                </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6">
                <label className={labelStyle}>Payment Method</label>
                <div className="flex gap-4 mt-4">
                    <label className="flex-1 relative cursor-pointer group">
                        <input
                            {...register("payment")}
                            type="radio"
                            value="card"
                            defaultChecked
                            className="peer hidden"
                        />
                        <div className="border border-white/5 py-4 text-center text-[10px] tracking-widest uppercase transition-all duration-500 peer-checked:bg-white peer-checked:text-black group-hover:border-white/20">
                            Online Payment (visa)
                        </div>
                    </label>
                    <label className="flex-1 relative cursor-pointer group">
                        <input
                            {...register("payment")}
                            type="radio"
                            value="cash"
                            className="peer hidden"
                        />
                        <div className="border border-white/5 py-4 text-center text-[10px] tracking-widest uppercase transition-all duration-500 peer-checked:bg-white peer-checked:text-black group-hover:border-white/20">
                            Cash On Delivery
                        </div>
                    </label>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-10">
                <button
                    disabled={isCreating}
                    type="submit"
                    className="w-full group relative overflow-hidden  border border-white bg-white text-black py-5 uppercase tracking-[0.4em] text-[11px] font-black transition-all hover:bg-transparent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10">
                        {isCreating ? "Processing Request..." : "Place Order"}
                    </span>
                    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
            </div>
        </form>
    );
}

export default CheckoutForm;