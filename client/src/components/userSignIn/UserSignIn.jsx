import './UserSignIn.css';
import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FormLabel } from '../shared/formLabel/FormLabel.jsx';
import { REGEX_TESTS } from '../../utilities/formUtility.js';
import { FormInstructions } from '../shared/formInstructions/FormInstructions.jsx';

const EMAIL_REGEX = REGEX_TESTS.email;
const PWD_REGEX = REGEX_TESTS.pwd;

// TODO: Combine all states into a single complex state
// TODO: Move logic into useForm hook or create a new hook - inc ALL handlers - make an abstraction for all
// TODO: Move repetitive html into a util file and create an input+label function creator
// TODO: Explore further optimization options
// TODO: Apply the same principles to the Sign-In form as well
// TODO: Set a timeout for set err msg so it clears up and hides away after 5 seconds on the screen

const initialValues = {
    email: '', validEmail: false, emailFocus: false,
    pwd: '', validPwd: false, pwdFocus: false,
    errMsg: '', success: false,
};

function UserSignIn() {
    const { user, loginUser } = useAuth();
    const { values, setValues, onChange, onSubmit, onBlur, onFocus } = useForm(handleSubmit, initialValues);

    const emailRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(values.email);
        setValues(state => ({ ...state, validEmail: result }));
    }, [values.email])

    useEffect(() => {
        const result = PWD_REGEX.test(values.pwd);
        setValues(state => ({ ...state, validPwd: result }));
    }, [values.pwd])

    useEffect(() => {
        setValues(state => ({ ...state, errMsg: '' }));
        // console.log(values);
    }, [values.email, values.pwd])


    async function handleSubmit(submitted) {
        // console.log(submitted);

        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(values.email);
        const v2 = PWD_REGEX.test(values.pwd);
        if (!v1 || !v2) {
            setValues(state => ({ ...state, errMsg: 'Invalid Entry' }));
            return;
        }
        try {
            // 1. Send data to back end
            const userInfo = { email: values.email, pwd: values.pwd };
            const data = await loginUser(userInfo);
            // 2. Receive a response. Save it. Log it.
            // console.log(data);
            if (!data?.userId) throw data;

            // 3. setSuccess(true) or implement a redirect if the back end returns a token for auto-sign-in post sign up

            // 4. Clear State and inputs
            // setUsername('');
            // setEmail('');
            // setPwd('');
            // setMatchPwd('');
        } catch (err) {
            console.log(err?.response?.code, err?.message);
            if (!err?.response) {
                setValues(state => ({ ...state, errMsg: 'No Server Response' }));
            } else if (err?.response?.code === 401) {
                setValues(state => ({ ...state, errMsg: 'Invalid credentials' }));
            } else if (err?.response?.code === 429) {
                setValues(state => ({ ...state, errMsg: 'Too Many Attempts' }));
            } else {
                setValues(state => ({ ...state, errMsg: 'Sign Up Failed' }));
            }
            errRef.current.focus();
            setTimeout(() => {
                setValues(state => ({ ...state, errMsg: '' }));
            }, 5000);
        }
    }

    return (
        <div className='sign-in-ctr'>
            {values.success ? (
                // MOCKUP MESSAGE ON SUCCESS ==> Replace with a redirect or improve styling if time's not enough
                <section>
                    <h1>Success!</h1>
                    <p><span className="line btn"><Link to={'/user/sign-in'}>Sign In</Link></span></p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={values.errMsg ? "errmsg" : "offscreen"}>{values.errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={onSubmit}>

                        <FormLabel text='Email' validProp={values.validEmail} prop={values.email} />
                        <input
                            type="email"
                            id="email"
                            name='email'
                            ref={emailRef}
                            autoComplete="off"
                            onChange={onChange}
                            value={values.email}
                            required
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        <FormInstructions id='emailnote' className={values.emailFocus && values.email && !values.validEmail ? "instructions" : "offscreen"} />


                        <FormLabel text='Password' validProp={values.validPwd} prop={values.pwd} />
                        <input
                            type="password"
                            id="pwd"
                            name='pwd'
                            autoComplete="off"
                            onChange={onChange}
                            value={values.pwd}
                            required
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        <FormInstructions id='pwdnote' className={values.pwdFocus && !values.validPwd ? "instructions" : "offscreen"} />

                        <button className='btn' type='submit' disabled={!values.validEmail || !values.validPwd ? true : false}>Sign In</button>
                    </form>
                    <div>
                        <span>Not signed up?</span>
                        <span className="line a-left"><Link to={'/user/sign-up'}>Sign Up</Link></span>
                    </div>
                </section>
            )}
        </div>
    )
}

export default UserSignIn;