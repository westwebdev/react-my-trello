import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const formRender = (formObject, formState, setFormState) => {
    {
        return formObject.map(
            (item) => {
                switch (item.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                        return (
                            <FormControl mb='4' key={item.id}>
                                <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
                                <Input
                                    id={item.id}
                                    type={item.type}
                                    value={formState[item.id] || ''}
                                    onChange={(e) => setFormState({...formState, [item.id]: e.target.value})}
                                />
                            </FormControl>
                        );
                    case 'select':
                        return (
                            <FormControl mb='4' key={item.id}>
                                <FormLabel htmlFor='taskColor'>Task kind color</FormLabel>
                                <Select 
                                    value={formState[item.id] || ''}
                                    onChange={(e) => setFormState({...formState, [item.id]: e.target.value})}
                                >
                                    <option key={`${item.id}_empty`} value=''>Choose variant</option>
                                    {
                                        item.option.map(
                                            item =>
                                            <option key={item.id} value={item.value}>{item.name}</option>
                                        )
                                    }
                                </Select>
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
