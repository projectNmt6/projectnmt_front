import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteChallengePage, getChallengePageRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import * as s from "../DonationChallengerPage/style";
import CommentSection from './CommentSection';
import ChallengeStory from './Challenge/ChallengeStory';
import ChallengeNews from './Challenge/ChallengeNews';
import ActionBoard from './Challenge/ActionBoard';
import { getPrincipalRequest } from '../../apis/api/principal';
import LoginRequiredModal from '../../components/LoginRequiredModal/LoginRequiredModal';
import ActionModal from './Challenge/ActionModal/ActionModal';
/** @jsxImportSource @emotion/react */
function ChallengePage() {    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);
    const navigate = useNavigate(); 
    const [userId, setUserId ] = useState();
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
    
    const handleModalToggle = () => {
        if (!userId) {
            setShowModal(!showModal); // 로그인이 되어 있지 않다면 모달 토글
        } else {
            setShowNewModal(true); // 로그인이 되어 있으면 새로운 모달 열기
        }
    };
    

    const handleDeleteButton = async () => {
        try {
            const response = await deleteChallengePage({ challengePageId });
            if (response.status === 200) {
                alert("삭제 성공");
                console.log(response);
                // 삭제 후 어떤 작업을 수행할지 추가로 구현할 수 있습니다.
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <div css={s.mainContent}>

            
            <div css={s.container}>
                <Link css={s.link} to={"/main"}>메인으로 </Link>
                {showModal && (
                    <div css={s.container3}>
                        <div css={s.modal}><LoginRequiredModal setShowModal={setShowModal} /></div>
                    </div>
                )}
                <div css={s.header}>
                        <Link css={s.button1} >후기 작성하기</Link>
                        <Link css={s.button1} >후기수정하기</Link>
                        <Link css={s.button2} to={`update?page=${challengePageId}`}>수정하기</Link>

                </div>
                <div css={s.storyContent}>
                <h1>{challengeTitle}</h1>

            <p>{challengeOverview}</p>
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            <img src={challengeMainImg} alt="Challenge Main Image" />
            <p>종료 날짜: {endDate}</p>
                <button><Link to={`update?page=${challengePageId}`}>수정하기</Link>
                 </button>

                 <button onClick={handleDeleteButton}>삭제하기</button>
               
                <button onClick={handleModalToggle}>행동하기!</button>
                {showModal && (
                    <div css={s.container3}>
                        <LoginRequiredModal setShowModal={setShowModal} />
                    </div>
                )}
                {showNewModal && (
                  <div css={s.container3}>
                  <ActionModal setShowNewModal={setShowNewModal} challengePageId={challengePageId} />
              </div>
                )}
 

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

                        </div>
                    </div>


                </div>
                    <div>
                        <CommentSection challengePageId={challengePageId} />
                    </div>
                </div>

            </div>

            </div>
                           
            <aside css={s.aside}>
                <h2>사이드 콘텐츠</h2>
                <p>이곳에는 추가 정보가 표시됩니다.</p>
            </aside>
        </div>



        
    );
}

export default ChallengePage;
