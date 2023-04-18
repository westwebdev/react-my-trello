import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import { splitFormToBodyAndFooter } from "./formUtils";

const formComponentRender = ({formObject, eventsHandler, options: {isSeparateFooter = false} = {}}) => {
    const setEventsHandler = (item) => {
        if (item.events) {
            return item.events.reduce((acc, eventName) => {
                if (typeof eventsHandler[eventName] === 'function') {
                    acc[eventName] = (event) => eventsHandler[eventName](event, item);
                }
                return acc;
              }, {})
        }
    }

    let formObjArray = [];

    if (isSeparateFooter) {
        formObjArray = [
            splitFormToBodyAndFooter(formObject).body,
            splitFormToBodyAndFooter(formObject).footer
        ]
    } else {
        formObjArray = [formObject];
    }

    {
        return formObjArray.map(formObj => {
            return formObj.map(
                (item) => {
                    switch (item.type) {
                        case 'text':
                        case 'email':
                        case 'number':
                        case 'password':
    
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
                        case 'textarea':
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
                        case 'select':
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
        })
    }
}

export default formComponentRender;
