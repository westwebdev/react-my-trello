import { Box, Button, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddStatusModal from './AddStatusModal';

const AddNewCol = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = () => {
        onOpen();
    }

    return (
        <>
            <Button 
                bg='gray.200'
                p='2'
                mx='2'
                mt='10px'
                flex='1 0 10%'
                maxW='10%'
                height='75px'
                display='flex'
                flexDirection='column'
                alignItems='center'
                onClick={() => openModal()  }
            >
                <Box>+</Box>
                <Box>Add new col</Box>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <AddStatusModal onModalClose={onClose} />
            </Modal>
        </>
    );
}

export default AddNewCol;
