// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ui/ScrollToTob';
import Navbar from './navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from './footer/footer';

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <ScrollToTop />
      <main>
        {/* Outlet */}
        <Outlet />
      </main>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Footer />
    </div>
  );
}

export default AppLayout;