import React from 'react';
import { Box, Flex, Link, MenuItem, MenuList } from '@chakra-ui/react';
import ColorModeSwitcher from '../ColorSwitcher/ColorModeSwitcher';
import Logo from '../Logo';
import { NavLink as RoutLink } from 'react-router-dom';
import { mainMenu } from '../../routers/data/routes';

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
            <Flex mx='2'>
                {
                    Object.keys(mainMenu).map(item => {
                        return(
                            <Box
                                p='2'
                                key={mainMenu[item].name}
                            >
                                <Link
                                    as={RoutLink}
                                    to={mainMenu[item].path}
                                >
                                    {mainMenu[item].name}
                                </Link>
                            </Box>
                        )
                    })
                }
            </Flex>
            <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
    );
};

export default Header;