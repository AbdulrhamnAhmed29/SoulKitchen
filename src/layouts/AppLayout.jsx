// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../generalsComponents/navbar/Navbar';

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar /> 
      
      <main>
        {/* Outlet */}
        <Outlet />
      </main>

      {/* <footer>SoulKitchen Footer</footer> */}
    </div>
  );
}

export default AppLayout;