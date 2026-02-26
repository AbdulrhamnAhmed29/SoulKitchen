import React from 'react'
import Form from '../component/Form'
import { useAuth } from '../hook/useAuth';

function Signin() {
    const { loginError, isLoggingIn, login } = useAuth();
    return (
        <div>
            <Form
                btn={"Sign In"}
                type={login}
                isloading={isLoggingIn}
                iserror={loginError}
                path={"/"}
            />
        </div>
    )
}

export default Signin
