import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
    const { user } = React.useContext(AuthContext);
    
    if (user) return <Navigate to="/" />

    return <Outlet />
}
