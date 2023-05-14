import React from 'react';

import { TasksStatusContextProvider } from '../../provider/tasksStatusProvider';
import { TasksContextProvider } from '../../provider/tasksProvider';
import BoardInner from './BoardInner';
import { Box, Button } from '@chakra-ui/react';

const Board = () => {
    return (
        <TasksStatusContextProvider>
            <TasksContextProvider>
                <BoardInner />
                <Box py='2'>
                    <Button width='100%'>Add New Board</Button>
                </Box>
            </TasksContextProvider>
        </TasksStatusContextProvider>
        
    );
}

export default Board;
