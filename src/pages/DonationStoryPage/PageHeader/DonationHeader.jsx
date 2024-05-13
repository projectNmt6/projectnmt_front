import React, { useState, useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ShareButton from '../../../components/ShareModal/ShareButton';
import LikeButton from '../../../components/LikeButton/LikeButton';
import DonatorInfo from '../../DonatorInfo/DonatorInfo';
import LoginRequiredModal from '../../../components/LoginRequiredModal/LoginRequiredModal';
import { getPrincipalRequest } from '../../../apis/api/principal';
import { useQuery } from 'react-query';

function DonationHeader({ donationPageId, selectedTab, handleTabChange, contentRef }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [modalType, setModalType] = useState(null); // 'login' 또는 'donatorInfo'
    const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 표시 상태
   
    const handleDonateClick = () => {
        if (!isLoggedIn) {
            setModalType('login');
            setShowModal(true); // 로그인 모달 표시
        } else {
            setModalType('donatorInfo');
            setShowModal(true); // 기부 관련 모달 표시
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalType(null); // 모달 타입 초기화
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            setShowLoginModal(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const checkVisibility = () => {
            if (!contentRef.current) {
                return; // contentRef가 없으면 함수를 종료합니다.
            }
            const targetTop = contentRef.current.getBoundingClientRect().top;
            setIsVisible(targetTop < 0);
        };

        window.addEventListener('scroll', checkVisibility);
        checkVisibility();

        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [contentRef]);

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
    }, [showModal])
    const [userId, setUserId] = useState();
    
    const principalQuery = useQuery(
        ["principalQuery"],
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setUserId(response.data.userId);
                setIsLoggedIn(true); // 사용자 인증 성공 시 로그인 상태를 true로 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
                setIsLoggedIn(false); // 에러 발생 시 로그인 상태를 false로 설정
            }
        }
    );

    return (
        <div css={s.main}>
            <div css={[s.headerPanel2, { display: isVisible ? 'flex' : 'none' }]}>
                <div css={s.buttonGroupContainer2}>
                    <div css={s.buttonGroup2}>
                        <button css={[s.tabButton2, selectedTab === 'story' && s.activeTabButton2]} onClick={() => handleTabChange('story')}>Story</button>
                        <button css={[s.tabButton2, selectedTab === 'donators' && s.activeTabButton2]} onClick={() => handleTabChange('donators')}>Donators</button>
                        <button css={[s.tabButton2, selectedTab === 'news' && s.activeTabButton2]} onClick={() => handleTabChange('news')}>News</button>
                    </div>
                </div>
                <div css={s.likebutton}>
                    <div css={s.socialButtons}>
                        <LikeButton donationPageId={donationPageId} />
                        <ShareButton />
                    </div>
                    <button css={s.donation} onClick={handleDonateClick}>기부하기</button>
                </div>
                <div className="modal-overlay">
                    {showModal && modalType === 'login' && (
                        <div css={s.cardStyle}>
                            <LoginRequiredModal setShowModal={handleCloseModal} />
                        </div>
                    )}
                    {showModal && modalType === 'donatorInfo' && (
                        <div>
                            <DonatorInfo setShowModal={handleCloseModal} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DonationHeader;
