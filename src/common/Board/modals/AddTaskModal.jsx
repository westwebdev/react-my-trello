import React, { useContext, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import TasksContext from '../../../context/tasksContext';
import { newTaskForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import FormWrapper from '../../../components/Forms/FormWrapper';
import { tasksAction } from '../../../provider/tasksProvider';
import SpinnerComponent from '../../../components/SpinnerComponent';
import useFetch from '../../../services/hooks/useFetch';

const AddTaskModal = ({colId, onModalClose}) => {
    const {tasks} = useContext(TasksContext);
    const { addTask } = tasksAction;
    const [formData, setFormData] = useState(newTaskForm);
    const [columnTasks, setColumnTasks] = useState(tasks[colId] || []);
    const [isMounted, setIsMounted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const {isLoading, isError, errorMsg, addData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            addTask({ [colId]: columnTasks });

            onModalClose();

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            addData('addTask', {tasksInCol: { [colId]: columnTasks }});
        } else {
          setIsMounted(true);
        }
      }, [columnTasks]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            setShowSpinner(true);

            const newTask = {
                id: Date.now(),
                title: getFormDataByFieldId(validatedForm, 'taskSubject'),
                text: getFormDataByFieldId(validatedForm, 'taskDescription'),
                status: colId
            }

            setColumnTasks([...columnTasks, newTask]);
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
