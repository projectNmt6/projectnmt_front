import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NonePage from './NonePage';
import DOMPurify from 'dompurify';
/** @jsxImportSource @emotion/react */

function NewsPage({ donationPageId }) {
    const [content, setContent] = useState(null); // 초기 상태를 null로 설정

    useEffect(() => {
        axios.get(`http://localhost:8080/main/donation/news/${donationPageId}`)
            .then(response => {
                if (response.data && response.data.newsContent) {
                    setContent(response.data); // 데이터가 있다면 설정
                } else {
                    setContent(null); // 데이터가 비어있으면 null 설정
                }
            })
            .catch(console.error);
    }, [donationPageId]);

    // XSS 방지를 위한 콘텐츠 살균 처리
    const safeHTML = content ? DOMPurify.sanitize(content.newsContent) : '';

    return (
        <div>
            NewsPage
            <div>
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
