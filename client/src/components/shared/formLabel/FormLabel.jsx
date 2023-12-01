import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export function FormLabel({ text, validProp, prop }) {

    useEffect(() => {
    //   console.log(text, validProp, prop);
    }, [])

    let forProp = text.toLowerCase();
    if (text == 'Confirm Password') forProp = 'match';

    return (
        <label htmlFor={forProp}>
            {text}
            <FontAwesomeIcon icon={faCheck} className={validProp ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validProp || !prop ? "hide" : "invalid"} />
        </label>
    );
};
