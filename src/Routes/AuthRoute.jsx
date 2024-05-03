import React from 'react';
/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import SearchPage from '../pages/SearchPage/SearchPage';
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import RootHeader from '../components/rootHeader/RootHeader';
import AuthPage from '../pages/AuthPage/AuthPage';
import AdminRoute from '../pages/Admin/route/AdminRoute';
import DonationStoryPage from '../pages/DonationStoryPage/DonationStoryPage';
import MessagePage from '../pages/MessagePage/MessagePage';
import NewsWrite from '../pages/DonationPageBoard/CategoryPage/NewsWrite';
import NewsUpdatePage from '../pages/DonationStoryPage/CategoryPage/NewsUpdatePage'
import MyDonation from '../pages/MyDonation/MyDonation';
import DonatorInfo from '../pages/DonatorInfo/DonatorInfo';
import NowFundingPage from '../pages/MainPage/fundings/NowFundingPage';
import EndedFundingsPage from '../pages/MainPage/fundings/EndedFundings';
import TeamRoutePage from '../pages/TeamRoutePage/TeamRoutePage';
import TeamSelectPage from '../pages/DonationPageBoard/TeamSelectPage';
import ChallengeMainPage from '../pages/MainPage/ChallengeMain/ChallengeMainPage';
import ChallengePage from '../pages/DonationChallengerPage/ChallengePage/ChallengePage';

import UserInfoEditPage from '../pages/UserInfoEditPage/UserInfoEditPage';
import SelectTeam from '../pages/SelectTeam/SelectTeam';
import TeamList from '../components/TeamListForUser/TeamList';
import AdminSearchPage from '../pages/Admin/AdminSearchPage/AdminSearchPage';
import ChallengeUpdatePage from '../pages/DonationChallengerPage/ChallengePage/ChallengeUpdate/ChallengeUpdatePage';

import PasswordEditPage from '../pages/UserInfoEditPage/PasswordEditPage';

import DonationUpdatePageBoard from '../pages/DonationUpdatePage/DonationUpdatePageboard';
import ChallengeNewsWrite from '../pages/DonationChallengerPage/Challenge/ChallengeNewsWirte/ChallengeNewsWrite';

import ChallengeWrite from '../pages/DonationChallengerPage/ChallengePage/ChallengeWrite/ChallengeWritePage';

import DonationPageboard from '../pages/DonationPageBoard/DonationWrite/DonationPageboard';


function AuthRoute(props) {

    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {//focus 변경정로도
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log("Auth: "+response.data);
            },
            onError: error => {
                console.log("오류");
                console.log(error);
            }
        }
    );

    return (
        <>

        <RootHeader/>
        <div css={s.container}>
        <Routes>
                <Route path="/auth/*" element={ <AuthPage />}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard/>} />
                <Route path="/main/donation/news" element={ <NewsWrite />} />
                <Route path="/account/mypage/edit" element={<UserInfoEditPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } /> 
                <Route path="/account/mypage" element={<MyPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } />
                <Route path="/admin/search" element={<AdminSearchPage />} /> 
                <Route path="/donation/*" element={<DonationStoryPage />} />
                <Route path="/main/donation/update" element={<DonationUpdatePageBoard />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/message" element={<MessagePage />} /> 
                <Route path='/main/donation/news/update' element={<NewsUpdatePage />} />       
                <Route path="/account/mypage/donation" element={<MyDonation />} />        
                <Route path="/message" element={<MessagePage />} />
                <Route path='/main/challenges' element={ < ChallengeMainPage />} />
                <Route path='/main/challenge/write' element={< ChallengeWrite />} />
                <Route path='/main/challenge' element={< ChallengePage />} />
                <Route path='/main/challenge/news' element={<ChallengeNewsWrite />} />
                <Route path='/main/challenge/update' element={<ChallengeUpdatePage />} />
                <Route path='/main/donation/news/update' element={<NewsUpdatePage />} />       
                <Route path="/account/mypage/donation" element={<MyDonation />} />        
                <Route path="/main/donation/fundings/now" element= {  <NowFundingPage />} />
                <Route path="/main/donation/fundings/end" element= {  <EndedFundingsPage />} />
                <Route path='/team/*' element={<TeamRoutePage />} />
                <Route path='/team/select' element={<TeamSelectPage />} />
                <Route path='/team/*' element={ <TeamRoutePage /> } />
                <Route path='/donation/select/team' element={ <SelectTeam /> } />
                
                <Route path='/test' element={ <TeamList /> } />
                <Route path='/account/mypage/edit' element= { <UserInfoEditPage />} />
                <Route path='/account/mypage/edit/password' element={ <PasswordEditPage />}/>
           </Routes> 
        </div>

        </>
    );
}

export default AuthRoute;