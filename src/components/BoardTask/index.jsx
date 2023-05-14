import { Box, Heading, Text } from '@chakra-ui/react';
import React, { memo, useContext, useEffect, useState } from 'react';
import BoardItemContext from '../../context/boardItemContext';
import useFetch from '../../services/hooks/useFetch';
import useGetUserRole from '../../services/hooks/useGetUserRole';
import RemoveButtonComponent from '../RemoveButtonComponent';
import SpinnerComponent from '../SpinnerComponent';
import TaskStatusSelect from './TaskStatusSelect';

const BoardTask = memo(({task, statusId}) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const {boardId, tasksDispatch } = useContext(BoardItemContext);
    const {isLoading, isError, errorMsg, removeData } = useFetch();
    const [removingData, setRemovingData] = useState({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(isLoading);
            tasksDispatch({'type': 'removeTask', 'taskData': removingData })

            if (isError) {
                console.error(errorMsg)
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isMounted) {
            removeData('removeTask', removingData);
        } else {
          setIsMounted(true);
        }
      }, [removingData]);

    const remove = () => {
        setShowSpinner(true);
        setRemovingData({id: task.id, colId: statusId, boardId});
    }

    const userRole = useGetUserRole();

    return (
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
            <TaskStatusSelect statusId={statusId} task={task} setShowSpinner={setShowSpinner} />
            <Text>
                {task.text}
            </Text>
        </Box>
   );
}, (prevProps, nextProps) => {
    return prevProps.statusId === nextProps.statusId;
})

export default BoardTask;
