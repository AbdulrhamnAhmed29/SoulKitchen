import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css"; // مهم جداً

function BookForm({ isLoading, Book }) {
    const {
        register,
        handleSubmit, 
        reset,
        control, // ضفنا دي هنا عشان الـ Controller يشتغل
        formState: { errors }
    } = useForm({
        defaultValues: {
            statustable: "Pending",
            guests_count: 1,
            table_number: "1",
            slot_name: "Dinner",
            reservation_date: new Date() 
        }
    });

    const onSubmit = async (data) => {

     const formattedDate = data.reservation_date.toLocaleDateString('en-CA');

        const payload = {
            ...data,
            reservation_date: formattedDate,
            guests_count: Number(data.guests_count),
           
        };

        try {
            await Book(payload);
            Swal.fire({
                title: 'RESERVATION SECURED',
                text: 'We are preparing your table at Soul Kitchen.',
                icon: 'success',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#fff',
                confirmButtonText: '<span style="color:black; font-weight:bold; letter-spacing:2px">EXCELLENT</span>',
                customClass: {
                    popup: 'border border-white/10 rounded-none',
                    title: 'font-serif italic tracking-widest'
                }
            });

            reset();
            window.location.href = "/home";
        } catch (error) {
            Swal.fire({
                title: 'ERROR',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <div className="w-full bg-transparent">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                {/* Row 1: Phone & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Phone Number</label>
                        <input
                            {...register("phone", { required: "Required" })}
                            type="text"
                            placeholder="+20 1XX XXX XXXX"
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-amber-500 transition-all outline-none placeholder:text-white/10"
                        />
                        {errors.phone && <span className="text-[8px] text-red-500 uppercase tracking-widest">{errors.phone.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Preferred Date</label>
                        <Controller
                            control={control}
                            name="reservation_date"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="SELECT DATE"
                                    // الـ className هنا متناسق مع باقي الفورم
                                    className="bg-transparent border-b border-white/10 py-3 text-white text-[10px] focus:border-amber-500 transition-all outline-none uppercase cursor-pointer w-full"
                                    calendarClassName="dark-calendar"
                                    popperPlacement="bottom-start"
                                />
                            )}
                        />
                        {errors.reservation_date && <span className="text-[8px] text-red-500 uppercase tracking-widest">Required</span>}
                    </div>
                </div>

                {/* Row 2: Guests & Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Number of Guests</label>
                        <input
                            {...register("guests_count", { required: true, min: 1 })}
                            type="number"
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-amber-500 transition-all outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Table Assignment</label>
                        <select
                            {...register("table_number")}
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-amber-500 transition-all outline-none appearance-none cursor-pointer"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num} className="bg-zinc-950 text-white">Table 0{num}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 3: Select Experience */}
                <div className="flex flex-col gap-4">
                    <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Select Experience</label>
                    <div className="grid grid-cols-3 gap-4">
                        {["Breakfast", "Lunch", "Dinner"].map((type) => (
                            <label key={type} className="cursor-pointer group">
                                <input
                                    {...register("slot_name")}
                                    type="radio"
                                    value={type}
                                    className="hidden peer"
                                />
                                <div className="text-center py-4 border border-white/5 text-[9px] tracking-widest uppercase transition-all duration-500 peer-checked:border-amber-500/50 peer-checked:bg-amber-500/10 peer-checked:text-amber-500 group-hover:border-white/20">
                                    {type}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full relative py-5 bg-white text-black text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-amber-500 hover:text-white transition-all duration-500 disabled:opacity-20 overflow-hidden group"
                    >
                        <span className="relative z-10">{isLoading ? "Processing..." : "Confirm Booking"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;