import React from 'react';
import { useForm } from 'react-hook-form';

function BookForm({ isLoading, Book }) {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            statustable: "Pending", 
            guests_count: 1,
            table_number: "1",
            slot_name: "Dinner"
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        
        let times = { start: "", end: "" };

        switch (data.slot_name) {
            case "Breakfast":
                times = { start: "10:00:00.000", end: "14:00:00.000" };
                break;
            case "Lunch":
                times = { start: "14:00:00.000", end: "18:00:00.000" };
                break;
            case "Dinner":
                times = { start: "18:00:00.000", end: "23:00:00.000" };
                break;
            default:
                times = { start: "18:00:00.000", end: "23:00:00.000" };
        }

        const payload = {
            ...data,
            guests_count: Number(data.guests_count),
            start_time: times.start,
            end_time: times.end
        };

        // إرسال الداتا للـ Hook اللي بيملا الـ 3 جداول
        Book(payload); 
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-black p-12 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-12">
                <h3 className="text-white text-[10px] tracking-[0.6em] uppercase opacity-40 mb-3">Soul Kitchen Reservation</h3>
                <div className="h-[1px] w-12 bg-white/20 mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                
                {/* Row 1: Phone & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Phone Number</label>
                        <input 
                            {...register("phone", { required: "Required" })}
                            type="text"
                            placeholder="+20 1XX XXX XXXX"
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-white transition-all outline-none"
                        />
                        {errors.phone && <span className="text-[8px] text-red-800 uppercase tracking-widest">{errors.phone.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Preferred Date</label>
                        <input 
                            {...register("reservation_date", { required: true })}
                            type="date"
                            className="bg-transparent border-b border-white/10 py-3 text-white text-[10px] focus:border-white transition-all outline-none uppercase invert-[0.8] opacity-60"
                        />
                    </div>
                </div>

                {/* Row 2: Guests & Table Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Number of Guests</label>
                        <input 
                            {...register("guests_count", { required: true, min: 1 })}
                            type="number"
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-white transition-all outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Table Assignment</label>
                        <select 
                            {...register("table_number")}
                            className="bg-transparent border-b border-white/10 py-3 text-white text-xs focus:border-white transition-all outline-none appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num} className="bg-zinc-950 text-white">TABLE 0{num}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 3: Slot Name (The Experience) */}
                <div className="flex flex-col gap-2">
                    <label className="text-white text-[9px] uppercase tracking-[0.3em] opacity-60">Select Experience</label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {["Breakfast", "Lunch", "Dinner"].map((type) => (
                            <label key={type} className="cursor-pointer group">
                                <input 
                                    {...register("slot_name")}
                                    type="radio" 
                                    value={type} 
                                    className="hidden peer" 
                                />
                                <div className="text-center py-3 border border-white/5 text-[9px] tracking-widest uppercase transition-all peer-checked:border-white peer-checked:bg-white peer-checked:text-black group-hover:border-white/30">
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
                        className="w-full relative py-5 border border-white/10 text-white text-[10px] tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all duration-1000 group disabled:opacity-20 overflow-hidden"
                    >
                        <span className="relative z-10">{isLoading ? "Crafting Reservation..." : "Confirm Booking"}</span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;