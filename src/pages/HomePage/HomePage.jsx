/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';
import { getAllAmount, getDonationListRequest, getProgressAmount } from "../../apis/api/donationAPI";
import Progress from "../../components/progress/Progress";


function HomePage() {
    const [ totalamount , setTotalamount ] = useState(0);
    const [upcomingDonation, setUpcomingDonation] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const getAmountQuery = useQuery(
        "getAmountQuery",
        async () => {
            const response = await getAllAmount();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setTotalamount(data.data.totalAmount);
            },
        }
    );
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                if (Array.isArray(response.data)) {
                const sortedDonations = response.data.sort((a, b) => {
                    const timeRemainingA = new Date(a.endDate) - today;
                    const timeRemainingB = new Date(b.endDate) - today;
                    return timeRemainingA - timeRemainingB;
                });
                setUpcomingDonation(sortedDonations.find(donation => {
                    const timeRemaining = new Date(donation.endDate) - today;
                    return timeRemaining > 0;
                    }))
                }
            }
        }
    );

    const calculateTimeRemaining = (endDate) => {
        const endDateObj = new Date(endDate);
        const timeRemaining = endDateObj - today;
        if (timeRemaining <= 0) {
            return "기간 만료";
        } else {
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            return `${hours}시간 ${minutes}분 ${seconds}초`;
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (upcomingDonation) {
                setRemainingTime(calculateTimeRemaining(upcomingDonation.endDate));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [upcomingDonation]);

    return (
        <>
            <div>
                <h1>Home</h1>
            </div>
            <div>
                <div>{formattedDate} 날짜 기준 </div>
                <div>총 기부금: {totalamount}</div>
            </div>
            {upcomingDonation && (
                <div css={s.donationList}>
                    <a href={`/donation?page=${upcomingDonation.donationPageId}`} key={upcomingDonation.donationPageId} css={s.linkStyle}>
                        <div key={upcomingDonation.donationPageId} css={s.donationCard}>
                            <div css={s.donationImage}>
                                <img src={!upcomingDonation.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : upcomingDonation.mainImgUrl} alt="" />
                            </div>
                            <div css={s.donationDetails}>
                                <h2>{upcomingDonation.storyTitle}</h2>
                                <p><strong>기관:</strong> {upcomingDonation.teamName}</p>
                                <p><strong>목표금액:</strong> {upcomingDonation.goalAmount}원</p>
                                <p><strong>종료시간까지 남은 시간:</strong> {calculateTimeRemaining(upcomingDonation.endDate)}</p>
                                <Progress pageId={upcomingDonation.donationPageId} />
                            </div>
                        </div>
                    </a>
                </div>
            )}
        </>
    );
}
export default HomePage;