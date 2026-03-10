import React from 'react';

function SidebarProfileSection() {
    return (
        <div className="flex flex-col p-5 h-full  ">
            <div className="relative group md:flex-col flex-row  items-center">
                <div className="relative ">
                    <img
                        src="/your-avatar.jpg" 
                        alt="Abdulrhman Ahmed"
                        className="w-20 md:w-full aspect-square rounded-full border border-white/10 object-cover"
                    />
                </div>

                <div className="">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Abdulrhman Ahmed
                    </h2>
                    <p className="text-white/40 font-light text-lg">AbdulrhmanAhmed29</p>
                </div>
            </div>


        </div>
    );
}

export default SidebarProfileSection;