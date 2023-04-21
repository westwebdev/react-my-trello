import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import GlobalContext from '../../context/globalContext';
import AddStatusModal from './modals/AddStatusModal';
import AddTaskModal from './modals/AddTaskModal';

const BoardMenu = () => {
    const {userContextData} = useContext(GlobalContext)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ modal, setModal ] = useState(React.Fragment);

    const onActiveModal = (modalName, isCreateCol) => {
        if (modalName === 'newStatus') {
            setModal(<AddStatusModal onModalClose={onClose} isCreateCol={isCreateCol} />);
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
                {
                    userContextData.isLogged
                    ?
                    <>
                        {
                            userContextData.role === 'admin' &&
                            (
                                <>
                                    <Box mx='4'>
                                        <Button onClick={() => onActiveModal('newStatus')}>Add Status</Button>
                                    </Box>
                                    <Box mx='4'>
                                        <Button onClick={() => onActiveModal('newStatus', true)}>Add Column</Button>
                                    </Box>
                                </>
                            )
                        }
                        {
                            (userContextData.role === 'admin' || userContextData.role === 'manager') &&
                            (
                                <Box mx='4'>
                                    <Button onClick={() => onActiveModal('newTask')}>Add Task</Button>
                                </Box>
                            )
                        }
                    </>
                    :
                    <></>
                }
            </Flex>

            <ModalWrapper isModalOpen={isOpen} onModalClose={onClose}>
                {modal}
            </ModalWrapper>
        </>
    );
}

export default BoardMenu;