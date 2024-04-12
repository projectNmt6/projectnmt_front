import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

function NewsPage(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const [newsPage, setNewsPage] = useState({});
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/main/donation/news/${donationPageId}`)
            .then(response => {
                const data = response.data;
                setContent(data.newsContent);
                setNewsPage(data);  // Update the newsPage state if needed
                console.log("Fetched data:", data);  // Additional logging to see the fetched data
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                console.log("Detailed error:", error.response);
            });
    }, [donationPageId]);

    console.log("newsPage state:", newsPage); // Logging the state for debugging
    return (
        <div>
            NewsPage
            <div>
                {content}
                {/* Ensure these are meant to display data or remove if unused */}
                {newsPage.content}
                {newsPage.newsContent}
            </div>
        </div>
    );
}

export default NewsPage;
