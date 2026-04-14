import React from 'react';
import { useProfile } from '../../../features/userDashboard/profile/hook/useProfile';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

function SidebarProfileSection() {
    const userImage = Cookies.get('userImage');
    const userName = localStorage.getItem('name') || 'Guest';
    const { userData } = useProfile();
    const imageUrl = process.env.REACT_APP_URL || "http://localhost:1337";
    const image = userData?.image?.url;

    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=000&color=fff&bold=true`;

    const finalProfileImage = (userImage && userImage !== 'null' && userImage !== 'undefined')
        ? userImage
        : avatarFallback;

    return (
        <div className="flex flex-col p-5 h-full space-y-6">
            <div className="relative group flex flex-col items-center md:items-start">
                <div className="relative mb-4">
                    <img
                        src={image ? `${imageUrl}${image}` : finalProfileImage}
                        alt="profile"
                        className="w-20 md:w-full aspect-square rounded-full border border-white/10 object-cover shadow-xl"
                    />
                </div>

                <div className="text-center md:text-left space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight leading-tight capitalize">
                        {userData?.username
                            ? userData.username.replace(/[^a-zA-Z\s]/g, '') // بيمسح الأرقام والرموز وبيسيب الحروف والمسافات بس
                            : "Abdulrhman Ahmed"}
                    </h2>
                    <p className="text-white/40 font-light text-lg tracking-wide capitalize">
                        you are premium member
                    </p>
                </div>
            </div>

            <div className="space-y-3 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="truncate">{userData?.email || "email@example.com"}</span>
                </div>

                {/* Edit Profile button */}
                <Link to="/home" >
                    <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-2 rounded-lg transition-all active:scale-95 group">
                        <HiHome className="text-white/60 group-hover:text-white" size={16} />
                       Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SidebarProfileSection;