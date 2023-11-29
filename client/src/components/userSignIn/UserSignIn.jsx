import React from 'react';
import './UserSignIn.css';
import { useForm } from '../../hooks/useForm';


export default function UserSignIn() {
    const { formValues, onChangeHandler, onSubmit } = useForm({
        name: '',
        password: '',
        // rework when the form is selected
    }, (values) => {
        console.log(values);
    });


    return (
        <div className="sign-in-ctr">
            <h1>Sign In FORM</h1>
            <h2>Also add a Sign Up link somewhere</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder='name' value={formValues.name} onChange={onChangeHandler} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" placeholder='password' value={formValues.password} onChange={onChangeHandler} />
                <button type='submit'>Submit</button>
            </form>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repudiandae eius dolorum enim. Nobis quo vitae placeat neque itaque. Illum?</p>
        </div>
    )
};
