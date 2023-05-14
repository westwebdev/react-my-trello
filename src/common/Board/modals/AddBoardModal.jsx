import React, { useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { newBoardForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import FormWrapper from '../../../components/Forms/FormWrapper';
import SpinnerComponent from '../../../components/SpinnerComponent';
import useFetch from '../../../services/hooks/useFetch';

const AddBoardModal = ({ boardDispatch, onModalClose }) => {
    const [formData, setFormData] = useState(newBoardForm);
    const [newBoard, setNewBoard] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
    const {isLoading, isError, errorMsg, addData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            boardDispatch({'type': 'addBoard', newBoard})
            onModalClose();

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            addData('addBoard', newBoard);
        } else {
          setIsMounted(true);
        }
      }, [newBoard]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            setShowSpinner(true);

            const task = {
                id: `board_${Date.now()}`,
                name: getFormDataByFieldId(validatedForm, 'boardName')
            }

            setNewBoard(task);
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

export default AddBoardModal;
