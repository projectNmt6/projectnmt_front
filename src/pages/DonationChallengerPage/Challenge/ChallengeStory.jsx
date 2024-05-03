import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChallengePageRequest } from '../../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import { useQuery } from 'react-query';
import * as s from './style';
/** @jsxImportSource @emotion/react */
function ChallengeStory() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page'); 
    const [challengePage, setChallengePage] = useState({});
    const [userId, setUserId ] = useState();    
    const [ teamInfo, setTeamInfo ] = useState();
  
    const safeHTML = DOMPurify.sanitize(challengePage.challengeContent);
    
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


    return (
        <div>
            <div css={s.challengeStory} dangerouslySetInnerHTML={{ __html: safeHTML }} /> 
        </div>
    );
}

export default ChallengeStory;