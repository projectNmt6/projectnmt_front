/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {Link, useLocation, useParams } from 'react-router-dom';
import { getDonationStoryRequest, getProgressAmount, updatePageRequest } from '../../apis/api/donationAPI';
import DOMPurify from 'dompurify';
import Progress from "../../components/progress/Progress";

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setDonationPage(data);
            }
        }
    );
    const { storyContent, storyTitle, mainImgUrl, createDate, endDate } = donationPage || {};

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);

    console.log(donationPage);

    const deleteButton = () => {
        
    }
    const getamountQuery = useQuery(        
        ["getamountQuery", donationPageId],
        async () => {
            return await getProgressAmount(donationPageId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                console.log(data.data);
                setGoalAmount(data.data.goalAmount);
                setCurrentAmount(data.data.addAmount);
            },
        }
    )
    const calculateDaysRemaining = (startDate, endDate) => {
        const today = new Date();
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        startDateTime.setHours(0, 0, 0, 0);
    
        const timeRemaining = Math.ceil((endDateTime - today) / (1000 * 60 * 60 * 24));
        if (timeRemaining <= 0) {
            return "종료";
        } else {
            return `${timeRemaining}일 남음`;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonationStoryRequest({ page: donationPageId });
                setDonationPage(response.data);
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);

    
    return (
        <div css={s.container}>
            <div css={s.header}>
                <Link to="/main" css={s.link}>메인으로</Link>
                <Link to={`/main/donation/update?page=${donationPageId}`} css={s.link}>수정하기</Link>                
                <button onClick={deleteButton} css={s.button}>삭제하기</button>
            </div>
            <div css={s.storyHeader}>
                <h1>Donation Stories</h1>
                <p>page: {donationPageId}</p>
            </div>
            <div css={s.storyContent}>
                <div css={s.main}>
                    <img src={donationPage.mainImgUrl} alt="Story" css={s.storyImage}/>
                    <div>
                        <h2 css={s.donationtitle}>{donationPage.storyTitle}</h2>
                        <div css={s.currentAmount}>{currentAmount}원</div>
                        <div css={s.goalAmount}>{donationPage.goalAmount}원 목표</div>
                        <Progress pageId={donationPageId}/>
                        <div css={s.dates}>
                            <p>기부 시작일: {donationPage.createDate ? donationPage.createDate.substring(0, 10) : ''}</p>
                            <p>기부 종료일: {calculateDaysRemaining(donationPage.createDate, donationPage.endDate)}</p>
                        </div>
                    </div>
                </div>
                <div css={s.sanitizeHtml} dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </div>
        </div>
    )
}
export default DonationStoryPage;