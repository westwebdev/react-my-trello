import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const FormInput = ({item, setEventsHandler}) => {
    return (
        <FormControl
            key={item.id}
            isInvalid={item.valid === false}
            isRequired={item.required === true}
            mb='4'
        >
            <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
            <Input
                id={item.id}
                type={item.type}
                // value={formObject.find(field => field.id === item.id).value || ''}
                {...setEventsHandler(item)}
            />
            <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
    );
}

export default FormInput;
