import { Box, Button, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddTaskModal from './AddTaskModal';

const AddNewTask = ({ colId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = () => {
        onOpen();
    }

    return (
        <>
            <Button onClick={ () => openModal() }>Add new task</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <AddTaskModal colId={colId} onModalClose={onClose} />
            </Modal>
        </>
    );
}

export default AddNewTask;
