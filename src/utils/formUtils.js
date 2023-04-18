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

export const extendFormData = (e, item, formData, setFormState) => {
    let fieldObj = fieldValidation({
        ...item,
        value: e.target.value,
    });

    formData = formData.map(item => {
        return item.id === fieldObj.id ? item = {...item, ...fieldObj} : item;
    });

    setFormState([...formData]);
}