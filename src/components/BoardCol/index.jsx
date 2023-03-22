import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

import BoardItem from '../BoardItem';
import statusData from '../../data/taskStatus';

const BoardCol = ({tasks, title}) => {
    return (
        <Box
            bg='gray.100'
            p='2'
            mx='2'
            flexBasis={() => {return `${100 / statusData.length}%`} }
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