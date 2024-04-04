import React from 'react';
import SignInPage from '../pages/SignInPage/SignInPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { Route, Routes } from "react-router-dom";
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";

function AuthRoute(props) {
    return (
        <Routes>
            <Route path='/signin' element={ <SignInPage /> }/>
            <Route path='/signup' element={ <SignUpPage /> }/>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/write" element={<DonationPageboard />} />
        </Routes> 
    );
}

export default AuthRoute;