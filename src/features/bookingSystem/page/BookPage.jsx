import React from 'react'
import BookForm from '../component/Book'
import {useCreateReservations} from "../hook/useBooking"

function BookPage() {
    const { isError, isLoading, BookTable } =useCreateReservations()

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 px-4 md:px-10 ">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-light tracking-widest uppercase mb-4">
                    Reserve A Table
                </h1>
                <div className="h-[1px] w-20 bg-gold-500 mx-auto bg-white"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/*(Info) */}
                <div className="lg:col-span-4 order-2 lg:order-1 space-y-12 sticky top-28">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm">
                        <h3 className="text-xl font-serif mb-6 text-white uppercase tracking-wider">Opening Hours</h3>
                        <ul className="space-y-4 text-sm font-light text-gray-400">
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Monday - Friday</span>
                                <span className="text-white">10:00 AM - 11:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Saturday</span>
                                <span className="text-white">12:00 PM - 12:00 AM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Sunday</span>
                                <span className="text-yellow-700 italic">Closed</span>
                            </li>
                        </ul>
                    </div>

                 
                </div>

                {/* (BookForm) */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-12 rounded-sm shadow-2xl">
                        <div className="mb-8">
                            <h2 className="text-2xl font-light mb-2">Book Your Experience</h2>
                            <p className="text-gray-500 text-sm">Please fill in the details below to secure your spot.</p>
                        </div>
                        
                        <BookForm
                            Book={BookTable}
                            isLoading={isLoading}
                            isError={isError}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookPage