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

                if (user.image) {
                    Cookies.set('userImage', user.image, { expires: 7 });
                    localStorage.setItem("name" , user.name)
                    
                }
                
                console.log(user.name);
                const finalName = user.username || user.name || 'User';
                localStorage.setItem('name', finalName);

                navigate('/', { replace: true });
                
                window.location.reload(); 
            }
        } catch (error) {
            console.error("Auth Failed:", error);
            navigate('/signin');
        }
    };

    return { handleGoogleAuth };
};