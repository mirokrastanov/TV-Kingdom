import './UserSignUp.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FormLabel } from '../shared/formLabel/FormLabel.jsx';
import { REGEX_TESTS } from '../../utilities/formUtility.js';
import { FormInstructions } from '../shared/formInstructions/FormInstructions.jsx';
import { FormInput } from '../shared/formInput/FormInput.jsx';
import PageLoader from '../shared/pageLoader/PageLoader.jsx';

const EMAIL_REGEX = REGEX_TESTS.email;
const PWD_REGEX = REGEX_TESTS.pwd;
const USER_REGEX = REGEX_TESTS.user;

// TODO: Explore further optimization options

const initialValues = {
    username: '', validUsername: false, usernameFocus: false,
    email: '', validEmail: false, emailFocus: false,
    pwd: '', validPwd: false, pwdFocus: false,
    match: '', validMatch: false, matchFocus: false,
    errMsg: '', loading: false,
};

function UserSignUp() {
    const { values, setValues, onChange, onSubmit, onBlur, onFocus } = useForm(handleSubmit, initialValues);
    const { user, registerUser } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        if (user) navigate('/');
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(values.username);
        setValues(state => ({ ...state, validUsername: result }));
    }, [values.username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(values.email);
        setValues(state => ({ ...state, validEmail: result }));
    }, [values.email])

    useEffect(() => {
        const result = PWD_REGEX.test(values.pwd);
        const match = values.pwd === values.match;
        setValues(state => ({ ...state, validPwd: result, validMatch: match }));
    }, [values.pwd, values.match])

    useEffect(() => {
        setValues(state => ({ ...state, errMsg: '' }));
        // console.log(values);
    }, [values.username, values.email, values.pwd, values.match])


    async function handleSubmit(sub) {
        // console.log(sub);

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(values.username);
        const v2 = EMAIL_REGEX.test(values.email);
        const v3 = PWD_REGEX.test(values.pwd);
        if (!v1 || !v2 || !v3) {
            setValues(state => ({ ...state, errMsg: 'Invalid Entry' }));
            return;
        }
        try {
            setValues(state => ({ ...state, loading: true }));
            // 1. Send data to back end
            const userInfo = { username: sub.username, email: sub.email, pwd: sub.pwd };
            const data = await registerUser(userInfo);
            // 2. Receive a response & re-throw error if present
            if (!data?.$id) throw data;
            // 3. setSuccess(true) & clear inputs
            setValues(state => ({ ...state, username: '', email: '', pwd: '', match: '' }));
            // 4. Re-route to index
            navigate('/');

        } catch (err) {
            setValues(state => ({ ...state, loading: false }));
            // console.log(err?.response?.code, err?.message);
            if (!err?.response) {
                setValues(state => ({ ...state, errMsg: 'No Server Response' }));
            } else if (err?.response?.code === 401) {
                setValues(state => ({ ...state, errMsg: 'Invalid credentials' }));
            } else if (err?.response?.code === 429) {
                setValues(state => ({ ...state, errMsg: 'Too Many Attempts' }));
            } else {
                setValues(state => ({ ...state, errMsg: 'Sign Up Failed' }));
            }
            errRef.current?.focus();
            setTimeout(() => {
                setValues(state => ({ ...state, errMsg: '' }));
            }, 5000);
        }
    }

    return (
        <div className='sign-up-ctr'>
            {values.loading ? (
                <section>
                    <PageLoader />
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={values.errMsg ? "errmsg" : "offscreen"}>{values.errMsg}</p>
                    <h1>Sign Up</h1>
                    <form onSubmit={onSubmit}>

                        <FormLabel text='Username' validProp={values.validUsername} prop={values.username} />
                        <FormInput target={'username'} elRef={userRef} val={values.username} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='uidnote' check={values.usernameFocus && values.username && !values.validUsername} />

                        <FormLabel text='Email' validProp={values.validEmail} prop={values.email} />
                        <FormInput target={'email'} val={values.email} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='emailnote' check={values.emailFocus && values.email && !values.validEmail} />

                        <FormLabel text='Password' validProp={values.validPwd} prop={values.pwd} />
                        <FormInput target={'pwd'} val={values.pwd} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='pwdnote' check={values.pwdFocus && !values.validPwd} />

                        <FormLabel text='Confirm Password' validProp={values.validMatch && values.match} prop={values.match} />
                        <FormInput target={'match'} val={values.match} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='confirmnote' check={values.matchFocus && !values.validMatch} />

                        <button className='btn' type='submit' disabled={!values.validUsername || !values.validEmail || !values.validPwd || !values.validMatch}>Sign Up</button>
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