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
            </TasksContextProvider>
        </TasksStatusContextProvider>
        
    );
}

export default Board;
