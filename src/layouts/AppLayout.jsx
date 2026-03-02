// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ui/ScrollToTob';
import Navbar from './navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from './footer/footer';
import ScrollTop from '../ui/ScrollTop';

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <ScrollToTop />
      <ScrollTop />
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