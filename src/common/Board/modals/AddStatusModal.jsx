import React, { useContext, useEffect, useState } from 'react';

import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/react';

import TasksContext from '../../../context/tasksContext';
import { taskStatusForm } from '../../../data/forms';
import formComponentRender from '../../../utils/formComponentRender';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import FormWrapper from '../../../components/FormWrapper';

const AddStatusModal = ({onModalClose}) => {
    const {tasksStatus, setTasksStatus} = useContext(TasksContext);
    const [formData, setFormData] = useState(taskStatusForm);

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            setTasksStatus([
                ...tasksStatus,
                {
                    id: getFormDataByFieldId(validatedForm, 'taskName').toLowerCase(),
                    title: getFormDataByFieldId(validatedForm, 'taskName'),
                    color: getFormDataByFieldId(validatedForm, 'taskColor')
                }
            ]);
            onModalClose();
        } else {
            setFormData([
                ...validatedForm
            ])
        }
    }

    const blurHandler = (e, item) => {
        extendFormData(e, item, formData, setFormData);
    }

    const eventsHandler = {
        onBlur: (e, item) => blurHandler(e, item)
    }

    // useEffect(() => {
    //     console.log(11111)
    // }, [formData])

    useEffect(() => {
        console.log(22222)

        return () => {
            clearValidationErrors([...formData]);
        }
    });

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new kind of status</ModalHeader>
                <ModalCloseButton />
                <FormWrapper
                    isModalForm={true}
                    submitHandler={onSubmitForm}
                    formComponent={
                        formComponentRender({
                            formObject: formData ,
                            eventsHandler,
                            options: {isSeparateFooter: true}
                        })
                    }
                />
            </ModalContent>
        </>
    );
}

export default AddStatusModal;