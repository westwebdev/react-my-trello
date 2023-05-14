import { Box, Heading, Text } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import SpinnerComponent from '../SpinnerComponent';
import TaskStatusSelect from './TaskStatusSelect';

const BoardItem = memo(({task, statusId}) => {
    const [showSpinner, setShowSpinner] = useState(false)

    return (
        <Box bg='white' p='2' position='relative'>
            {
                showSpinner &&
                <SpinnerComponent />
            }
            <Heading as='h3' size='md'>
                {task.title} (id: {task.id})
            </Heading>
            <TaskStatusSelect statusId={statusId} task={task} setShowSpinner={setShowSpinner} />
            <Text>
                {task.text}
            </Text>
        </Box>
   );
}, (prevProps, nextProps) => {
    return prevProps.statusId === nextProps.statusId;
})

export default BoardItem;
