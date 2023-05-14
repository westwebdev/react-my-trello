import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalContext from '../context/globalContext';

const AuthGuard = ({ element: Element }) => {
    const {userData} = useContext(GlobalContext)

    const isAuthenticated = userData?.isLoggedIn;

    return isAuthenticated ? Element : <Navigate to="/myaccount" />;
}

export default AuthGuard;
