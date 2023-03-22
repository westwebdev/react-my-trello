import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react';

import Header from '../Header';
import MainRoute from '../Routers/MainRoute';
import theme from '../theme';
import TasksContext from '../../context/tasksContext';
import { createFilteredTasks } from '../../helpers/tasksHelper';
import statusData from '../../data/taskStatus';
import tasksArray from '../../data/tasks';

function App() {
    const [tasks, setTasks] = useState(tasksArray);
    const [changeStatus, setChangeStatus] = useState(false);

    return (
        <ChakraProvider theme={theme}>
            <Header />
            <Container
                p='4'
                maxW='container.xl'
            >
                <TasksContext.Provider value={
                    {tasks, setTasks, changeStatus, setChangeStatus}
                }>
                    <MainRoute />
                </TasksContext.Provider>
            </Container>
        </ChakraProvider>
    );
}

export default App;
