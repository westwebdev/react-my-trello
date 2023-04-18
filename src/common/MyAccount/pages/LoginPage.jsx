import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import FormWrapper from '../../../components/FormWrapper';
import { loginForm } from '../../../data/forms';
import formComponentRender from '../../../utils/formComponentRender';
import { extendFormData } from '../../../utils/formUtils';
import { formValidation } from '../../../utils/formValidation';

const LoginPage = () => {
    const [loginFormData, setLoginFormData] = useState(loginForm);

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {validatedForm, isValid} = formValidation([...loginFormData]);

        if (isValid) {
            console.log('logged');
        } else {
            setLoginFormData([
                ...validatedForm
            ]);
        }
    }

    const blurHandler = (e, item) => {
        extendFormData(e, item, loginFormData, setLoginFormData);
    }

    const eventsHandler = {
        onBlur: (e, item) => blurHandler(e, item)
    }

    return (
        <SimpleGrid columns={1}>
            <Box>
                <FormWrapper
                    isModalForm={false}
                    submitHandler={onSubmitForm}
                    formComponent={
                        formComponentRender({
                            formObject: loginFormData ,
                            eventsHandler,
                        })
                    }
                />
            </Box>
        </SimpleGrid>
    );
}

export default LoginPage;