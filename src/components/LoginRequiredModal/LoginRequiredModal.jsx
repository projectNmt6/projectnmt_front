/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { GrClose } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import SignInPage from "../../pages/SignInPage/SignInPage";

function LoginRequiredModal({ setShowModal }) {
    const handleCloseClick = () => {
        setShowModal(false);
    };

    const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수를 얻습니다.

    const handleLoginClick = () => {
        navigate('/auth/signin'); // 로그인 페이지로 이동합니다.
        setShowModal(false); // 모달을 닫습니다.
    };
    return (
        <>
            <div css={s.modalBackground}>
                <div css={s.modalContainer}>
                    <div css={s.header}>
                        <button css={s.button} onClick={handleCloseClick}><GrClose /></button>                        
                    </div>
                    <div css={s.body}>
                        <p>로그인이 필요한 기능입니다.</p>
                        <p>로그인 하시겠습니까?</p>

                        <button css={s.loginButton} onClick={handleLoginClick}>확인</button>
                        <button css={s.closeButton} onClick={handleCloseClick}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginRequiredModal;
