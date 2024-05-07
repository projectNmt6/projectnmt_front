import React, { useEffect, useState } from 'react';
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
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { countActionBoard, getActionBoardList } from '../../../apis/api/ChallengeApi';
import { HiOutlineClock } from "react-icons/hi2";
import { HiBadgeCheck } from "react-icons/hi";
import TopButton from '../../../components/TopButton/TopButton';
import ActionPhoto from './ActionPhoto/ActionPhoto';
import ChallengeComment from './ChallenegComment/ChallengeComment';
function ChallengePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);
    const [userId, setUserId] = useState();
    const [teamInfo, setTeamInfo] = useState();

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
                setUserId(response.data.userId); // 예제로 userId 설정
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

    const [actingHeadCount, setActingHeadCount] = useState(0);

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
    const [showCommentSection, setShowCommentSection] = useState(false);

    const handleCommentToggle = () => {
        setShowCommentSection(!showCommentSection);
    };
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

            // 남은 시간(밀리초) 계산
            const remainingTime = endDate.getTime() - currentDate.getTime();

            // 밀리초를 일수로 변환
            const days = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)));

            // 상태 업데이트
            setRemainingDays(days);
        } else {
            setRemainingDays('날짜 정보 없음');
        }
    }, [challengePage]);

    const handleNewsButtonClick = () => {
        window.location.replace(`/main/challenge/news?page=${challengePageId}`);
    };


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

    return (
        <div css={s.contentAreaStyle}>



            <div css={s.leftCardLayout}>
                {showModal && (
                    <div css={s.container3}>
                        <div css={s.modal}><LoginRequiredModal setShowModal={setShowModal} /></div>
                    </div>
                )}

                <div >
                    <Link css={s.link} to={"/main"}>메인으로 </Link>
                </div>

                <div >
                    <button onClick={handleNewsButtonClick}>후기작성버튼</button>
                    <button>후기 수정하기</button>
                    <button><Link to={`update?page=${challengePageId}`}>수정하기</Link></button>
                    <button onClick={handleDeleteButton}>삭제하기</button>
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
                    </div></div>


                <div>
                    <div css={s.storyContent}>
                        <div css={s.main}>
                            <img src={challengeMainImg} alt="Challenge" css={s.storyImage} />


                        </div>
                    </div>
                    <div >
                        <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                        <button css={s.button4} onClick={() => handleTabChange('action')}>Action</button>
                        <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                        <div css={s.boxbox1}>
                        </div>
                        <div>
                            {selectedTab === 'story' ?
                                <ChallengeStory />
                                : selectedTab === 'news' ?
                                    <ChallengeNews challengePageId={challengePageId} />
                                    : < ActionBoard challengePageId={challengePageId} />
                            }
                            <div css={s.commentBorder}>
                                <h3>댓글</h3>
                            </div>
                            <ChallengeComment challengePageId={challengePageId} />

                        </div>

                    </div>
                </div>
            </div>

            <div css={s.rightCardLayout}>

                {/* 오른쪽 영역 컨텐츠 */}
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

                    <button onClick={handleModalToggle} css={s.actionButton2}>행동하기!</button>
                </div>
                
            <ActionPhoto />
            </div>

            <TopButton />
            
        </div>


    );
}

export default ChallengePage;
