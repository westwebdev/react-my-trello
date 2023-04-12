import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";

const formRender = (formObject, formState, blurHandler) => {
    {
        return formObject.map(
            (item) => {
                switch (item.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                        return (
                            <FormControl
                                key={item.id}
                                isInvalid={item.valid === false}
                                mb='4'
                            >
                                <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
                                <Input
                                    id={item.id}
                                    type={item.type}
                                    // value={formState.find(field => field.id === item.id).value || ''}
                                    // required={item.required}
                                    onBlur={(e) => blurHandler(e, item)}
                                />
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            </FormControl>
                        );
                    case 'textarea':
                        return (
                            <FormControl
                                key={item.id}
                                isInvalid={item.valid === false}
                                mb='4'
                            >
                                <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
                                <Textarea
                                    id={item.id}
                                    // value={formState.find(field => field.id === item.id).value || ''}
                                    placeholder={item.placeholder}
                                    // required={item.required}
                                    onBlur={(e) => blurHandler(e, item)}
                                />
                                <FormErrorMessage>Field is required.</FormErrorMessage>
                            </FormControl>
                        );
                    case 'select':
                        return (
                            <FormControl
                                key={item.id}
                                isInvalid={item.valid === false}
                                mb='4'
                            >
                                <FormLabel htmlFor='taskColor'>Task kind color</FormLabel>
                                <Select 
                                    // value={formState.find(field => field.id === item.id).value || ''}
                                    // required={item.required}
                                    onBlur={(e) => blurHandler(e, item)}
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
                    case 'submit':
                        return (
                            <FormControl key={item.id}>
                                <Button colorScheme='blue' type={item.type}>{item.label}</Button>
                            </FormControl>
                        )
                    default:
                        return true;
                }
            }
        )
    }
}

export default formRender;
