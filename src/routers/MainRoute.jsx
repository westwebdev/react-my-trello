import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../common/Board';
import Home from '../common/Home';
import MyAccount from '../common/MyAccount/pages';
import { mainMenu } from './data/routes';

const MainRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            {
                Object.keys(mainMenu).map((item, i) => {
                    return (
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
