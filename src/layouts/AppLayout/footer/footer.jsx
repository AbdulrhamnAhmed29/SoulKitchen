import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* العمود الأول: الهوية واللوجو */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-serif tracking-[0.2em] uppercase leading-tight">
                Soul <br />
                <span className="text-gray-500 group-hover:text-white transition-colors duration-500">Kitchen</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs italic">
              "A culinary sanctuary where every flavor tells a story and every moment is crafted for the soul."
            </p>
            {/* روابط التواصل الاجتماعي - روابط خارجية استخدمنا <a> */}
            <div className="flex gap-6 text-gray-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <FaTripadvisor size={22} />
              </a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة داخلية - استخدمنا <Link> */}
          <div className="space-y-8">
            <h4 className="text-xs tracking-[0.4em] uppercase font-bold text-gray-300">Experience</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link to="/shop" className="hover:text-white hover:pl-2 transition-all duration-300 block">
                  The Menu
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-white hover:pl-2 transition-all duration-300 block">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:pl-2 transition-all duration-300 block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white hover:pl-2 transition-all duration-300 block">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: معلومات التواصل */}
          <div className="space-y-8">
            <h4 className="text-xs tracking-[0.4em] uppercase font-bold text-gray-300">Location</h4>
            <div className="text-sm text-gray-500 space-y-4">
              <p className="leading-relaxed">
                124 Soul Avenue, <br />
                Maadi, Cairo, Egypt
              </p>
              <p className="text-white font-medium">+20 123 456 7890</p>
              <p className="hover:text-white transition-colors cursor-pointer">concierge@soulkitchen.com</p>
            </div>
          </div>

          {/* العمود الرابع: مواعيد العمل */}
          <div className="space-y-8">
            <h4 className="text-xs tracking-[0.4em] uppercase font-bold text-gray-300">Hours</h4>
            <div className="text-sm text-gray-500 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon - Thu</span>
                <span className="text-white font-light">12:00 - 23:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Fri - Sat</span>
                <span className="text-white font-light">13:00 - 01:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Sunday</span>
                <span className="text-white font-light">Closed</span>
              </div>
            </div>
          </div>

        </div>

        {/* (Copyright) */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
            © {currentYear} Soul Kitchen. Crafted with passion by Abdulrahman
          </div>

          <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase text-gray-600">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          {/* زر الرجوع للأعلى */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] tracking-[0.3em] uppercase text-white border-b border-white/20 pb-1 hover:border-white transition-all duration-300"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;