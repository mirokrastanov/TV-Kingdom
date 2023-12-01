import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const messages = {
    uidnote: [
        (<> 4 to 24 characters</>),
        (<> Must begin with a <b>Letter</b></>),
        (<> Allowed: <b>Letters</b>, <b>Numbers</b>, <b>Underscores</b> & <b>Hyphens</b></>),
    ],
    emailnote: [(<> Enter a valid <b>Email</b></>), (<> Eg: <b>john@example.com</b></>)],
    pwdnote: [
        (<> 8 to 24 characters</>),
        (<> Required: <b>Uppercase</b>, <b>Lowercase</b> & <b>Number</b></>),
        (<> Optional: Allowed special characters:</>),
        (<><b> ! . _ @ # $ %</b></>),
    ],
    confirmnote: [(<> Must match the first <b>Password</b></>)],
};

export function FormInstructions({ id, check }) {

    useEffect(() => {
        //   console.log(id, className);
    }, [])

    return (
        <div id={id} className={check ? "instructions" : "offscreen"}>
            {messages[id].map((x, i) => (
                <p key={`${id}-${i}`}>
                    {!(id == 'pwdnote' && i == 3) && (<FontAwesomeIcon icon={faInfoCircle} />)}{x}
                </p>
            ))}
        </div>
    );
};