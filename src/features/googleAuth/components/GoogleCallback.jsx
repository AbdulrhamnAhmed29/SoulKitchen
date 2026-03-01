import React, { useEffect } from 'react';
import { useGoogleLogic } from '../hooks/useGoogleLogic';

const GoogleCallback = () => {
    const { handleGoogleAuth } = useGoogleLogic();

    useEffect(() => {
        handleGoogleAuth();
    }, []);

    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-[9px] tracking-[0.3em] mt-4 uppercase opacity-40 font-light">
                Syncing Profile...
            </p>
        </div>
    );
};

export default GoogleCallback;