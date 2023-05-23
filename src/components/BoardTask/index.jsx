import { Box, Heading, Text } from '@chakra-ui/react';
import React, { memo, useContext, useEffect, useState } from 'react';
import BoardItemContext from '../../context/boardItemContext';
import useFetch from '../../services/hooks/useFetch';
import useGetUserRole from '../../services/hooks/useGetUserRole';
import AnimatedBox from '../AnimatedBlock';
import RemoveButtonComponent from '../RemoveButtonComponent';
import SpinnerComponent from '../SpinnerComponent';
import TaskStatusSelect from './TaskStatusSelect';

const BoardTask = memo(({task, statusId}) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const {boardId, tasksDispatch } = useContext(BoardItemContext);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removingData, setRemovingData] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

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
            removeData('removeTask', removingData);
        } else {
          setIsMounted(true);
        }
    }, [removingData]);

    useEffect(() => {
        if (!isMounted && isAnimationComplete) {
            setShowSpinner(isLoading);
        }
    }, [isAnimationComplete, isMounted]);

    useEffect(() => {
        if (isChanging) {
            setIsMounted(false);
        }
    }, [isChanging]);

    const remove = () => {
        setShowSpinner(true);
        setRemovingData({id: task.id, colId: statusId, boardId});
    };

    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);

        if (!isChanging) {
            tasksDispatch({'type': 'removeTask', 'taskData': removingData })
        } else {
            setIsChanged(true);
        }
    };

    const userRole = useGetUserRole();
    const variants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' }
      };

    return (
        <AnimatedBox
            width='100%'
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration: 0.25,
                ease: "linear"
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <Box width='100%' bg='white' p='20px' position='relative'>
                {
                    userRole === 'admin' && 
                    <RemoveButtonComponent remove={remove} />
                }
                {
                    showSpinner &&
                    <SpinnerComponent />
                }
                <Heading as='h3' size='md' wordBreak='break-all'>
                    {task.title} <br /> (id: {task.id})
                </Heading>
                <TaskStatusSelect
                    statusId={statusId}
                    task={task}
                    setShowSpinner={setShowSpinner}
                    isChanged={isChanged}
                    setIsChanging={setIsChanging}
                />
                <Text wordBreak='break-all'>
                    {task.text}
                </Text>
            </Box>
        </AnimatedBox>
   );
}, (prevProps, nextProps) => {
    return prevProps.statusId === nextProps.statusId;
})

export default BoardTask;
