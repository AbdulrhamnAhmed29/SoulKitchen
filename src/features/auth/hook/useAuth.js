import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authServices';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    // 1. Mutation to login
    const loginMutation = useMutation({
        mutationFn: (loginData) => authService.login(loginData),
        onSuccess: (data) => {
            if (data?.jwt) {
                Cookies.set('jwt', data.jwt, { expires: 7 });
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/'); 
            }
        },
    });

    // 2. Mutation to register
    const registerMutation = useMutation({
        mutationFn: (registerData) => authService.register(registerData),
        onSuccess: (data) => {
            if (data?.jwt) {
                Cookies.set('jwt', data.jwt, { expires: 7 });
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            }
        },
    });

    // 3. log out
    const logout = () => {
        authService.logout();
    };

    //   object with data 
    return {
        //  Login
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,

        // Register
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        //    Logout 
        logout,
        isAuthenticated: authService.isAuthenticated(),
        user: JSON.parse(localStorage.getItem('user')) || null
    };
};