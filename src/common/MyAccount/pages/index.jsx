import React, { useContext } from 'react';
import GlobalContext from '../../../context/globalContext';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

const MyAccount = () => {
    const {userData} = useContext(GlobalContext)

    return (
        <> { userData?.isLoggedIn ? <Dashboard/> : <LoginPage/> } </>
    );
}

export default MyAccount;
