import { Box, Heading, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import BoardItem from '../BoardItem';
import TasksContext from '../../context/tasksContext';

const BoardCol = ({tasks, title, colId}) => {
    const {tasksStatusState} = useContext(TasksContext);

    const columnBg = () => {
        let color;
        const taskStatus = tasksStatusState.filter(item => item.id === colId);

        if (taskStatus.length && taskStatus[0].color) {
            color = taskStatus[0].color;
        }

        return color;
    }

    return (
        <Box
            bg={() => columnBg()}
            p='2'
            mx='2'
            flex='1 0 20%'
            maxW='20%'
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
