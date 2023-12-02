import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const parse = {
    'Shows': ['smart_display', '/shows', 'users'],
    'Actors': ['group', '/actors', 'users'],
    'Schedule': ['calendar_month', '/schedule', 'all'],
    'Sign Up': ['person_add', '/user/sign-up', 'guests'],
    'Sign In': ['login', '/user/sign-in', 'guests'],
    'My Profile': ['account_circle', '/user/profile', 'users'],
};

export function NavBtn({ target, check, handler, user }) {
    const availableTo = parse[target][2];
    const routeTo = parse[target][1];
    const icon = parse[target][0];
    let execute = false;

    useEffect(() => {
        // console.log(target, check, handler, user);
    }, [])

    switch (availableTo) {
        case 'all': execute = true; break;
        case 'users': if (user) execute = true; break;
        case 'guests': if (!user) execute = true; break;
    }

    if (execute) {
        return (<li className={`nav-link a-left${check ? '' : ' tooltip-anchor'}`}>
            <Link to={routeTo} onClick={handler} className='nav-a'>
                {check ? target : (<span className="material-symbols-outlined">{icon}</span>)}
            </Link>
            <div className='tooltip'>{target}</div>
        </li>);
    }
    return null;
}