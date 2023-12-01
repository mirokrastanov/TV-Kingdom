import './UserSignIn.css';
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

// TODO: Explore further optimization options

const initialValues = {
    email: '', validEmail: false, emailFocus: false,
    pwd: '', validPwd: false, pwdFocus: false,
    errMsg: '', loading: false,
};

function UserSignIn() {
    const { values, setValues, onChange, onSubmit, onBlur, onFocus } = useForm(handleSubmit, initialValues);
    const { user, loginUser } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        if (user) navigate('/');
        emailRef.current?.focus();
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


    async function handleSubmit(sub) {
        // console.log(sub);

        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(values.email);
        const v2 = PWD_REGEX.test(values.pwd);
        if (!v1 || !v2) {
            setValues(state => ({ ...state, errMsg: 'Invalid Entry' }));
            return;
        }
        try {
            setValues(state => ({ ...state, loading: true }));
            // 1. Send data to back end
            const userInfo = { email: sub.email, pwd: sub.pwd };
            const data = await loginUser(userInfo);
            // 2. Receive a response & re-throw error if present
            if (!data?.$id) throw data;
            // 3. setSuccess(true) & clear inputs - this adds loading
            setValues(state => ({ ...state, email: '', pwd: '' }));
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
        <div className='sign-in-ctr'>
            {values.loading ? (
                <section>
                    <PageLoader />
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={values.errMsg ? "errmsg" : "offscreen"}>{values.errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={onSubmit}>

                        <FormLabel text='Email' validProp={values.validEmail} prop={values.email} />
                        <FormInput target={'email'} elRef={emailRef} val={values.email} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='emailnote' check={values.emailFocus && values.email && !values.validEmail} />

                        <FormLabel text='Password' validProp={values.validPwd} prop={values.pwd} />
                        <FormInput target={'pwd'} val={values.pwd} handlers={[onChange, onFocus, onBlur]} />
                        <FormInstructions id='pwdnote' check={values.pwdFocus && !values.validPwd} />

                        <button className='btn' type='submit' disabled={!values.validEmail || !values.validPwd}>Sign In</button>
                    </form>
                    <div>
                        <span>Not signed up?</span>
                        <span className="line btn"><Link to={'/user/sign-up'}>Sign Up</Link></span>
                    </div>
                </section>
            )}
        </div>
    )
}

export default UserSignIn;