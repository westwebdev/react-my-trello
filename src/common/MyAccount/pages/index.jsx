import React, { useContext } from 'react';
import GlobalContext from '../../../context/globalContext';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

const MyAccount = () => {
    const {userContextData, setUserContextData} = useContext(GlobalContext)

    const isUserLoggedIn = userContextData.isLogged;

    return (
        <>
            {
                isUserLoggedIn
                ?
                <Dashboard/>
                :
                <LoginPage
                    userContextData={userContextData}
                    setUserContextData={setUserContextData}
                />
            }
        </>
    );
}

export default MyAccount;
