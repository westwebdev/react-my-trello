import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../common/Home';
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
