import { Modal } from '@chakra-ui/react';
import React from 'react';

const ModalWrapper = ({children, isModalOpen, onModalClose}) => {
    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
            {children}
        </Modal>
    );
}

export default ModalWrapper;