import React, { memo, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react';

import Header from '../../components/Header';
import MainRoute from '../../routers/MainRoute';
import theme from '../../components/theme';
import GlobalContext from '../../context/globalContext';
import { user, userRole } from '../../data/users';
import useFetch from '../../services/hooks/useFetch';

function App() {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [isMounted, setIsMounted] = useState(false);
    // const [userRoles, setUserRoles] = useState(userRole);

    const { data, isLoading, getData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            setUserData(data);
        }
    }, [isLoading])

    useEffect(() => {
        if (isMounted) {
            if (!userData) {
                getData('getUser');
            }
        } else {
            setIsMounted(true);
        }
    }, [isMounted])

    const MemoHeader = memo(Header);

    return (
        <ChakraProvider theme={theme}>
            <GlobalContext.Provider
                value={{
                    userData,
                    setUserData,
                    // userRoles
                }}
            >
                <MemoHeader />
                <Container p='4' maxW='container.xl'>
                    <MainRoute />
                </Container>
            </GlobalContext.Provider>
        </ChakraProvider>
    );
}

export default App;
