import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import Logo from '../Logo';
import { NavLink as RoutLink } from 'react-router-dom';
import { mainMenu } from '../../routers/data/routes';
import GlobalContext from '../../context/globalContext';
import useFetch from '../../services/hooks/useFetch';

const Header = () => {
    const {userData, setUserData} = useContext(GlobalContext);
    const [unLoggedUser, setUnLoggedUser] = useState({isLoggedIn: false,role: ""})
    const { data, isLoading, updateData } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            sessionStorage.removeItem('user');
            setUserData(unLoggedUser)
        }
    }, [isLoading])

    const logOut = () => {
        updateData('logOutUser', unLoggedUser);
        // setUserData({
        //     ...userData,
        //     isLoggedIn: false
        // })
    }

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
            <Flex mx='2' ml='auto' mr='auto'>
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
            {
                userData?.isLoggedIn
                ?
                <Button onClick={() => logOut()}>
                    Loguot
                </Button>
                :
                <></>
            }
        </Flex>
    );
};

export default Header;
