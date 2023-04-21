import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react';

import Header from '../../components/Header';
import MainRoute from '../../routers/MainRoute';
import theme from '../../components/theme';
import GlobalContext from '../../context/globalContext';
import { user, userRole } from '../../data/users';

function App() {
    const [userDataState, setUserDataState] = useState(user);
    const [userRoleDataState] = useState(userRole);

    return (
        <ChakraProvider theme={theme}>
            <GlobalContext.Provider
                value={{
                    userContextData: userDataState,
                    setUserContextData: setUserDataState,
                    userRoleContext: userRoleDataState
                }}
            >
                <Header />
                <Container p='4' maxW='container.xl'>
                    <MainRoute />
                </Container>
            </GlobalContext.Provider>
        </ChakraProvider>
    );
}

export default App;
