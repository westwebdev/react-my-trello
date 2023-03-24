import { Box, Heading, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';

import BoardItem from '../BoardItem';
import statusData from '../../data/taskStatus';
import TasksContext from '../../context/tasksContext';

const BoardCol = ({tasks, title, colId}) => {
    const {tasksStatus, setTasksStatus} = useContext(TasksContext);

    const columnBg = () => {
        let color;
        const taskStatus = tasksStatus.filter(item => item.id === colId);
        if (taskStatus.length && taskStatus[0].color) {
            color = taskStatus[0].color;
        } else {
            switch (colId) {
                case 'inProcess':
                    color = 'yellow.300'
                    break;
                case 'testing':
                    color = 'orange.300'
                    break;
                case 'done':
                    color = 'green.300'
                    break;
                default:
                    color = 'gray.100'
                    break;
            }
        }

        return color;
    }

    return (
        <Box
            bg={() => columnBg()}
            p='2'
            mx='2'
            flexBasis={() => {return `${100 / statusData.length}%`} }
        >
            <Heading
                as='h2'
                mb='4'
                textAlign='center'
            >
                { title }
            </Heading>
            <VStack>
                {
                    tasks.map(item => <BoardItem key={item.id} task={item}/>)
                }
            </VStack>
        </Box>
    );
}

export default BoardCol;