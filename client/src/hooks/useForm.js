import { useState } from "react";


export const useForm = (submitHandler, initialValues) => {
    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        let name = e.target.name;
        if (e.target.name == 'confirm_pwd') name = 'matchPwd';
        setValues(state => ({
            ...state,
            [name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandler(values);
    };

    const onFocus = (e) => {
        let name = e.target.name;
        if (e.target.name == 'matchPwd') name = 'match';
        else if (e.target.name == 'username') name = 'user';
        setValues(state => ({
            ...state,
            [`${name}Focus`]: true,
        }));
    };

    const onBlur = (e) => {
        let name = e.target.name;
        if (e.target.name == 'matchPwd') name = 'match';
        else if (e.target.name == 'username') name = 'user';
        setValues(state => ({
            ...state,
            [`${name}Focus`]: false,
        }));
    };

    return {
        values,
        setValues,
        onChange,
        onSubmit,
        onFocus,
        onBlur,
    }
};