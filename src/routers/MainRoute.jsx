import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../common/Board';
import Home from '../common/Home';
import MyAccount from '../common/MyAccount/pages';
import GlobalContext from '../context/globalContext';
import AuthGuard from '../guards/AuthGuard';
import { mainMenu } from './data/routes';

const MainRoute = () => {
    const { userData } = useContext(GlobalContext);

    useEffect(() => {

    }, [userData])

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            {
                Object.keys(mainMenu).map((item, i) => {
                    // console.log(`ROUTER - ${mainMenu[item].name}:`,  mainMenu[item].isGuarded, userData.isLoggedIn, '-', mainMenu[item].isGuarded && !userData.isLoggedIn)
                    // console.log(`ROUTER - ${mainMenu[item].name} - guardType:`, mainMenu[item].guardType, userData.isLoggedIn, '-', mainMenu[item].guardType === 'login' && userData.isLoggedIn)
                    return (
                        mainMenu[item].isGuarded
                        ?
                            mainMenu[item].guardType === 'login' && userData?.isLoggedIn
                            ?
                            <Route
                                key={i}
                                path={mainMenu[item].path}
                                element={mainMenu[item].component}
                            ></Route>
                            :
                            <Route
                                key={i}
                                path={mainMenu[item].path}
                                element={<AuthGuard element={mainMenu[item].component} />}
                            ></Route>
                        :
                        <Route
                            key={i}
                            path={mainMenu[item].path}
                            element={mainMenu[item].component}
                        ></Route>
                    )   
                })
            }
            <Route path='*' element={<Home />}></Route>
        </Routes>
    );
}

export default MainRoute;

// element={mainMenu[item].isGuarded ? <mainMenu[item].component /> : <AuthGuard element={mainMenu[item].component} />}
// element={mainMenu[item].isGuarded ? <mainMenu[item].component /> : <AuthGuard element={mainMenu[item].component} />}