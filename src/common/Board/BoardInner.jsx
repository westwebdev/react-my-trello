import { Box, Button, Flex, Heading, Skeleton } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import BoardColumn from '../../components/BoardColumn';
import useFetch from '../../services/hooks/useFetch';
import AddNewCol from '../../components/BoardColumn/modals/AddNewCol';
import BoardItemContext from '../../context/boardItemContext';
import RemoveButtonComponent from '../../components/RemoveButtonComponent';
import useGetUserRole from '../../services/hooks/useGetUserRole';

const BoardInner = ({ boardName, boardDispatch, setShowSpinner }) => {
    const { boardId, tasksStatus, taskStatusDispatch } = useContext(BoardItemContext);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removeObj, setRemoveObj] = useState({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            boardDispatch({'type': 'removeBoard', board: removeObj})

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            removeData('removeBoard', {'board': removeObj});
        } else {
          setIsMounted(true);
        }
      }, [removeObj]);

    const remove = () => {
        setShowSpinner(true);
        setRemoveObj({'id': boardId})
    }

    const userRole = useGetUserRole();

    return (
        <Box
            pos='relative'
            width='100%'
            borderTopWidth='1px'
            borderTopStyle='solid'
            borderTopColor='gray.400'
        >
            <Heading textAlign='center' pt='20px'>{boardName}</Heading>
            {
                !tasksStatus || !tasksStatus?.length && userRole === 'admin' &&
                <RemoveButtonComponent remove={remove} />
            }
            <Flex
                paddingY='20px'
            >
                {
                    !tasksStatus
                    ?
                    <Flex justifyContent='center' alignItems='center'>
                        {
                            Array.from({ length: 4 }).map((_,i) => {
                                return <Skeleton key={i} height='40px' width='100%' mx='2' />
                            })
                        }
                    </Flex>
                    :
                    <Box
                        flex='0 1 auto'
                        overflowX='auto'
                    >
                        <Flex
                            justifyContent='flex-start'
                            alignItems='flex-start'
                            overflowX='auto'
                            maxHeight='700px'
                            pt='10px'
                        >
                            {
                                tasksStatus.map(item => 
                                    <BoardColumn
                                        key={item.id}
                                        boardId={boardId}
                                        colItem={item}
                                        taskStatusDispatch={taskStatusDispatch}
                                    />
                                )
                            }
                        </Flex>
                    </Box>
                }
                {
                    (userRole === 'admin' || userRole === 'manager') &&
                    <AddNewCol />
                }
            </Flex>
        </Box>
    );
};

export default BoardInner;
