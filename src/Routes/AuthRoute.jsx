import React from 'react';
import { Route, Routes } from 'react-router';
import DonationPageboard2 from '../pages/DonationUpdatePage/DonationPageboard2';
import DonationStoryPage from '../pages/DonationStoryPage/DonationStoryPage';
import HomePage from '../pages/HomePage'
import ReviewPage from '../pages/ReviewPage/ReviewPage'
import DonationPageboard from '../pages/DonationPageBoard/DonationPageboard';
import MainPage from '../pages/MainPage/MainPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage'




function AuthRoute(props) {
    return (
        <Routes>
            
            <Route path='/signup' element={ <SignUpPage /> }/>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/write" element={<DonationPageboard />} />
            <Route path="/main/review" element={< ReviewPage/>} />
            <Route path="/donation/*" element={<DonationStoryPage />} />
            <Route path="/main/donation/update" element={<DonationPageboard2 />} />
       
           </Routes> 
    );
}

export default AuthRoute;