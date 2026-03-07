import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// Layouts
import AppLayout from '../layouts/AppLayout';

// Pages
import Signin from '../features/auth/pages/Signin';
import Signup from '../features/auth/pages/Signup';
import Home from '../generalPages/Home';
import GoogleCallback from '../features/googleAuth/components/GoogleCallback';
import CartPage from '../features/cart/page/CartPage';
import Shop from '../generalPages/Shop';
import CheckoutPage from '../features/checkout/page/CheckoutPage';

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
            { path: '/cart', element: <CartPage /> },
            { path: '/shop', element: <Shop /> },
            { path: '/checkout', element: <CheckoutPage /> },



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