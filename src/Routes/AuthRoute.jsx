import React from 'react';
import { Route, Routes } from "react-router-dom";
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import AuthPage from '../pages/AuthPage/AuthPage';
import DonatorInfo from '../pages/DonatorInfo/DonatorInfo';
import MyPage from '../pages/MyPage/MyPage';
import UserInfoEditPage from '../pages/UserInfoEditPage/UserInfoEditPage';

function AuthRoute(props) {
    return (
        <Routes>
            <Route path='/auth/*' element={ <AuthPage /> } />
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/write" element={<DonationPageboard />} />
            <Route path='/test' element={<DonatorInfo />} />
            <Route path='/account/mypage' element={<MyPage />} />
            <Route path='/account/mypage/edit' element={<UserInfoEditPage />} />            
        </Routes> 
    );
}

export default AuthRoute;