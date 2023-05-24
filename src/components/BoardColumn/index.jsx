import React, { memo, useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import useFetch from '../../services/hooks/useFetch';
import BoardColInner from './BoardColInner';
import SpinnerComponent from '../SpinnerComponent';
import AddNewTask from '../BoardTask/modals/AddNewTask';
import RemoveButtonComponent from '../RemoveButtonComponent';
import useGetUserRole from '../../services/hooks/useGetUserRole';
import AnimatedBox from '../AnimatedBlock';

const BoardColumn = memo(({ boardId, colItem, taskStatusDispatch }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [isEmptyBoard, setIsEmptyBoard] = useState(true);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removingData, setRemovingData] = useState({});
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isLoading && !isError) {
            setIsMounted(false);
        }

        if (isError) {
            console.error(errorMsg)
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            removeData('removeTasksStatus', removingData);
        } else {
          setIsMounted(true);
        }
    }, [removingData]);

    useEffect(() => {
        if (!isMounted && isAnimationComplete) {
            setShowSpinner(isLoading);
        }
    }, [isAnimationComplete, isMounted]);

    const remove = () => {
        setShowSpinner(true);
        setRemovingData({boardId, colId: colItem.id})
    }

    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);
        taskStatusDispatch({'type': 'removeStatus', 'statusData': removingData })
    };

    const userRole = useGetUserRole();
    const variants = {
        hidden: { maxWidth: 0},
        visible: { maxWidth: '23%'}
    };

    return (
        <AnimatedBox
            flex='1 0 23%'
            maxW='23%'
            py='2'
            overflowX='hidden'
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration: 0.25,
                ease: "linear"
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <Box
                position='relative'
                bg={colItem.color}
                p='2'
                mx='2'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                {
                    showSpinner &&
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
        </AnimatedBox>
    );
}, (prevProps, currentProps) => {
    return prevProps.colItem.id === currentProps.colItem.id
})

export default BoardColumn;
