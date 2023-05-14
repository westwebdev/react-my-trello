import React, { useContext, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Text } from '@chakra-ui/react';
import { taskStatusForm } from '../../../data/forms';
import formComponentRender from '../../Forms/formComponentRender';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import FormWrapper from '../../Forms/FormWrapper';
import useFetch from '../../../services/hooks/useFetch';
import SpinnerComponent from '../../SpinnerComponent';
import BoardItemContext from '../../../context/boardItemContext';

const AddStatusModal = ({onModalClose}) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [formData, setFormData] = useState(taskStatusForm);
    const [newTaskStatus, setNewTaskStatus] = useState({});
    const [isStatusAlreadyExist, setIsStatusAlreadyExist] = useState(false);
    const {isLoading, isError, errorMsg, addData } = useFetch();
    const { boardId, tasksStatus, taskStatusDispatch } = useContext(BoardItemContext);

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            taskStatusDispatch({'type': 'addStatus', 'boardId': boardId, 'status': newTaskStatus})
            onModalClose();

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (Object.keys(newTaskStatus).length) {
            addData('addTasksStatus', {boardId, status: newTaskStatus});
        }
    }, [newTaskStatus]);

    const checkRepeatingStatus = (id) => {
        return tasksStatus ? tasksStatus.findIndex(item => item.id === id) + 1 : 0;
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
