import { Box, Heading, Select, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import TasksContext from '../../context/tasksContext';

const BoardItem = ({task}) => {
    const [status, setStatus] = useState(task.status);
    const {tasks, setTasks, changeStatus, setChangeStatus} = useContext(TasksContext);
    const {tasksStatusState} = useContext(TasksContext);

    const changeItemStatus = (e) => {
        let value = e.target.value;

        task.status = value;
        setStatus(value);
        setTasks(tasks);
        setChangeStatus(!changeStatus);
    }

    return (
        <Box bg='white' p='2'>
            <Heading as='h3' size='md'>
                {task.title} (id: {task.id})
            </Heading>
            <Select my='2' value={status} onChange={(e) => changeItemStatus(e, task.id)}>
                {
                    tasksStatusState.map(
                        item => <option key={item.id} value={item.id}>{item.title}</option>
                    )
                }
            </Select>
            <Text>
                {task.text}
            </Text>
        </Box>
   );
}

export default BoardItem;
