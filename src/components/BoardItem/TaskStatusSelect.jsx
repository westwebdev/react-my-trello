import { Select } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import TasksContext from '../../context/tasksContext';
import TasksStatusContext from '../../context/tasksStatusContext';
import { tasksAction } from '../../provider/tasksProvider';
import useFetch from '../../services/hooks/useFetch';

const TaskStatusSelect = ({statusId, task, setShowSpinner}) => {
    const {tasksStatus} = useContext(TasksStatusContext);
    const { tasks } = useContext(TasksContext);
    const { setTask } = tasksAction;
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
            setTask(tasks);
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
            [statusId]: tasks[statusId],
            [status]: tasks[status]
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
