import { Box, Button, Flex, Grid, Link, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RoutLink } from 'react-router-dom';
import AddStatusModal from './modals/AddStatusModal';

const BoardMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                justifyContent='center'
                py='4'
                mb='4'
                borderBottom='1px solid gray'
            >
                <Box mx='4'>
                    <Button onClick={onOpen}>Add Status</Button>
                </Box>
                <Box mx='4'>
                    <Link as={RoutLink} variant='asButton'>
                        Add Task
                    </Link>
                </Box>
            </Flex>

            <AddStatusModal isModalOpen={isOpen} onModalClose={onClose} />
        </>
    );
}

export default BoardMenu;