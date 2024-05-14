/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import Progress from "../../components/progress/Progress";
import { BsFillSearchHeartFill } from "react-icons/bs";
import LikeButton from "../../components/LikeButton/LikeButton";
import { getDonators } from "../../apis/api/DonatorApi";

function LastDonator(props) {
    const [closestToGoal, setClosestToGoal] = useState(null);
    const getDonatorQuery = useQuery(
        "getDonatorQuery",
        async () => {
            const response = await getDonators();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const donations = response.data;
                  // 데이터가 없는 경우 처리
                    if (donations.length === 0) {
                        setClosestToGoal(null);
                        return;
                    }
                console.log(donations);
                const filteredDonations = donations.filter(donation => donation.goalAmount !== 0);
                const uniqueDonations = filteredDonations.reduce((acc, curr) => {
                    if (!acc.some(item => item.donationPageId === curr.donationPageId)) {
                        acc.push(curr);
                    }
                    return acc;
                }, []);
                console.log(filteredDonations);
                const closestToGoalDonation = uniqueDonations.reduce((prev, curr) => {
                    const prevDiff = Math.abs(prev.goalAmount - prev.addAmount);
                    const currDiff = Math.abs(curr.goalAmount - curr.addAmount);
                    return prevDiff < currDiff ? prev : curr;
                });
                setClosestToGoal(closestToGoalDonation);
            }
        },

    );

    return (
        <>
            <div css={s.cardStyle}>
                <h2>마지막 기부자를 찾습니다 <BsFillSearchHeartFill color="#aff0f0" /></h2>
                <p><strong>목표 달성까지 얼마 남지 않았어요! </strong></p>
            {closestToGoal ? (
            <div css={s.donationList}>
                {closestToGoal && (
                    <div css={s.donationList}>
                        <a href={`/donation?page=${closestToGoal.donationPageId}`} key={closestToGoal.donationPageId} css={s.linkStyle}>
                            <div key={closestToGoal.donationPageId} css={s.donationCard}>
                                <div css={s.donationImage}>
                                    <img src={!closestToGoal.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : closestToGoal.mainImgUrl} alt="" />
                                </div>
                                <div css={s.donationDetails}>
                                    <h2>{closestToGoal.storyTitle}</h2>
                                    <Progress pageId={closestToGoal.donationPageId} />
                                    <div>
                                        <div><p><strong>{closestToGoal.goalAmount}원 목표</strong> </p></div>
                                        <p>모인 금액: {closestToGoal.addAmount} </p>

                                    </div>
                                    <div css={s.LikeDonate}>
                                        <div>
                                            <LikeButton donationPageId={closestToGoal.donationPageId}/>
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
                ) : (
            <p>기부 캠페인이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default LastDonator;