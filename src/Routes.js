import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from "./displays/favorites";
import Home from "./displays/home";

const RoutePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" exact />
                <Route element={<Favorites />} path="/favorites" />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePage;