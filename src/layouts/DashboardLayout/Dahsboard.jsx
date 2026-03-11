import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarProfileSection from './Sidebar/Sidebar'
import DashboardHeader from './DashbordHeader'
// import Sidebar from './Sidebar'
// import DashboardHeader from './DashboardHeader'

function ProfileLayout() {
    return (
        <div className=" min-h-screen bg-[#050505] text-white">
            {/* 1. Sidebar*/}

            <div className="flex-1 flex flex-col">

                <DashboardHeader />

                <div className='flex flex-col md:flex-row'>
                    <div className='hidden md:block'>
                        <SidebarProfileSection />

                        {/* 3.content*/}
                    </div>
                    <main className="p-8 overflow-y-auto w-full">
                        <Outlet />
                        
                    </main>
                </div>
                <footer>

                </footer>
            </div>
        </div>
    )
}

export default ProfileLayout