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

const AddStatusModal = ({isModalOpen, onModalClose}) => {
    const {tasksStatus, setTasksStatus} = useContext(TasksContext);
    const [taskFormData, setTaskFormData] = useState({});

    const taskStatusFormBody = taskStatusForm.filter(item => item.type !== 'submit');
    const taskStatusFormFooter = taskStatusForm.filter(item => item.type === 'submit');

    const onSubmitForm = (e) => {
        e.preventDefault();

        setTasksStatus([
            ...tasksStatus,
            {
                id: taskFormData.taskName.toLowerCase(),
                title: taskFormData.taskName,
                color: taskFormData.taskColor
            }
        ])
        setTaskFormData('');
        onModalClose();
    }

    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new kind of status</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmitForm}>
                    <ModalBody>
                        {
                            formRender(taskStatusFormBody, taskFormData, setTaskFormData)
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            formRender(taskStatusFormFooter)
                        }
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default AddStatusModal;