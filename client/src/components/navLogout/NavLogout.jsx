import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const parse = {
    'Logout': ['logout', '/', 'users'],
};

export function NavLogout({ user, check, handler, logout, target = 'Logout' }) {
    const availableTo = parse[target][2];
    const routeTo = parse[target][1];
    const icon = parse[target][0];
    let execute = false;

    useEffect(() => {
        // console.log(check, handler, user);
    }, [])

    switch (availableTo) {
        case 'all': execute = true; break;
        case 'users': if (user) execute = true; break;
        case 'guests': if (!user) execute = true; break;
    }

    if (execute) {
        return (<li className={`nav-link a-left${check ? '' : ' tooltip-anchor'}`} onClick={logout}>
            <Link to={routeTo} onClick={handler} className='nav-a'>
                {check ? target : (<span className="material-symbols-outlined">{icon}</span>)}
            </Link>
            <div className='tooltip'>{target}</div>
        </li>);
    }
    return null;
}