import React from 'react';

const VisitUs = () => {
    // 1. Logic: بيانات الأماكن (Data Array)
    const locations = [
        {
            id: 1,
            title: "Exterior of Soul Kitchen",
            image: "/images/soulkitchen-88.jpg",
            url: "https://www.google.com/maps/search/Soul+Kitchen+Cairo"
        },
        {
            id: 2,
            title: "Interior of Soul Kitchen",
            image: "/images/img.png",
            url: "https://www.google.com/maps/search/Soul+Kitchen+Cairo"
        }
    ];

    return (
        <section className="bg-gradient-to-b from-stone-900 via-stone-950  to-black text-white py-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <h2 className="text-5xl md:text-6xl font-serif mb-8 tracking-tight uppercase">
                    Visit Us
                </h2>
                <p className="text-gray-400 italic text-lg max-w-lg mx-auto mb-6">
                    Beyond the flavors, an atmosphere crafted for the soul.
                </p>
                {/* Vertical Divider */}
                <div className="flex justify-center mb-16">
                    <div className="w-[2px] h-12 bg-white"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {locations.map((loc) => (
                        <div key={loc.id} className="overflow-hidden group relative cursor-pointer">
                            {/* Image */}
                            <img
                                src={loc.image}
                                alt={loc.title}
                                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Black Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

                            {/* View Location Button */}
                            <a
                                href={loc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 border border-white text-white font-bold tracking-[0.2em] uppercase transition-all duration-500 opacity-0 group-hover:opacity-100 bg-black/40 hover:bg-white hover:text-black z-10"
                            >
                                View Location
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisitUs;