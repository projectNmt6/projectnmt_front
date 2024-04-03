import React from 'react';
import SignInPage from '../pages/SignInPage/SignInPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

function AuthRoute(props) {
    return (
        <Routes>
            <Route path='/signin' element={ <SignInPage /> }/>
            <Route path='/signup' element={ <SignUpPage /> }/>
        </Routes>
        
    );
}

export default AuthRoute;