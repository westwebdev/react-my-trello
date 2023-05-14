import React, { useContext, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { newTaskForm } from '../../../data/forms';
import formComponentRender from '../../Forms/formComponentRender';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import FormWrapper from '../../Forms/FormWrapper';
import SpinnerComponent from '../../SpinnerComponent';
import useFetch from '../../../services/hooks/useFetch';
import BoardItemContext from '../../../context/boardItemContext';

const AddTaskModal = ({colId, onModalClose}) => {
    const [formData, setFormData] = useState(newTaskForm);
    const [newTask, setNewTask] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const {isLoading, isError, errorMsg, addData } = useFetch();
    const { boardId, tasksDispatch } = useContext(BoardItemContext);

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            tasksDispatch({'type': 'addTask', 'boardId': boardId, 'colId': colId, 'task': newTask })
            onModalClose();

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            addData('addTask', {boardId, colId, task:  newTask });
        } else {
          setIsMounted(true);
        }
      }, [newTask]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            setShowSpinner(true);

            const task = {
                id: Date.now(),
                title: getFormDataByFieldId(validatedForm, 'taskSubject'),
                text: getFormDataByFieldId(validatedForm, 'taskDescription'),
                status: colId
            }

            setNewTask(task);
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
            clearValidationErrors([...formData])
        }
    });

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                {
                    showSpinner &&
                    <SpinnerComponent />
                }
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
