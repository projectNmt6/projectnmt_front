import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */


function NewsPage(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[newsPage, setNewsPage] = useState({});
    const [ content, setContent ] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/main/donation/news/${donationPageId}`)
            .then(response => {
                const data = response.data;
                setContent(data.newsContent)
            })
            .catch(console.error);
    }, [donationPageId])

            
    console.log(newsPage)
    return (
        <div>
            NewsPage
            <div>
                {content}
                {newsPage.data}
                {newsPage.content}
            </div>
        </div>
    );
}

export default NewsPage;