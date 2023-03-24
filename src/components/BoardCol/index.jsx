import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

import BoardItem from '../BoardItem';
import statusData from '../../data/taskStatus';

const BoardCol = ({tasks, title, colId}) => {
    const columnBg = () => {
        let color;

        switch (colId) {
            case 'inProcess':
                color = 'yellow.300'
                break;
            case 'testing':
                color = 'orange.300'
                break;
            case 'done':
                color = 'green.300'
                break;
            default:
                color = 'gray.100'
                break;
        }

        return color;
    }

    return (
        <Box
            bg={() => columnBg()}
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