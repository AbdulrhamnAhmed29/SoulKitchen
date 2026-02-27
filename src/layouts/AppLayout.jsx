// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../generalsComponents/navbar/Navbar';
import ScrollToTop from '../ui/ScrollToTob';

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <ScrollToTop />
      <main>
        {/* Outlet */}
        <Outlet />
      </main>

      {/* <footer>SoulKitchen Footer</footer> */}
    </div>
  );
}

export default AppLayout;