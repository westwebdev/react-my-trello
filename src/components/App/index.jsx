import React from 'react';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react';

import Header from '../Header';
import MainRoute from '../Routers/MainRoute';
import theme from '../theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Header />
            <Container p='4' maxW='container.xl'>
                <MainRoute />
            </Container>
        </ChakraProvider>
    );
}

export default App;
