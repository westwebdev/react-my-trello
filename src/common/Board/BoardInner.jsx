import { Box, Flex, Skeleton } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import BoardCol from '../../components/BoardCol';
import useFetch from '../../services/hooks/useFetch';
import AddNewCol from '../../components/BoardCol/AddNewCol';
import {TasksStatusContext} from '../../context/tasksStatusContext';
import {tasksStatusAction} from '../../provider/tasksStatusProvider';
import { tasksAction } from '../../provider/tasksProvider';

const BoardInner = () => {
    const { data: tasksStatusData, isLoading: isTasksStatusDataLoading, getData: getTasksStatusData } = useFetch();
    const { tasksStatus } = useContext(TasksStatusContext);
    const { setStatuses } = tasksStatusAction;

    const { data: tasksData, isLoading: isTasksDataLoading, getData: getStatusData } = useFetch();
    const { setTask } = tasksAction;

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (!isMounted) {
            getTasksStatusData('getTasksStatus')
            getStatusData('getTasks')
            setIsMounted(true);
        }
      }, [isMounted]);

    useEffect(() => {
        if (tasksStatusData) {
            setStatuses(tasksStatusData)
        }
    }, [isTasksStatusDataLoading]);

    useEffect(() => {
        if (tasksData) {
            setTask(tasksData)
        }
    }, [isTasksDataLoading]);

    return (
        tasksStatus.length === 0
        ?
        <Flex justifyContent='center' alignItems='center'>
            {
                Array.from({ length: 5 }).map((_,i) => {
                    return <Skeleton key={i} height='40px' width='100%' mx='2' />
                })
            }
        </Flex>
        :
        <>
            <Box
                paddingBottom='20px'
                borderBottomWidth='1px'
                borderBottomStyle='solid'
                borderBottomColor='gray.400'
            >
                <Flex
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    overflowX='auto'
                    maxHeight='700px'
                >
                {
                    tasksStatus.map(item => 
                        <BoardCol key={item.id} colItem={item} />
                    )
                }
                    <AddNewCol />
                </Flex>
            </Box>
        </>
    );
};

export default BoardInner;
