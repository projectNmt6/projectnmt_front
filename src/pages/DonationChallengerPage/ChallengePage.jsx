import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { getChallengePageRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import * as s from "../DonationStoryPage/style";
import CommentSection from './CommentSection';
import ChallengeStory from './Challenge/ChallengeStory';
import ChallengeNews from './Challenge/ChallengeNews';
import ActionBoard from './Challenge/ActionBoard';
import LoginModal from './Challenge/LoginModal';

function ChallengePage() {    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const [challengePage, setChallengePage] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengePageRequest({ page: challengePageId });
                setChallengePage(response.data);
            } catch (error) {
                console.error('Error fetching donation page:', error);
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
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    },[showModal])
    const handleModalToggle = () => setShowModal(!showModal);
    return (
        <div>
            <div css={s.container}>
                <Link css={s.link} to={"/main"}>메인으로 </Link>
                {showModal && (
                    <div css={s.container3}>
                        <div css={s.modal}><LoginModal setShowModal={setShowModal} /></div>
                    </div>
                )}
                <h1>{challengeTitle}</h1>
            <p>{challengeOverview}</p>
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            <img src={challengeMainImg} alt="Challenge Main Image" />
            <p>종료 날짜: {endDate}</p>

                <button>수정하기</button>
                <button onClick={handleModalToggle}>행동하기!</button>
                {showModal && (
                    <div css={s.container3}>
                        <LoginModal setShowModal={setShowModal} />
                    </div>
                )}
 

                <div css={s.container2}>
                    <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                    <button css={s.button4} onClick={() => handleTabChange('action')}>Donators</button>
                    <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                   
                    <div css={s.boxbox1}>
                        <div>
                            <h2>분리공간 </h2>
                            { selectedTab === 'story' ?
                            <ChallengeStory />
                            :selectedTab === 'news' ? 
                            <ChallengeNews challengePageId={challengePageId} /> 
                            : <ActionBoard challengePageId={challengePageId} />
                            }

                        </div>
                    </div>
                </div>
                


            </div>
           

            <div css={s.commentBox}>
            <CommentSection challengePageId={challengePageId} />
            </div>
        </div>

        
    );
}

export default ChallengePage;
