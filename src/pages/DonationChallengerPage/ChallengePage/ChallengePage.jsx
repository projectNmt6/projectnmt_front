import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteChallengePage, getChallengePageRequest } from '../../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import CommentSection from '../CommentSection';
import ChallengeStory from '../Challenge/ChallengeStory';
import ChallengeNews from '../Challenge/ChallengeNews';
import ActionBoard from '../Challenge/ActionBoard';
import { getPrincipalRequest } from '../../../apis/api/principal';
import LoginRequiredModal from '../../../components/LoginRequiredModal/LoginRequiredModal';
import ActionModal from '../Challenge/ActionModal/ActionModal';
import { getTeamInfoRequest, getTeamListRequest } from '../../../apis/api/teamApi';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function ChallengePage() {    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);
    const navigate = useNavigate(); 
    const [userId, setUserId ] = useState();    
    const [ teamInfo, setTeamInfo ] = useState();

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
                console.error('Failed to fetch challenge page:', error);
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

    const { challengeMainImg, challengeTitle, challengeOverview, endDate, challengeContent } = challengePage || {};
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
    const [selectedTeam, setSelectedTeam] = useState(null);
    
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

    return (

        <div css={s.contentAreaStyle}>
        <div css={s.leftCardLayout}>
        <div css={s.container1}>
                {showModal && (
                    <div css={s.container3}>
                        <div css={s.modal}><LoginRequiredModal setShowModal={setShowModal} /></div>
                    </div>
                )}
            
            <div css={s.container}>
                <Link css={s.link} to={"/main"}>메인으로 </Link>
            </div>
            
            <div >
                <button><Link to={`update?page=${challengePageId}`}>수정하기</Link>
                </button>

                    <button onClick={handleDeleteButton}>삭제하기</button>
                
                    <button onClick={handleModalToggle}>행동하기!</button>
                    {showModal && (
                        <div css={s.cardStyle}>
                            <LoginRequiredModal setShowModal={setShowModal} />
                        </div>
                    )}
                    {showNewModal && (
                    <div css={s.cardStyle}>
                    <ActionModal setShowNewModal={setShowNewModal} challengePageId={challengePageId} />
                </div>
                    )} 
            </div>

            <div css={s.storyHeader}>
          

        <div css={s.storyContent}>
        <h1>{challengeTitle}</h1>
        <img src={challengeMainImg} alt="Challenge Main Image" />
            
        <div css={s.main}>
            <p>{challengeOverview}</p>
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            <p>종료 날짜: {endDate}</p>
        </div>
                <div css={s.container2}>
                    <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                    <button css={s.button4} onClick={() => handleTabChange('action')}>Action</button>
                    <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                   
                    <div css={s.boxbox1}>
                        <div>
                            <h2>분리공간 </h2>
                            { selectedTab === 'story' ?
                            <ChallengeStory />
                            :selectedTab === 'news' ? 
                            <ChallengeNews challengePageId={challengePageId} /> 
                            : < ActionBoard challengePageId={challengePageId} />
                            }
            
                    <div css={s.commentBox}>
                    <CommentSection challengePageId={challengePageId} />
                    </div>
                </div>
                        
        </div>
            </div>
                    </div>

                </div>
            </div>


            <div css={s.rightCardLayout}>                    
                <div css={s.sidebarStyle}>
                        aaaaa
                    </div>
            </div>
        </div>
        </div>


        
    );
}

export default ChallengePage;
