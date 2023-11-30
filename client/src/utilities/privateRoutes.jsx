import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
    const user = false;
    return user
        ? (<Outlet />)
        : (<Navigate to='/user/sign-up' />)
}
