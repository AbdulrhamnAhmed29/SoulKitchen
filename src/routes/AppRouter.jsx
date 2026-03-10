import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// Layouts
import AppLayout from '../layouts/AppLayout/AppLayout';

// Pages
import Signin from '../features/auth/pages/Signin';
import Signup from '../features/auth/pages/Signup';
import Home from '../generalPages/Home';
import GoogleCallback from '../features/googleAuth/components/GoogleCallback';
import CartPage from '../features/cart/page/CartPage';
import Shop from '../generalPages/Shop';
import CheckoutPage from '../features/checkout/page/CheckoutPage';
import AboutPage from '../generalPages/About';
import BookPage from '../features/bookingSystem/page/BookPage';
import ProfileLayout from '../layouts/DashboardLayout/Dahsboard';
import OverviewPage from '../features/userDashboard/overview/page/OverviewPage';
import OrderPage from '../features/userDashboard/userOrders/page/OrderPage';
import BookingPage from '../features/userDashboard/userBookings/page/BookingPage';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            // 1. (Public Routes)
            //   -----------General pages------------- 
            { path: '/', element: <Navigate to="/home" replace /> },
            { path: '/home', element: <Home /> },
            { path: '/signin', element: <Signin /> },
            { path: '/signup', element: <Signup /> },
            { path: '/auth/google/callback', element: <GoogleCallback /> },

            // Authenticated route 

            // ----------- Website Pages -----------
            { path: '/cart', element: <CartPage /> },
            { path: '/shop', element: <Shop /> },
            { path: '/checkout', element: <CheckoutPage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/reservations', element: <BookPage /> },


            // ----------- Dashboard Pages (Nested Route) -----------
            {
                path: '/profile',
                element: <ProfileLayout />,
                children: [
                    { index: true, element: <OverviewPage /> }, 
                    { path: 'orders', element: <OrderPage /> }, 
                    { path: 'booking', element: <BookingPage /> }, 
                    { path: 'edit', element: <div>My Comments Page</div> }, 
                ]
            },






            //   -----------authenticated-pages------------- 

            // 2. (Protected Routes)
            // {
            //     element: <ProtectedRoute />,
            //     children: [
            //         //    Login
            //         { path: '/profile', element: <div>Profile Page</div> },
            //         { path: '/checkout', element: <div>Checkout Page</div> },
            //     ],
            // },

            // 404 Page
            { path: '*', element: <div>404 Not Found</div> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}