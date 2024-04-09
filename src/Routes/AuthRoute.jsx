import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import SearchPage from '../pages/SearchPage/SearchPage';
import MyPage from '../pages/MyPage/MyPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import RootHeader from '../components/rootHeader/RootHeader';
import AuthPage from '../pages/AuthPage/AuthPage';
import TeamRoutePage from '../pages/TeamRoutePage/TeamRoutePage';
import AdminRoute from '../pages/Admin/route/AdminRoute';
import DonationPageboard2 from '../pages/DonationUpdatePage/DonationPageboard2';
import DonationStoryPage from '../pages/DonationStoryPage/DonationStoryPage';
import ReviewPage from '../pages/ReviewPage/ReviewPage'
<<<<<<< HEAD


=======
import UserInfoEditPage from '../pages/UserInfoEditPage/UserInfoEditPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
>>>>>>> 19-회원정보수정


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
<<<<<<< HEAD
        <>
            <RootHeader />
            <Routes>
                <Route path="/auth/*" element={ <AuthPage />}/>
=======
        <Routes>
            <Route path="/auth/*" element={ <AuthPage />}/>
>>>>>>> 19-회원정보수정
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard />} />
                <Route path="/team/*" element={ <TeamRoutePage />}/>
                <Route path="/account/mypage" element={<MyPage />} />
                <Route path="/admin/*" element={ <AdminRoute/> } /> 
                <Route path='/signup' element={ <SignUpPage /> }/>
                <Route path="/main/review" element={< ReviewPage/>} />
                <Route path="/donation/*" element={<DonationStoryPage />} />
                <Route path="/main/donation/update" element={<DonationPageboard2 />} />
                <Route path="/search" element={<SearchPage />} />
<<<<<<< HEAD

       
           </Routes> 
        </>
=======
            <Route path='/account/mypage/edit' element={<UserInfoEditPage />} />            
        </Routes> 
>>>>>>> 19-회원정보수정
    );
}

export default AuthRoute;