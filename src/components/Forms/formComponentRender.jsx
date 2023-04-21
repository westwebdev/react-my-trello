import React from 'react';

import { splitFormToBodyAndFooter } from "../../utils/formUtils";
import FormInput from './FormItem/FormInput';
import FormSelect from './FormItem/FormSelect';
import FormButton from './FormItem/FormButton';
import FormTextarea from './FormItem/FormTextarea';

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
                                <FormInput item={item} setEventsHandler={setEventsHandler} />
                            );
                        case 'textarea':
                            return (
                                <FormTextarea item={item} setEventsHandler={setEventsHandler} />
                            );
                        case 'select':
                            return (
                                <FormSelect item={item} setEventsHandler={setEventsHandler} />
                            );
                        case 'submit':
                            return (
                                <FormButton item={item}/>
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
