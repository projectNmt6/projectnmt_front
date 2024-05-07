/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { HiOutlineClock } from "react-icons/hi2";
import { HiBadgeCheck } from "react-icons/hi";
import { getChallengePageRequest } from "../../../../apis/api/DonationAPI";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getActionBoardList } from "../../../../apis/api/ChallengeApi";
import LoginRequiredModal from "../../../../components/LoginRequiredModal/LoginRequiredModal";


export default function ActionPhoto() {

    const [actionList, setActionList] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);
    const [userId, setUserId] = useState();
    const [teamInfo, setTeamInfo] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const getChallengePageQuery = useQuery(
        ["getChallengePageQuery", challengePageId],
        async () => {
            const response = await getChallengePageRequest(challengePageId);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setChallengePage(data);
            },
            onError: (error) => {
                console.error(error);
                setChallengePage(null);
            }
        }
    );

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const handleModalToggle = () => {
        if (!userId) {
            setShowModal(!showModal); // 로그인이 되어 있지 않다면 모달 토글
        } else {
            setShowNewModal(true); // 로그인이 되어 있으면 새로운 모달 열기
        }
    };

    useEffect(() => {
        if (challengePageId) {
            setLoading(true);
            getActionBoardList(challengePageId)
                .then(response => {
                    const sortedActions = response.data.sort((a, b) =>
                        new Date(b.createDate) - new Date(a.createDate)  // 내림차순 정렬
                    );
                    setActionList(sortedActions);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("actionError", error);
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, [challengePageId]);

    return (
        <div css={s.sidebarFixedStyle}>
            <div css={s.actionText}>
                <HiBadgeCheck />행동하기 인증!
            </div>
            <div>
                {actionList
                    .slice(0, 25) // 첫 25개 요소 추출
                    .map((action) => (
                        <span key={action.id}>
                            <img src={action.imageURL} alt={`Action ${action.id}`} css={s.actionImage} />
                        </span>
                    ))
                }
            </div>
            <button onClick={handleModalToggle} css={s.actionButton2}>행동하기!</button>
        </div>
    );
    
}