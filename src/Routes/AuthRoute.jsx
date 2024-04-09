import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import RootHeader from '../components/rootHeader/RootHeader';
import AuthPage from '../pages/AuthPage/AuthPage';
import TeamRoutePage from '../pages/TeamRoutePage/TeamRoutePage';
import AdminRoute from '../pages/Admin/route/AdminRoute';

function AuthRoute(props) {

    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,{//focus 변경정로도
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response.data);
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });
    return (
        <>
            <RootHeader />
            <Routes>
                <Route path="/auth/*" element={ <AuthPage />}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard />} />
                <Route path="/team/*" element={ <TeamRoutePage />}/>
                <Route path="/account/mypage" element={<MyPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } /> 
            </Routes> 
        </>
    );
}

export default AuthRoute;