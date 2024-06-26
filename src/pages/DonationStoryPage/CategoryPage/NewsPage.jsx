import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NonePage from './NonePage';
import DOMPurify from 'dompurify';
import { useMutation } from 'react-query';
import { getDonationNewsRequest } from '../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function NewsPage({ donationPageId }) {
    const [content, setContent] = useState(null); // 초기 상태를 null로 설정
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonationNewsRequest(donationPageId);

                if (response && response.data && response.data.newsContent) {
                    setContent(response.data);
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);
       


    // XSS 방지를 위한 콘텐츠 살균 처리
    const safeHTML = content ? DOMPurify.sanitize(content.newsContent) : '';
    
    return (
        <div css={s.container}>
            <div css={s.content}>
                {content && content.newsContent ? (                    
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
                ) : (
                    <NonePage />
                )}
            </div>
        </div>
    );
}

export default NewsPage;
