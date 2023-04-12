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

    form.map(item => {
        fieldValidation(item);
    });

    valid = !form.some(item => item.valid === false);

    return {
        form,
        isValid: valid
    };
}
