import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { createFilteredTasks } from '../../helpers/tasksHelper';
import BoardCol from '../BoardCol';
import TasksContext from '../../context/tasksContext';

const Board = () => {
    const {tasks, changeStatus} = useContext(TasksContext);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const _filteredTasks = createFilteredTasks(tasks);

        setFilteredTasks(_filteredTasks);
    }, [changeStatus]);

    return (
        tasks.length === 0
        ?
        <Flex justifyContent='center' alignItems='center'>
            Empty Board
        </Flex>
        :
        <Flex justifyContent='flex-start' alignItems='flex-start'>
            {
                filteredTasks.map(item => 
                    <BoardCol
                        key={item.id}
                        tasks={item.tasks}
                        title={item.title}
                    />
                )
            }
        </Flex>
    );
}

export default Board;