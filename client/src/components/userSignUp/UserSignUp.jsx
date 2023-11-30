import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserSignUp.css';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FormLabel } from '../shared/formLabel/FormLabel.jsx';
import { REGEX_TESTS } from '../../utilities/formUtility.js';

const EMAIL_REGEX = REGEX_TESTS.email;
const PWD_REGEX = REGEX_TESTS.pwd;
const USER_REGEX = REGEX_TESTS.user;

// TODO: Combine all states into a single complex state
// TODO: Move logic into useForm hook or create a new hook - inc ALL handlers - make an abstraction for all
// TODO: Move repetitive html into a util file and create an input+label function creator
// TODO: Explore further optimization options
// TODO: Apply the same principles to the Sign-In form as well
// TODO: Set a timeout for set err msg so it clears up and hides away after 5 seconds on the screen

const initialValues = {
    username: '', validName: false, userFocus: false,
    email: '', validEmail: false, emailFocus: false,
    pwd: '', validPwd: false, pwdFocus: false,
    matchPwd: '', validMatch: false, matchFocus: false,
    errMsg: '', success: false,
};

function UserSignUp() {
    const { user, registerUser } = useAuth();
    const { values, onChange, onSubmit } = useForm(handleSubmit, initialValues);

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
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
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, email, pwd, matchPwd])


    async function handleSubmit(e) {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // 1. Send data to back end
            const userInfo = { username, email, pwd, matchPwd };
            registerUser(userInfo);

            // 2. Receive a response. Save it. Log it.
            // 3. setSuccess(true) or implement a redirect if the back end returns a token for auto-sign-in post sign up

            // 4. Clear State and inputs
            // setUsername('');
            // setEmail('');
            // setPwd('');
            // setMatchPwd('');
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
        <div className='sign-up-ctr'>
            {success ? (
                // MOCKUP MESSAGE ON SUCCESS ==> Replace with a redirect or improve styling if time's not enough
                <section>
                    <h1>Success!</h1>
                    <p><span className="line btn"><Link to={'/user/sign-in'}>Sign In</Link></span></p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign Up</h1>
                    <form onSubmit={onSubmit}>

                        <FormLabel text='Username' validProp={validName} prop={username} />
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={onChange}
                            value={values.username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <div id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters</p>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Must begin with a <b>Letter</b></p>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Allowed: <b>Letters</b>, <b>Numbers</b>, <b>Underscores</b> & <b>Hyphens</b></p>
                        </div>


                        <FormLabel text='Email' validProp={validEmail} prop={email} />
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <div id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Enter a valid <b>Email</b></p>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Eg: <b>john@example.com</b></p>
                        </div>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <div id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> 6 to 24 characters</p>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Must include <b>Uppercase</b> & <b>Lowercase</b> letters & a <b>Number</b></p>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Allowed <b>optional</b> special characters: <b>! . _ @ # $ %</b></p>
                        </div>


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
                        <div id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <p><FontAwesomeIcon icon={faInfoCircle} /> Must match the first <b>Password</b></p>
                        </div>


                        <button className='btn' type='submit' disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <div>
                        <span>Have an Account?</span>
                        <span className="line btn"><Link to={'/user/sign-in'}>Sign In</Link></span>
                    </div>
                </section>
            )}
        </div>
    )
}

export default UserSignUp;