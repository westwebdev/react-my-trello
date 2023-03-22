import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../Board';
import Home from '../Home';

const MainRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/board' element={<Board />}></Route>
            <Route path='*' element={<Home />}></Route>
        </Routes>
    );
}

export default MainRoute;