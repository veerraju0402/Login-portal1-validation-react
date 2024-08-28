import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_.@]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    // user=

    const [userName, setUserName] = useState('avr3');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [passWord, setPassWord] = useState('Avr3@');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('Avr3@');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(passWord));
        setValidMatch(passWord === matchPwd);
    }, [passWord, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userName, passWord, matchPwd, roles])

    function assignRoles(e){
        const singleRole= e.target.value
        setRole(singleRole)
        console.log("singleRole:"+role);
         setRoles([e.target.value])
        //  setRoles([ ...roles, role ]);
        // setRoles(prevStateArray => [...prevStateArray, role]);
        console.log("roles list:"+roles);
     }

  
        const [checkedItems, setCheckedItems] = useState({  // State to manage checked items
          USER: false,
          EDITOR: false,
          ADMIN: false
          // Add more options as needed
        });
        const handleCheckboxChange = (e) => {
            const { name, checked } = e.target;
            setCheckedItems(prevState => ({
              ...prevState,
              [name]: checked
            }));
          };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const temp = Object.keys(checkedItems).filter(key => checkedItems[key]);
        console.log('Selected options:-', temp);
        for (const item of temp) {
            // setRoles([ ...roles, {item} ]);
          }
          setRoles([ ...roles, temp]);
        // setRoles(prevStateArray => [...prevStateArray, temp]);
        console.log('roles:', roles);
       
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(passWord);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ userName, passWord, roles }),
                {
                    headers: { 'Content-Type': 'application/json','Accept': 'application/json'},
                    withCredentials: true
                }
            );

            // const response =  await fetch("http://localhost:8080/test/demo",
            //     {
            //         method: "GET",
            //         header: {
            //             "Content-Type": "application/json",
            //             "Accept": "application/json"
            //         }
            //     });

            
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUserName('');
            setPassWord('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !userName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && userName && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !passWord ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassWord(e.target.value)}
                            value={passWord}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>


                        <label htmlFor="user_roles">
                            user roles:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>

                        <label>
        <input
          type="checkbox"
          name="USER"
          checked={checkedItems.USER}
          onChange={handleCheckboxChange}
        />
        USER access
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="EDITOR"
          checked={checkedItems.EDITOR}
          onChange={handleCheckboxChange}
        />
         EDITOR access
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="ADMIN"
          checked={checkedItems.ADMIN}
          onChange={handleCheckboxChange}
        />
        ADMIN access
      </label>  

                        {/* <input
                            type="text"
                            id="user_roles"
                            // onChange={(e) => setRoles([e.target.value])}
                            onChange={(e) => assignRoles(e)}
                            // onChange={(e) => setRoles(prevStateArray => [...prevStateArray, e.target.value])}
                            
                            
                            value={roles}
                            // value={roles.join(', ')}
                            required
                            // aria-invalid={validMatch ? "false" : "true"}
                            // aria-describedby="confirmnote"
                            // onFocus={() => setMatchFocus(true)}
                            // onBlur={() => setMatchFocus(false)}
                        /> */}

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register