import React, { useContext, useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

import TasksContext from '../../../context/tasksContext';
import { taskStatusForm } from '../../../data/forms';
import formRender from '../../../utils/formRender';
import { extendFormData, getFormDataByFieldId, splitFormToBodyAndFooter } from '../../../utils/formUtils';
import { formValidation } from '../../../utils/formValidation';

const AddStatusModal = ({onModalClose}) => {
    const {tasksStatus, setTasksStatus} = useContext(TasksContext);
    const [taskFormData, setTaskStatusData] = useState(taskStatusForm);

    const taskStatusFormBody = splitFormToBodyAndFooter(taskFormData).body;
    const taskStatusFormFooter = splitFormToBodyAndFooter(taskFormData).footer;

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {form, isValid} = formValidation(taskFormData);

        if (isValid) {
            setTasksStatus([
                ...tasksStatus,
                {
                    id: getFormDataByFieldId(taskFormData, 'taskName').toLowerCase(),
                    title: getFormDataByFieldId(taskFormData, 'taskName'),
                    color: getFormDataByFieldId(taskFormData, 'taskColor')
                }
            ])
            onModalClose();
        } else {
            setTaskStatusData([
                ...form
            ])
        }
    }

    const blurHandler = (e, item) => {
        extendFormData(e, item, taskStatusFormBody, taskStatusFormFooter, setTaskStatusData);
    }

    return (
        <>
        {/* <Modal isOpen={isModalOpen} onClose={onModalClose}> */}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new kind of status</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmitForm}>
                    <ModalBody>
                        {
                            formRender(
                                taskStatusFormBody,
                                taskFormData,
                                blurHandler
                            )
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            formRender(taskStatusFormFooter)
                        }
                    </ModalFooter>
                </form>
            </ModalContent>
        {/* </Modal> */}
        </>
    );
}

export default AddStatusModal;