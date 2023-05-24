import { Box, Button, Flex, Heading, Skeleton } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import BoardColumn from '../../components/BoardColumn';
import useFetch from '../../services/hooks/useFetch';
import AddNewCol from '../../components/BoardColumn/modals/AddNewCol';
import BoardItemContext from '../../context/boardItemContext';
import RemoveButtonComponent from '../../components/RemoveButtonComponent';
import useGetUserRole from '../../services/hooks/useGetUserRole';
import AnimatedBox from '../../components/AnimatedBlock';
import SpinnerComponent from '../../components/SpinnerComponent';

const BoardInner = ({ boardName, boardDispatch }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const { boardId, tasksStatus, taskStatusDispatch } = useContext(BoardItemContext);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removeObj, setRemoveObj] = useState({});
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
            removeData('removeBoard', {'board': removeObj});
        } else {
          setIsMounted(true);
        }
    }, [removeObj]);

    useEffect(() => {
        if (!isMounted && isAnimationComplete) {
            setShowSpinner(isLoading);
        }
    }, [isAnimationComplete, isMounted]);

    const remove = () => {
        setShowSpinner(true);
        setRemoveObj({'id': boardId})
    }

    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);
        boardDispatch({'type': 'removeBoard', board: removeObj})
    };

    const userRole = useGetUserRole();
    const variants = {
        hidden: { height: 0 },
        visible: { height: 'auto' }
    };

    return (
        <AnimatedBox
            overflow='hidden'
            initial='hidden'
            animate={isMounted ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <Box
                pos='relative'
                width='100%'
                borderTopWidth='1px'
                borderTopStyle='solid'
                borderTopColor='gray.400'
                p='10px'
            >
                {
                    showSpinner &&
                    <SpinnerComponent />
                }
                <Heading textAlign='center' pt='20px'>{boardName}</Heading>
                {
                    !tasksStatus || !tasksStatus?.length && userRole === 'admin' &&
                    <RemoveButtonComponent remove={remove} />
                }
                <Flex
                    paddingY='20px'
                    w='100%'
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
                            flex='1 0 100%'
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
                                {
                                    (userRole === 'admin' || userRole === 'manager') &&
                                    <AddNewCol />
                                }
                            </Flex>
                        </Box>
                    }
                </Flex>
            </Box>
        </AnimatedBox>
    );
};

export default BoardInner;
