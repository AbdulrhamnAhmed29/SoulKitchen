import React from 'react'

function HeroSection() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">

            {/* 1. Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-110"
                style={{
                    backgroundImage: `url('/images/resturent.jpg')`, 
                }}
            >
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
            </div>

            {/* 2. Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">

                {/* Welcome Text */}
                <p className="text-white text-[10px] md:text-xs tracking-[0.8em] uppercase mb-6 opacity-80 font-light">
                    Enjoy an unforgettable experience
                </p>

                {/* Main Title */}
                <h1 className="text-6xl  font-black text-white tracking-[0.1em] leading-none uppercase mb-12">
                    Soul <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">Kitchen</span>
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                    <button className="group relative px-12 py-4 bg-transparent border border-white text-white text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                        See Menu
                    </button>

                    <button className="group relative px-12 py-4 bg-white text-black text-[10px] tracking-[0.4em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-500">
                        Book Your Table
                    </button>
                </div>
            </div>

            {/* 3. Side "Welcome" Vertical Text (The UX Touch) */}
            <div className="absolute left-8 top-60  hidden lg:block">
                <p className="text-white text-[12px] tracking-[1em] uppercase rotate-90 origin-left font-bold">
                    Welcome
                </p>
            </div>

            {/* 4. Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
            </div>

        </section>
    )
}

export default HeroSection
