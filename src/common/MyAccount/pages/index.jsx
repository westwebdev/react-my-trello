import { Flex } from '@chakra-ui/react';
import React from 'react';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

const MyAccount = () => {
    const isUserLoggedIn = false;

    return (
        <>
            {
                isUserLoggedIn
                ?
                <Dashboard/>
                :
                <LoginPage/>
            }
        </>
    );
}

export default MyAccount;