import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import FormWrapper from '../../../components/Forms/FormWrapper';
import { loginForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { extendFormData } from '../../../utils/formUtils';
import { formValidation } from '../../../utils/formValidation';
import GlobalContext from '../../../context/globalContext';
import useFetch from '../../../services/hooks/useFetch';

const LoginPage = () => {
    const {setUserData} = useContext(GlobalContext)
    const [loginFormData, setLoginFormData] = useState(loginForm);
    const [currentUser, setCurrentUser] = useState({})

    const { data, isLoading, addData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            sessionStorage.setItem('user', JSON.stringify(currentUser));
            setUserData(currentUser);
        }
    }, [isLoading]);

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            addData('setUser', currentUser);
        }
    }, [currentUser])

    const onSubmitForm = (e) => {
        e.preventDefault();

        // dummy code, only for showing differences between user roles
        const loginValue = e.target.login.value;
        let userRole;
        switch (loginValue) {
            case 'w':
                userRole = 'manager'
                break;
            case 'q':
                userRole = 'admin'
                break;
            default:
                userRole = 'user'
                break;
        }

        const {validatedForm, isValid} = formValidation([...loginFormData]);

        if (isValid) {
            setCurrentUser({
                isLoggedIn: true,
                role: userRole
            })
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
                <Divider my='4' />
                <Text>Type into login field <b>'q'</b> - for admin role, <b>'w'</b> - for manager role, <b>any</b> other for general user role. Then go to the Board page</Text>
            </Box>
        </SimpleGrid>
    );
}

export default LoginPage;
