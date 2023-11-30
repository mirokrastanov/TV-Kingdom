import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function PrivateRoutes() {
    const { user } = useAuth(); // import wherever u want to check if there is a user logged in
    return user
        ? (<Outlet />)
        : (<Navigate to='/user/sign-up' />)
}
