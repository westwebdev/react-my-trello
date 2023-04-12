import { fieldValidation } from "./formValidation"

export const splitFormToBodyAndFooter = (form) => {
    return {
        body: form.filter(item => item.type !== 'submit'),
        footer: form.filter(item => item.type === 'submit')
    }
}

export const getFormDataByFieldId = (form, fieldId) => {
    return form.find(item => item.id === fieldId).value;
}

export const extendFormData = (e, item, formBody, formFooter, setFormState) => {
    let fieldObj = fieldValidation({
        ...item,
        value: e.target.value,
    });

    formBody = formBody.map(item => {
        return item.id === fieldObj.id ? item = {...item, ...fieldObj} : item;
    });

    setFormState([
        ...formBody,
        ...formFooter
    ]);
}