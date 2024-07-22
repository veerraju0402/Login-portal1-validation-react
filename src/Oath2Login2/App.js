import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react';

const onSuccess = (res) => {
     const decodedRes = jwtDecode(res?.credential);
    console.log(decodedRes);
   
}

function App() {

    return (
        <div className='loginDiv'>

            <GoogleLogin
                onSuccess={onSuccess}
                onError={(e) => {
                    console.log(e);
                    console.log('Login Failed');
                }}
                type={(e)=>{
                    console.log(e);
                    console.log('Login type');
                }}
            />

            {/* <GoogleLogin
                onSuccess={credentialResponse => {
                    const decoded = jwtDecode(credentialResponse?.credential);
                    console.log(decoded);
                }}
                onError={() => {
                    console.log('Login Failed');
                }} 
            /> */}

        </div>
    )
}

export function LogoutFun(){
    console.log('Logging out');
     googleLogout();
}

export default App;