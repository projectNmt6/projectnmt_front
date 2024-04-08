/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQueryClient } from "react-query";
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";

function AuthPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    // useEffect(() => {
    //     if(!!principalData) {
    //         alert("잘못된 접근입니다.");
    //         window.location.replace("/");
    //     }
    // }, []);
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={ <SignInPage /> }/>
                <Route path='/signup' element={ <SignUpPage /> }/>
            </Routes>
        </div>
    );
}

export default AuthPage;