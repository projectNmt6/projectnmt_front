import React, { useEffect, useState } from 'react';
import { PostChallengeNews, getChallengeNewsRequest } from '../../../apis/api/ChallengeApi';

import TextEditor from '../../../components/TextEditor/TextEditor';
import DOMPurify from 'dompurify';
import NonePage from '../../DonationStoryPage/CategoryPage/NonePage';

import * as s from './style';
/** @jsxImportSource @emotion/react */
function ChallengeNews({challengePageId}) {
    
    const [title, setTitle] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [ teamId, setTeamId ] = useState();
    const [teams, setTeams] = useState([]);
    const [ userId, setUserId] = useState();
    const [content, setContent] = useState(null); // 초기 상태를 null로 설정
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeNewsRequest(challengePageId);

                if (response && response.data && response.data.challengeNewsContent) {
                    setContent(response.data);
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [challengePageId]);

    
    const safeHTML = content ? DOMPurify.sanitize(content.challengeNewsContent) : '';
    console.log(content)
    
    return (
        <div>
            <div css={s.challengeStory}>
                {content && content.challengeNewsContent ? (                    
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
                ) : (
                    <NonePage />
                )}
            </div>
        </div>
    );
}

export default ChallengeNews;