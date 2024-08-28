import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
// import AuthContext from '../Context/AuthProvide';
const LOGIN_URL = '/login';

const Login = () => {

    // const  auth = useContext(AuthContext);
    const {setAuth } = useAuth();
    // console.log("1 setAuth--",setAuth)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userName, passWord])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ userName, passWord }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("response");
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            //setAuth({ user, pwd, roles, accessToken });//not req to store psd as we wont be using it anymore
            console.log("user,roles,token:",userName, roles, accessToken);
            setAuth({ userName, roles, accessToken });
            console.log("userName:",userName);
           
            
            //setAuth({ user,  accessToken });//we can use decrypt accessToken and gt roles in requiredAuth.js
            setUserName('');
            setPassWord('');
            console.log("testing");
            console.log(from);
            if(from !=null )
            navigate(from, { replace: true });
        else
            navigate("/");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassWord(e.target.value)}
                    value={passWord}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login