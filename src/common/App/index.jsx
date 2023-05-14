import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react';

import Header from '../../components/Header';
import MainRoute from '../../routers/MainRoute';
import theme from '../../components/theme';

function App() {
    const MemoHeader = React.memo(Header);

    return (
        <ChakraProvider theme={theme}>
            <MemoHeader />
            <Container p='4' maxW='container.xl'>
                <MainRoute />
            </Container>
        </ChakraProvider>
    );
}

export default App;
