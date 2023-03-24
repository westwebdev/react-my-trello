import React, { useContext, useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Lorem,
    FormControl,
    FormLabel,
    Input,
    Select
} from '@chakra-ui/react';
import { colorsForTaskKind } from '../../../data/colors';
import TasksContext from '../../../context/tasksContext';
import { taskStatusForm } from '../../../data/forms';
import formRender from '../../../utils/formRender';

const AddStatusModal = ({isModalOpen, onModalClose}) => {
    // const {tasksStatus, setTasksStatus} = useContext(TasksContext);
    const [taskFormData, setTaskFormData] = useState(null);

    const taskStatusFormBody = taskStatusForm.filter(item => item.type !== 'submit');
    const taskStatusFormFooter = taskStatusForm.filter(item => item.type === 'submit');

    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new kind of status</ModalHeader>
                <ModalCloseButton />
                <form>
                    <ModalBody>
                        {
                            formRender(taskStatusFormBody)
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