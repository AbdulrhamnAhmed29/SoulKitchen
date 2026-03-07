import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getStrapiUser } from '../services/googleApi';

export const useGoogleLogic = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleAuth = async () => {
        try {
            const params = new URLSearchParams(location.search);
            const token = params.get('access_token');

            if (token) {
                const { jwt, user } = await getStrapiUser(token);

                Cookies.set('jwt', jwt, { expires: 7 });
                const finalName = user.username || user.name || 'User';
                localStorage.setItem('name', finalName);
                localStorage.setItem("userId", user.id);
                console.log(user);
                
                navigate('/', { replace: true });

                // window.location.reload(); 
            }
        } catch (error) {
            console.error("Auth Failed:", error);
            navigate('/signin');
        }
    };

    return { handleGoogleAuth };
};