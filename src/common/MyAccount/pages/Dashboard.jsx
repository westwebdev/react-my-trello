import { Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RoutLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Flex justifyContent='center' alignItems='center'>
            This page is in progress now... please go to the
            <Link
                as={RoutLink}
                to='/board'
                textDecoration='underline'
            > Board page </Link>
        </Flex>
    );
}

export default Dashboard;
