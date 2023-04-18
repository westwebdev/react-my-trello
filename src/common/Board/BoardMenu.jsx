import { Box, Button, Flex, Grid, Link, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink as RoutLink } from 'react-router-dom';
import ModalWrapper from '../../components/ModalWrapper';
import AddStatusModal from './modals/AddStatusModal';
import AddTaskModal from './modals/AddTaskModal';

const BoardMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ modal, setModal ] = useState(React.Fragment);

    const onActiveModal = (modalName) => {
        if (modalName === 'newStatus') {
            setModal(<AddStatusModal onModalClose={onClose} />);
        } else if (modalName === 'newTask') {
            setModal(<AddTaskModal onModalClose={onClose} />);
        }

        onOpen();
    }

    return (
        <>
            <Flex
                justifyContent='center'
                py='4'
                mb='4'
                borderBottom='1px solid gray'
            >
                <Box mx='4'>
                    <Button onClick={() => onActiveModal('newStatus')}>Add Status</Button>
                </Box>
                <Box mx='4'>
                    <Button onClick={() => onActiveModal('newTask')}>Add Task</Button>
                </Box>
            </Flex>

            <ModalWrapper isModalOpen={isOpen} onModalClose={onClose}>
                {modal}
            </ModalWrapper>
        </>
    );
}

export default BoardMenu;