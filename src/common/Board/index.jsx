import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { createFilteredTasks } from '../../helpers/tasksHelper';
import BoardCol from '../../components/BoardCol';
import TasksContext from '../../context/tasksContext';
import BoardMenu from './BoardMenu';
import tasksArray from '../../data/tasks';
import taskStatusArray from '../../data/taskStatus';
import GlobalContext from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const Board = () => {
    //this code need to have same object from mock data each time when we open this component, the reason is that here is no API for saving data
    const _tasksArray =  tasksArray.slice().map( obj => ({...obj}) );
    const _taskStatusArray =  taskStatusArray.slice().map( obj => ({...obj}) );

    const {userContextData} = useContext(GlobalContext)
    const navigate = useNavigate();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [tasks, setTasks] = useState(_tasksArray);
    const [changeStatus, setChangeStatus] = useState(false);
    const [tasksStatusState, setTasksStatusState] = useState(_taskStatusArray);

    useEffect(() => {
        if (!userContextData.isLogged) {
            navigate('/myaccount')
        }
    }, [userContextData]);

    useEffect(() => {
        const _filteredTasks = createFilteredTasks(tasks, tasksStatusState);

        setFilteredTasks(_filteredTasks);
    }, [changeStatus, tasks, tasksStatusState]);

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
                        tasksStatusState, setTasksStatusState
                    }
                }
            >
                <BoardMenu />
                <Flex
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    overflowX='auto'
                >
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
};

export default Board;
