import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { getChallengePageRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import * as s from "./style";
import CommentSection from '../DonationChallengerPage/CommentSection';

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

    const safeHTML = DOMPurify.sanitize(challengeContent);
    return (
        <div>
            <div css={s.container}>
                <Link css={s.link} to={"/main"}>메인으로 </Link>

                <button>수정하기</button>


            </div>
            <h1>{challengeTitle}</h1>
            <p>{challengeOverview}</p>
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            <img src={challengeMainImg} alt="Challenge Main Image" />
            <p>종료 날짜: {endDate}</p>

            <div css={s.commentBox}>
            <CommentSection challengePageId={challengePageId} />
            </div>
        </div>

        
    );
}

export default ChallengePage;
