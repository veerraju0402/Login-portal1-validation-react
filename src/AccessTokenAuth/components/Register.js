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

    const [userObj,setUserObj]=useState(
        // {userName:'avr3',passWord:'Avr3@',roles:[]}
        {}
        //{userName:null,passWord:null,roles:[]}
        //  {userName:'',passWord:'',roles:[]}
    );

    const updateObj = (e) => {
        setUserObj(previousState => {
            console.log("validName:"+validName+" - "+e.target.value);
            console.log("validPwd:"+validPwd+" - "+e.target.value);
           
            console.log("------------------------");
            
          return { ...previousState, [e.target.name]: e.target.value }
        });
      }

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userObj.userName));
    }, [userObj.userName])

    useEffect(() => {
        console.log("userObj.passWord:"+userObj.passWord+" matchpwsd:"+matchPwd);
        setValidPwd(PWD_REGEX.test(userObj.passWord));
        setValidMatch(userObj.passWord === matchPwd);
    }, [userObj.passWord, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userObj.userName, userObj.passWord, matchPwd, userObj.roles])

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

        console.log('1 userObj',userObj);
        const temp = Object.keys(checkedItems).filter(key => checkedItems[key]);
        console.log('1 temp',temp);
       
        userObj.roles=temp;
        setUserObj(userObj);
        console.log('2 userObj',userObj);

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userObj.userName);
        const v2 = PWD_REGEX.test(userObj.passWord);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(userObj),
                {
                    headers: { 'Content-Type': 'application/json','Accept': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUserObj(...userObj,userObj.userName,' ')
            setUserObj(...userObj,userObj.passWord,' ')
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
                            <FontAwesomeIcon icon={faTimes} className={validName || !userObj.userName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => updateObj(e)}
                            value={userObj.userName}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && userObj.userName && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !userObj.passWord ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="passWord"
                            onChange={(e) =>  updateObj(e)}
                            value={userObj.passWord}
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
                            name="matchPwd"
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

<div disabled={!validName || !validPwd || !validMatch ? true : false}>
                        <label htmlFor="user_roles">
                            user roles:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
<br/>
                        <label>
        <input
          type="checkbox"
          name="USER"
          checked={checkedItems.USER}
          onChange={ handleCheckboxChange}
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
</div>
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