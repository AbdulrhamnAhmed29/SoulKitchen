import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// أيقونات تشبه جيت هاب ولكن بلمسة عصرية
import { VscHistory, VscBookmark } from "react-icons/vsc";
import { RiDashboardLine } from "react-icons/ri";

function DashboardHeader() {
    const links = [
        { link: "Overview", icon: <RiDashboardLine size={18} />, path: "/profile" },
        { link: "Orders", icon: <VscBookmark size={18} />, path: "/profile/orders" },
        { link: "Booking", icon: <VscHistory size={18} />, path: "/profile/booking" },
    ];

    return (
        <header className="bg-black border-b border-white/10 sticky top-0 z-40 w-full shadow-2xl">
            <div className="max-w-7xl mx-auto px-8">
                <div className='flex flex-row items-center justify-between'>
                    {/* الجزء العلوي (اختياري: لو عاوز تحط اسم الصفحة أو البريد) */}
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 font-light italic">Soul Kitchen</span>
                            <span className="text-white/20">/</span>
                            <span className="text-white font-bold tracking-tight">User Dashboard</span>
                        </div>
                    </div>
                    <div>
                        <button className='font-bold text-stone-700 hover:text-white'>
                          <Link to={"/home"}>Back</Link>
                        </button>
                    </div>
                </div>

                {/* نظام الـ Tabs بتاع جيت هاب */}
                <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {links.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === "/profile"} // لمنع الـ Active على كل المسارات الفرعية
                            className={({ isActive }) => `
                                flex items-center gap-2 px-4 py-3 text-sm transition-all duration-300 relative group
                                ${isActive
                                    ? "text-white font-semibold"
                                    : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                                }
                            `}
                        >
                            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                {item.icon}
                            </span>
                            <span className="tracking-wide">{item.link}</span>

                            {/* الخط السفلي (The Indicator) */}
                            {({ isActive }) => isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4e4a4a] " />
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default DashboardHeader;