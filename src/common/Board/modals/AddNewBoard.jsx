import { Box, Button, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddBoardModal from './AddBoardModal';

const AddNewBoard = ({ boardDispatch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = () => {
        onOpen();
    }

    return (
        <>
            <Button width='100%' onClick={ () => openModal() }>Add New Board</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <AddBoardModal boardDispatch={boardDispatch} onModalClose={onClose} />
            </Modal>
        </>
    );
}

export default AddNewBoard;
