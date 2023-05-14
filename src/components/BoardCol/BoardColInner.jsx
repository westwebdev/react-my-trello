import { VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import TasksContext from '../../context/tasksContext';
import BoardItem from '../BoardItem';

const BoardColInner = ({ colId, setIsEmptyBoard }) => {
    const { tasks } = useContext(TasksContext);
    const [tasksInCol, setTasksInCol] = useState(tasks[colId] || []);

    useEffect(() => {
        if (tasks[colId]) {
            setTasksInCol(tasks[colId]);
            setIsEmptyBoard(false);
            console.log("🚀 ~ BoardColInner ~ setIsEmptyBoard:", colId)
        }
        if (!tasks[colId]?.length) {
            setIsEmptyBoard(true);
        }
    }, [tasks])

    return (
        <VStack mt='4'>
            {
                tasksInCol?.length
                &&
                tasksInCol.map(item => 
                    <BoardItem
                        key={item.id}
                        task={item}
                        statusId={colId}
                    />
                )
            }
        </VStack>
    );
}

export default BoardColInner;
