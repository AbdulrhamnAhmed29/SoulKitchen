import React from 'react'
import Form from '../component/Form'
import { useAuth } from '../hook/useAuth'

function Signup() {
    const {register,isRegistering,registerError } = useAuth();
    return (
        <div>
            <Form
                btn={"Sign Up"}
                type={register}
                isloading={isRegistering}
                iserror={ registerError}
                path={"/"}
            />
        </div>
    )
}

export default Signup
