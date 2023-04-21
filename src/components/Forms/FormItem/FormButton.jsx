import React from 'react';
import { Button, FormControl } from '@chakra-ui/react';

const FormButton = ({item}) => {
    return (
        <FormControl key={item.id}>
            <Button colorScheme='blue' type={item.type}>{item.label}</Button>
        </FormControl>
    );
}

export default FormButton;
