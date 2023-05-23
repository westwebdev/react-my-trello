import { VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import BoardItemContext from '../../context/boardItemContext';
import BoardTask from '../BoardTask';

const BoardColInner = ({ colId, setIsEmptyBoard }) => {
    const { tasks } = useContext(BoardItemContext);
    const [tasksInCol, setTasksInCol] = useState([]);

    useEffect(() => {
        if (tasks) {
            const tasksArray = tasks[colId] || [];

            setTasksInCol(tasksArray);

            if (tasksArray.length) {
                setIsEmptyBoard(false);
            } else {
                setIsEmptyBoard(true);
            }
        }
    }, [tasks]);

    return (
        <VStack
            mt='4'
        >
            {
                tasksInCol?.length
                &&
                tasksInCol.map(item => 
                    <BoardTask
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
