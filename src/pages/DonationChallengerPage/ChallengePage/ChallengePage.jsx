/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteChallengePage, getChallengePageRequest } from '../../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import ChallengeStory from '../Challenge/ChallengeStory';
import ChallengeNews from '../Challenge/ChallengeNews';
import ActionBoard from '../Challenge/ActionBoard/ActionBoard';
import { getPrincipalRequest } from '../../../apis/api/principal';
import LoginRequiredModal from '../../../components/LoginRequiredModal/LoginRequiredModal';
import ActionModal from '../Challenge/ActionModal/ActionModal';
import { getTeamInfoRequest, getTeamListRequest } from '../../../apis/api/teamApi';
import { countActionBoard, getActionBoardList } from '../../../apis/api/ChallengeApi';
import { HiOutlineClock } from "react-icons/hi2";
import { HiBadgeCheck } from "react-icons/hi";
import TopButton from '../../../components/TopButton/TopButton';
import ChallengeComment from './ChallenegComment/ChallengeComment';
import ChallengePageHeader from "../../DonationStoryPage/PageHeader/ChallengePageHeader";
function ChallengePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);
    const [userId, setUserId] = useState();
    const [teamInfo, setTeamInfo] = useState();
    const [actingHeadCount, setActingHeadCount] = useState(0);

    const contentRef = useRef(null);
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

    const principalQuery = useQuery(
        ["principalQuery"],
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengePageRequest({ page: challengePageId });
                setChallengePage(response.data);
            } catch (error) {
                console.error('Error page:', error);
            }
        };
        fetchData();
    }, [challengePageId]);

    useEffect(() => {
        if (challengePageId) {
            countActionBoard(challengePageId)
                .then(response => {
                    console.log("API Response:", response.data); // 응답 로깅
                    setActingHeadCount(response.data);
                })
                .catch(error => {
                    console.error("actionError", error);
                });
        }
    }, [challengePageId]);

    const { challengeMainImg, challengeTitle, challengeOverview, endDate, challengeContent, headCount } = challengePage || {};
    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    const safeHTML = DOMPurify.sanitize(challengeContent);

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);

    useEffect(() => {
        if (showModal || showNewModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal, showNewModal]);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (userId) {
            const fetchTeams = async () => {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName
                        }));
                        setTeams(formattedTeams);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTeams();
        }
    }, [userId]);

    const getTeamInfoMutation = useQuery(
        ["getTeamInfoMutation"],
        async () => {
            console.log(challengePage);
            const response = await getTeamInfoRequest({ teamId: challengePage?.teamId });
            return response;
        },
        {
            refetchOnWindowFocus: false,
            enabled: !!challengePage,
            onSuccess: response => {
                console.log(response.data);
                setTeamInfo(() => response.data);
            }
        }
    );
    const handleModalToggle = () => {
        if (!userId) {
            setShowModal(!showModal); // 로그인이 되어 있지 않다면 모달 토글
        } else {
            setShowNewModal(true); // 로그인이 되어 있으면 새로운 모달 열기
        }
    };
    const deleteMutationButton = useMutation({
        mutationKey: "deleteMutationButton",
        mutationFn: deleteChallengePage,
        onSuccess: response => {
            alert("삭제완료")
            window.location.replace("/main");
        },
        onError: error => {
            alert("삭제 권한이 없습니다")
        }
    })
    const handleDeleteButton = () => {
        console.log("삭제 시도:", challengePageId);
        deleteMutationButton.mutate({ challengePageId: challengePageId });
    }

    const [remainingDays, setRemainingDays] = useState('');

    useEffect(() => {
        if (challengePage && challengePage.endDate) {
            const currentDate = new Date();
            const endDate = new Date(challengePage.endDate);
    
            // Calculate remaining time in milliseconds
            const remainingTime = endDate.getTime() - currentDate.getTime();
    
            // Convert milliseconds to days
            const days = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)));
    
            // Update state for remaining days
            setRemainingDays(days);
    
            // Set endDatePassed based on remaining days
            setEndDatePassed(days <= 0);
        } else {
            setRemainingDays('날짜 정보 없음');
            setEndDatePassed(true); // Assume passed if no end date is available
        }
    }, [challengePage]);
    

    const [actionList, setActionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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



    const [endDatePassed, setEndDatePassed] = useState(false);



    return (
        <div css={s.contentAreaStyle}>
            <ChallengePageHeader
                contentRef={contentRef}
                challengePageId={challengePageId}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
            />

            {showModal && (
                <div css={s.container3}>
                    <div><LoginRequiredModal setShowModal={setShowModal} /></div>
                </div>
            )}
            <div>
                <div className="modal-overlay">
                    {showModal && (
                        <div css={s.cardStyle}>
                            <LoginRequiredModal setShowModal={setShowModal} />
                        </div>
                    )}
                    {showNewModal && (
                        <div >
                            <ActionModal setShowNewModal={setShowNewModal} challengePageId={challengePageId} />
                        </div>
                    )}
                </div>
            </div>

            <div css={s.leftCardLayout}>
                <div>
                    <div css={s.storyContent}>
                        <div css={s.main}>
                            <img src={challengeMainImg} css={s.storyImage} />

                        </div>
                    </div>
                    <div >
                        <div ref={contentRef} css={s.buttonGroupContainer}>
                            <div css={s.buttonGroup}>
                                <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                                <button css={s.button4} onClick={() => handleTabChange('action')}>Action</button>
                                <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                            </div>
                        </div>
                        <div css={s.boxbox1}>
                        </div>
                        <div>
                            {selectedTab === 'story' ?
                                <ChallengeStory />
                                : selectedTab === 'news' ?
                                    <ChallengeNews challengePageId={challengePageId} />
                                    : < ActionBoard challengePageId={challengePageId} />
                            }
                            <h3>댓글을 남겨주세요.</h3>
                            <div css={s.commentBorder}>
                            </div>
                            <ChallengeComment challengePageId={challengePageId} />

                        </ div>

                    </div>
                </div>
            </div>

            <div css={s.rightCardLayout}>
                <div css={s.sidebarStyle2}>

                    <div css={s.remainingDays}><HiOutlineClock />{remainingDays} 일 남음</div>
                    <h1>{challengeTitle}</h1>

                    <div css={s.actingInfo}>
                        <div css={s.actingCount}><HiBadgeCheck />{actingHeadCount} 명 행동중!</div>
                        <div css={s.headCountCss}>{headCount}명 목표</div>
                    </div>
                    <div css={s.actionProgressBar}>
                        <div style={{ width: `${(actingHeadCount / headCount) * 100}%` }}></div>
                    </div>

                </div>
                <div css={s.sidebarStyle3}>
                    <div css={s.howToText}>How To!</div>
                    <div>{challengeOverview}</div>
                </div>
                <div css={s.teamInfo}>
                    <div css={s.teamName}>
                        <img css={s.teamLogo} src={teamInfo?.teamLogoImgUrl} alt="" />
                        {teamInfo?.teamName}</div>
                    <div css={s.teamText}>{teamInfo?.teamInfoText}</div>
                </div>
                <div css={s.sidebarStyle}>

                    <div css={s.actionText}>
                        <HiBadgeCheck />행동하기 인증!</div>
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
                    <button onClick={handleModalToggle}
                        css={endDatePassed ? { ...s.actionButton2, ...s.disableActionButton } : s.actionButton2}
                        disabled={endDatePassed}>
                        행동하기!
                    </button>

                </div>
            </div>

            <TopButton />

        </div>


    );
}

export default ChallengePage;
