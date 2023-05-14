import React, { memo, useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { tasksStatusAction } from '../../provider/tasksStatusProvider';
import useFetch from '../../services/hooks/useFetch';
import BoardColInner from './BoardColInner';
import SpinnerComponent from '../SpinnerComponent';
import AddNewTask from '../BoardItem/AddNewTask';

const BoardCol = memo(({colItem}) => {
    const { removeStatus } = tasksStatusAction;
    const [showSpinner, setShowSpinner] = useState(true)
    const [isEmptyBoard, setIsEmptyBoard] = useState(true);
    const {isLoading, isError, errorMsg, removeData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            removeStatus(colItem.id);

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    const remove = () => {
        setShowSpinner(false);
        removeData('removeTasksStatus',{id: colItem.id});
    }

    return (
        <Box
            position='relative'
            bg={colItem.color}
            p='2'
            mx='2'
            flex='1 0 20%'
            maxW='20%'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            {
                !showSpinner &&
                <SpinnerComponent />
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
                        <AddNewTask colId={colItem.id} />
                        <BoardColInner colId={colItem.id} setIsEmptyBoard={setIsEmptyBoard} />
                        {
                            isEmptyBoard
                            &&
                            <Button onClick={() => remove()}>
                                Remove Column
                            </Button>
                        }
                    </>
                }

            </Box>
        </Box>
    );
}, (prevProps, currentProps) => {
    return prevProps.colItem.id === currentProps.colItem.id
})

export default BoardCol;
