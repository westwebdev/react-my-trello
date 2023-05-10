import { Box, Button, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddTaskModal from '../../common/Board/modals/AddTaskModal';

const AddNewTask = ({ colId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = () => {
        onOpen();
    }

    return (
        <>
            <Button onClick={() => openModal()  }
            >
                <Box>Add new task</Box>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <AddTaskModal colId={colId} onModalClose={onClose} />
            </Modal>
        </>
    );
}

export default AddNewTask;
