import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Julian Marc",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      comment: "An absolute culinary sanctuary. The attention to detail in every dish and the moody atmosphere makes Soul Kitchen my favorite spot in the city."
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      comment: "The Digital Menu experience is seamless, and the flavors are even better. The Small Bites platter is a masterpiece of textures."
    }
  ];

  return (
    <section className="bg-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Static Content */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-sm tracking-[0.6em] uppercase text-yellow-600 font-bold">
              Guest Experiences
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif leading-tight">
              What Our <br /> Guests Say
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md italic">
              "We don't just serve food; we serve memories. Hear from those who have shared a table with us."
            </p>
            {/* Custom Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="prev-btn w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                ←
              </button>
              <button className="next-btn w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                →
              </button>
            </div>
          </div>

          {/* Right Side: Swiper */}
          <div className="lg:col-span-7 bg-[#050505] p-8 md:p-16 rounded-2xl border border-white/5 relative">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation]}
              effect="fade"
              speed={1000}
              autoplay={{ delay: 5000 }}
              navigation={{
                nextEl: '.next-btn',
                prevEl: '.prev-btn',
              }}
              loop={true}
              className="mySwiper"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="bg-[#050505]">
                  <div className="space-y-8">
                    {/* Big Quote Icon */}
                    <span className="text-6xl font-serif text-white/10 block leading-none">“</span>
                    
                    <p className="text-1xl md:text-2xl font-serif italic text-gray-200 leading-snug">
                      {review.comment}
                    </p>

                    <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-14 h-14 rounded-full object-cover grayscale"
                      />
                      <div>
                        <h4 className="text-sm tracking-[0.2em] uppercase font-bold text-white">
                          {review.name}
                        </h4>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-gray-600 mt-1">
                          Verified Guest
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;