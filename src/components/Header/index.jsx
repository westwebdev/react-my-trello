import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import ColorModeSwitcher from '../ColorSwitcher/ColorModeSwitcher';
import Logo from '../Logo';
import { NavLink as RoutLink } from 'react-router-dom';

const Header = () => {
    return (
        <Flex
            justifyContent='space-between'
            alignItems='center'
            px='4'
            py='6'
            bg='gray.100'
        >
            <RoutLink to='/'>
                <Logo />
            </RoutLink>
            <Box mr='auto' ml='2'>
                <Link as={RoutLink} to='/board'>Board</Link>
            </Box>
            <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
    );
};

export default Header;