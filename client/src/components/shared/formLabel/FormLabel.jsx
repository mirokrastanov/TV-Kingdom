import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export function FormLabel({ text, validProp, prop }) {

    useEffect(() => {
    //   console.log(text, validProp, prop);
    }, [])
    
    return (
        <label htmlFor={text.toLowerCase()}>
            {text}
            <FontAwesomeIcon icon={faCheck} className={validProp ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validProp || !prop ? "hide" : "invalid"} />
        </label>
    );
};
