import { Select } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import BoardItemContext from '../../context/boardItemContext';
import useFetch from '../../services/hooks/useFetch';

const TaskStatusSelect = ({statusId, task, setShowSpinner}) => {
    const {boardId, tasks, tasksStatus, tasksDispatch} = useContext(BoardItemContext);
    const {isLoading, updateData } = useFetch();

    const [changedData, setChangedData] = useState({});

    useEffect(() => {
        if (Object.keys(changedData).length) {
            updateData('changeTasksStatus', changedData);
        }
    }, [changedData])

    useEffect(() => {
        if (!isLoading) {
            setShowSpinner(true)
            tasksDispatch({'type': 'changeTaskStatus', 'data': changedData})
        }
    }, [isLoading])

    const changeItemStatus = (e) => {
        let status = e.target.value;

        const currentTasksCol = tasks[statusId].filter(item => item.id !== task.id);
        tasks[statusId] = currentTasksCol;

        if (tasks[status] && tasks[status].length) {
            tasks[status] = [...tasks[status], task]
        } else {
            tasks[status] = [task];
        }

        setShowSpinner(true)
        setChangedData({
            boardId,
            columns: {
                [statusId]: tasks[statusId],
                [status]: tasks[status]
            }
        })
    }

    return (
        <Select my='2' value={statusId} onChange={(e) => changeItemStatus(e, task.id)}>
            {
                tasksStatus.map(
                    item => <option key={item.id} value={item.id}>{item.title}</option>
                )
            }
        </Select>
    );
}

export default TaskStatusSelect;
