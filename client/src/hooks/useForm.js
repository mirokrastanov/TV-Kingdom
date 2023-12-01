import { useState } from "react";


export const useForm = (submitHandler, initialValues) => {
    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandler(values);
    };

    const onFocus = (e) => {
        setValues(state => ({
            ...state,
            [`${e.target.name}Focus`]: true,
        }));
    };

    const onBlur = (e) => {
        setValues(state => ({
            ...state,
            [`${e.target.name}Focus`]: false,
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