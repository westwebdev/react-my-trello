import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';

const FormSelect = ({item, setEventsHandler}) => {
    return (
        <FormControl
            key={item.id}
            isInvalid={item.valid === false}
            isRequired={item.required === true}
            mb='4'
        >
            <FormLabel htmlFor='taskColor'>Task kind color</FormLabel>
            <Select
                // value={formObject.find(field => field.id === item.id).value || ''}
                {...setEventsHandler(item)}
            >
                <option key={`${item.id}_empty`} value=''>Choose variant</option>
                {
                    item.option.map(
                        item =>
                        <option key={item.id} value={item.value}>{item.name}</option>
                    )
                }
            </Select>
            <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
    );
}

export default FormSelect;
