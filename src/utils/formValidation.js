export const clearValidationErrors = (form) => {
    return form.map(item => item.valid = true)
}

export const fieldValidation = (field) => {
    if (field.required && !field?.value?.trim()?.length) {
        field.valid = false;
    } else {
        field.valid = true;
    }

    return field;
}

export const formValidation = (form) => {
    let valid = true;

    const validatedForm = form.map(item => {
        return fieldValidation(item);
    });

    valid = !form.some(item => item.valid === false);

    return {
        validatedForm,
        isValid: valid
    };
}
