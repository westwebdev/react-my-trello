import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const SpinnerComponent = () => {
    return (
        <Box
            position='absolute'
            top='0'
            left='0'
            width='100%'
            height='100%'
            bg='whiteAlpha.700'
            display='flex'
            justifyContent='center'
            alignItems='center'
            zIndex='docked'
        >
            <Spinner
                size='lg'
            />
        </Box>
    );
}

export default SpinnerComponent;
