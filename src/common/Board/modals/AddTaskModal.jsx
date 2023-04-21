import React, { useContext, useEffect, useState } from 'react';

import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/react';

import TasksContext from '../../../context/tasksContext';
import { newTaskForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import FormWrapper from '../../../components/Forms/FormWrapper';

const AddTaskModal = ({onModalClose}) => {
    const {tasksStatusState} = useContext(TasksContext);
    const {tasks, setTasks} = useContext(TasksContext);
    const [formData, setFormData] = useState(newTaskForm);

    formData.map(item => {
        if (item.id === 'taskStatus') {
            item.option = tasksStatusState.map(item => {
                return {
                    id: item.id,
                    value: item.id,
                    name: item.title
                }
            });
        }
        return true;
    });

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    title: getFormDataByFieldId(validatedForm, 'taskSubject'),
                    text: getFormDataByFieldId(validatedForm, 'taskDescription'),
                    status: getFormDataByFieldId(validatedForm, 'taskStatus')
                }
            ]);
            onModalClose();
        } else {
            setFormData([
                ...validatedForm,
            ]);
        }
    }

    const blurHandler = (e, item) => {
        extendFormData(e, item, formData, setFormData);
    }

    const eventsHandler = {
        onBlur: (e, item) => blurHandler(e, item)
    }

    useEffect(() => {
        return () => {
            clearValidationErrors([...formData]);
        }
    });

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add task</ModalHeader>
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

export default AddTaskModal;
