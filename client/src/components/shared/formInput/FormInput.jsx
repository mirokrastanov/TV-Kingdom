import { useEffect } from 'react';

const targetType = {
    'username': 'text',
    'email': 'email',
    'pwd': 'password',
    'matchPwd': 'password',
};

export function FormInput({ target, elRef, val, handlers = [], }) {

    useEffect(() => {
        // console.log(target, elRef, val, handlers);
    }, [])

    return (
        <input
            type={targetType[target]}
            id={target}
            name={target}
            ref={elRef}
            value={val}
            required
            autoComplete="off"
            onChange={handlers.length > 0 && handlers[0]}
            onFocus={handlers.length > 0 && handlers[1]}
            onBlur={handlers.length > 0 && handlers[2]}
        />
    );
};
