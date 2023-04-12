import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { createFilteredTasks } from '../../helpers/tasksHelper';
import BoardCol from '../BoardCol';
import TasksContext from '../../context/tasksContext';
import BoardMenu from './BoardMenu';
import tasksArray from '../../data/tasks';
import statusData from '../../data/taskStatus';

const Board = () => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [tasks, setTasks] = useState(tasksArray);
    const [changeStatus, setChangeStatus] = useState(false);
    const [tasksStatus, setTasksStatus] = useState(statusData);

    useEffect(() => {
        const _filteredTasks = createFilteredTasks(tasks, tasksStatus);

        setFilteredTasks(_filteredTasks);
    }, [changeStatus, tasks]);

    return (
        tasks.length === 0
        ?
        <Flex justifyContent='center' alignItems='center'>
            Empty Board
        </Flex>
        :
        <>
            <TasksContext.Provider
                value={
                    {
                        tasks, setTasks,
                        changeStatus, setChangeStatus,
                        tasksStatus, setTasksStatus
                    }
                }
            >
                <BoardMenu />
                <Flex justifyContent='flex-start' alignItems='flex-start'>
                    {
                        filteredTasks.map(item => 
                            <BoardCol
                                key={item.id}
                                tasks={item.tasks}
                                title={item.title}
                                colId={item.id}
                            />
                        )
                    }
                </Flex>
            </TasksContext.Provider>
        </>
    );
}

export default Board;