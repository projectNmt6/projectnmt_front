import React from 'react';
import SignInPage from '../pages/SignInPage/SignInPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import TeamCreatePage from '../pages/TeamCreatePage/TeamCreatePage'; 
import TeamPage from '../pages/TeamPage/TeamPage'; 
import TeamInfoPage from '../pages/TeamInfoPage/TeamInfoPage';
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userAtom';

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
        <Routes>
            <Route path='/signin' element={ <SignInPage /> }/>
            <Route path='/signup' element={ <SignUpPage /> }/>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/write" element={<DonationPageboard />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/account/mypage" element={<MyPage />} />
            <Route path="/team/write" element={<TeamCreatePage />} />
            <Route path="/team/info" element={<TeamInfoPage />} />
        </Routes> 
    );
}

export default AuthRoute;