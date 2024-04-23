/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { getAllAmount, getDonationListRequest, getProgressAmount } from "../../apis/api/DonationAPI";
import Progress from "../../components/progress/Progress";
import LikeButton from "../../components/LikeButton/LikeButton";
import timer from "../../assets/sandtimer.gif"



function TimeOut(props) {
    const [totalDonationLength, setTotalDonationLength] = useState(0);
    const [upcomingDonation, setUpcomingDonation] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const [closestToGoal, setClosestToGoal] = useState(null);
    const [topThreeDonations, setTopThreeDonations] = useState([]);
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setTotalDonationLength(response.data.length);
                    const sortedDonations = response.data.sort((a, b) => {
                        const timeRemainingA = new Date(a.endDate) - today;
                        const timeRemainingB = new Date(b.endDate) - today;
                        return timeRemainingA - timeRemainingB;
                    });
                    setUpcomingDonation(sortedDonations.find(donation => {
                        const timeRemaining = new Date(donation.endDate) - today;
                        return timeRemaining > 0;
                    }));
                    const closestToGoalDonation = sortedDonations.reduce((prev, curr) => {
                        const prevDiff = Math.abs(prev.goalAmount - prev.currentAmount);
                        const currDiff = Math.abs(curr.goalAmount - curr.currentAmount);
                        return prevDiff < currDiff ? prev : curr;
                    });
                    setClosestToGoal(closestToGoalDonation);

                    const topThree = response.data
                        .sort((a, b) => b.currentAmount - a.currentAmount)
                        .slice(0, 3);
                    setTopThreeDonations(topThree);
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
            <div css={s.cardStyle}>
                <div css={s.cardText}>
                    <h2>시간이 얼마 남지 않았어요 <img src={timer} alt="" /></h2>
                    <p>망설이면 끝! 조금만 더 힘을 내주세요 </p>
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
                                    <Progress pageId={upcomingDonation.donationPageId} />
                                    <div>
                                        <div><p><strong>{upcomingDonation.goalAmount}원 목표</strong> </p></div>
                                        <div><p><strong>남은 시간:</strong> {calculateTimeRemaining(upcomingDonation.endDate)}</p></div>
                                    </div>
                                    <div css={s.LikeDonate}>
                                        <div>
                                            <LikeButton />
                                        </div>
                                        <div>
                                            <a href="">기부하기</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

export default TimeOut;