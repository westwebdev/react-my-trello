import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const RemoveButtonComponent = ({ remove }) => {
    return (
        <Box
            pos='absolute'
            top='-5px'
            right='-5px'
        >
            <Button
                padding='5px'
                lineHeight='10px'
                fontSize='12px'
                minW='30px'
                h='30px'
                onClick={() => remove()}
            >X</Button>
        </Box>
    );
}

export default RemoveButtonComponent;