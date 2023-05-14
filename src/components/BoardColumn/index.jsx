import React, { memo, useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import useFetch from '../../services/hooks/useFetch';
import BoardColInner from './BoardColInner';
import SpinnerComponent from '../SpinnerComponent';
import AddNewTask from '../BoardTask/modals/AddNewTask';
import RemoveButtonComponent from '../RemoveButtonComponent';
import useGetUserRole from '../../services/hooks/useGetUserRole';

const BoardColumn = memo(({ boardId, colItem, taskStatusDispatch }) => {
    const [showSpinner, setShowSpinner] = useState(true)
    const [isEmptyBoard, setIsEmptyBoard] = useState(true);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removingData, setRemovingData] = useState({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            taskStatusDispatch({'type': 'removeStatus', 'statusData': removingData })

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            removeData('removeTasksStatus', removingData);
        } else {
          setIsMounted(true);
        }
      }, [removingData]);

    const remove = () => {
        setShowSpinner(false);
        setRemovingData({boardId, colId: colItem.id})
    }

    const userRole = useGetUserRole();

    return (
        <Box
            position='relative'
            bg={colItem.color}
            p='2'
            mx='2'
            flex='1 1 20%'
            minW='20%'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            {
                !showSpinner &&
                <SpinnerComponent />
            }
            {
                isEmptyBoard && userRole === 'admin' && 
                <RemoveButtonComponent remove={remove} />
            }
            <Box
                textAlign='center'
            >
                <Heading
                    as='h2'
                    mb='4'
                    textAlign='center'
                >
                    {
                        colItem.title
                    }
                </Heading>
                {
                    <>
                        {
                            (userRole === 'admin' || userRole === 'manager') &&
                            <AddNewTask colId={colItem.id} />
                        }
                        <BoardColInner colId={colItem.id} setIsEmptyBoard={setIsEmptyBoard} />  
                    </>
                }

            </Box>
        </Box>
    );
}, (prevProps, currentProps) => {
    return prevProps.colItem.id === currentProps.colItem.id
})

export default BoardColumn;
