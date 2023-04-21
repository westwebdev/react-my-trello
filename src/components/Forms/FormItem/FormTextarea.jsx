import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';

const FormTextarea = ({item, setEventsHandler}) => {
    return (
        <FormControl
            key={item.id}
            isInvalid={item.valid === false}
            isRequired={item.required === true}
            mb='4'
        >
            <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
            <Textarea
                id={item.id}
                // value={formObject.find(field => field.id === item.id).value || ''}
                placeholder={item.placeholder}
                {...setEventsHandler(item)}
            />
            <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
    );
}

export default FormTextarea;
