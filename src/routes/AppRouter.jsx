import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import AppLayout from '../layouts/AppLayout';

// Pages
import Signin from '../features/auth/pages/Signin';
import Signup from '../features/auth/pages/Signup';
import Home from '../generalPges/Home';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            // 1. (Public Routes)
            //   -----------General pages------------- 
            { path: '/', element: <Home /> },
            { path: '/signin', element: <Signin /> },
            { path: '/signup', element: <Signup /> },
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