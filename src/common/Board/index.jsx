import { Box } from '@chakra-ui/react';
import React, { useEffect, useReducer, useState } from 'react';
import AddNewBoard from './modals/AddNewBoard';
import SpinnerComponent from '../../components/SpinnerComponent';
import BoardItemContext from '../../context/boardItemContext';
import { boardInitialState, boardReducer } from '../../reducers/boardReducer';
import { statusInitialState, statusReducer } from '../../reducers/statusReducer';
import { tasksInitialState, tasksReducer } from '../../reducers/taskReducer';
import useFetch from '../../services/hooks/useFetch';
import BoardInner from './BoardInner';
import useGetUserRole from '../../services/hooks/useGetUserRole';

const Board = () => {
    const [showSpinner, setShowSpinner] = useState(false)
    const { data: tasksStatusData, isLoading: isTasksStatusDataLoading, getData: getTasksStatusData } = useFetch();
    const [tasksStatus, taskStatusDispatch] = useReducer(statusReducer, statusInitialState);
    const { data: tasksData, isLoading: isTasksDataLoading, getData: getTasksData } = useFetch();
    const [tasks, tasksDispatch] = useReducer(tasksReducer, tasksInitialState);
    const { data: boardData, isLoading: isBoardDataLoading, getData: getBoardData } = useFetch();
    const [boards, boardDispatch] = useReducer(boardReducer, boardInitialState);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            getBoardData('getBoards');
            getTasksStatusData('getTasksStatus');
            getTasksData('getTasks');
            setIsMounted(true);
        }
      }, [isMounted]);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ tasksStatusData:")
        if (boardData) {
            boardDispatch({'type': 'setBoards', 'boards': boardData});
        }
    }, [isBoardDataLoading]);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ tasksStatusData:")
        if (tasksStatusData) {
            taskStatusDispatch({'type': 'setStatuses', 'statuses': tasksStatusData});
        }
    }, [isTasksStatusDataLoading]);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ tasksData:")
        if (tasksData) {
            tasksDispatch({'type': 'setTasks', 'tasks': tasksData});
        }
    }, [isTasksDataLoading]);

    const userRole = useGetUserRole();

    return (
        <>
            {
                showSpinner &&
                <SpinnerComponent />
            }
            {
                (userRole === 'admin' || userRole === 'manager') &&
                <Box py='2' mb='10px'>
                    <AddNewBoard boardDispatch={boardDispatch} />
                </Box>
            }
            {
                boards.map(({ id, name }) => (
                    <BoardItemContext.Provider
                        key={id}
                        value={{
                            'boardId': id,
                            'tasksStatus': tasksStatus[id] || [],
                            'tasks': tasks[id] || {},
                            taskStatusDispatch,
                            tasksDispatch
                        }}
                    >
                        <BoardInner boardName={name} boardDispatch={boardDispatch} setShowSpinner={setShowSpinner} />
                    </BoardItemContext.Provider>
                ))
            }
        </>
    );
}

export default Board;
