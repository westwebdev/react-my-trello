import React, { useContext, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text } from '@chakra-ui/react';
import { taskStatusForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import FormWrapper from '../../../components/Forms/FormWrapper';
import { tasksStatusAction } from '../../../provider/tasksStatusProvider';
import useFetch from '../../../services/hooks/useFetch';
import SpinnerComponent from '../../../components/SpinnerComponent';
import TasksStatusContext from '../../../context/tasksStatusContext';

const AddStatusModal = ({onModalClose}) => {
    const { tasksStatus } = useContext(TasksStatusContext);
    const [showSpinner, setShowSpinner] = useState(false)
    const [formData, setFormData] = useState(taskStatusForm);
    const [newTaskStatus, setNewTaskStatus] = useState({});
    const [isStatusAlreadyExist, setIsStatusAlreadyExist] = useState(false);
    const {isLoading, isError, errorMsg, addData } = useFetch();
    const { addStatus } = tasksStatusAction;

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            addStatus(newTaskStatus)
            onModalClose();

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (Object.keys(newTaskStatus).length) {
            addData('addTasksStatus', {status: newTaskStatus});
        }
    }, [newTaskStatus]);

    const checkRepeatingStatus = (id) => {
        return tasksStatus.findIndex(item => item.id === id) + 1
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            const id = getFormDataByFieldId(validatedForm, 'taskStatusName').replace(' ', '_').toLowerCase();

            const statusAlreadyExist = checkRepeatingStatus(id);

            if (!statusAlreadyExist) {
                setShowSpinner(true);

                const newTaskStatus = {
                    id,
                    title: getFormDataByFieldId(validatedForm, 'taskStatusName'),
                    color: getFormDataByFieldId(validatedForm, 'taskStatusColor')
                };

                setNewTaskStatus(newTaskStatus);
            } else {
                setIsStatusAlreadyExist(true)
            }

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

    useEffect(() => {
        return () => {
            clearValidationErrors([...formData]);
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
                <ModalHeader>Add new column</ModalHeader>
                <ModalCloseButton />
                {
                    isStatusAlreadyExist &&
                    <Text align='center' color='red.500'>This column name has already used</Text>
                }
                <FormWrapper
                    isModalForm={true}
                    submitHandler={onSubmitForm}
                    formComponent={
                        formComponentRender({
                            formObject: formData,
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
