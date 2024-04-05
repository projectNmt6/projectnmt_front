import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ReviewPage from '../pages/ReviewPage/ReviewPage';


function AuthRoute(props) {
    return (
        <Routes>
            <Route path='/signup' element={ <SignUpPage /> }/>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/write" element={<DonationPageboard />} />
            <Route path="/main/review" element={< ReviewPage/>} />
        </Routes> 
    );
}

export default AuthRoute;