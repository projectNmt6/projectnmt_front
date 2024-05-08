/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import Progress from "../../components/progress/Progress";
import { FaSackDollar } from "react-icons/fa6";
import LikeButton from "../../components/LikeButton/LikeButton";
import { getDonators } from "../../apis/api/donatorApi";

function DonationKing(props) {
    const [top3Donations, setTop3Donations] = useState([]);
    const [sortedRankings, setSortedRankings] = useState([]);

    const getDonatorQuery = useQuery(
        "getDonatorQuery",
        async () => {
            const response = await getDonators();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                const donations = response.data;
                // 1. donationId를 기준으로 그룹화
                const donorGroups = donations.reduce((groups, donation) => {
                    const { donationPageId, donationAmount } = donation;
                    if (!groups[donationPageId]) {
                        groups[donationPageId] = [];
                    }
                    groups[donationPageId].push(donation);
                    return groups;
                }, {});
                // 2. 각 그룹별로 총 기부 금액 계산
                const donationRankings = Object.entries(donorGroups).map(([donationPageId, donations]) => {
                    const totalDonations = donations.reduce((sum, donation) => sum + donation.donationAmount, 0);
                    return { donationPageId, totalDonations };
                });

                const uniqueDonations = donations.reduce((acc, curr) => {
                    if (!acc.some(item => item.donationPageId === curr.donationPageId)) {
                        acc.push(curr);
                    }
                    return acc;
                 }, []);

                const donationsWithTotal = uniqueDonations.map(donation => {
                    const rankingData = donationRankings.find(ranking => ranking.donationPageId === String(donation.donationPageId));
                    return {
                      ...donation,
                      totalDonations: rankingData ? rankingData.totalDonations : 0
                    };
                  });
                  
                  const sortedDonations = donationsWithTotal.sort((a, b) => b.totalDonations - a.totalDonations);
                  
           
              
                setTop3Donations(sortedDonations.slice(0, 3));
            }
        },
    );

    return (
        <>
            <div css={s.cardStyle}>
                <div css={s.cardText}>
                    <h2>가장 많이 기부 중인 모금함 <FaSackDollar color="orange" /></h2>
                    <p>오늘, 기부 하셨나요? 당신의 마음도 함께 나눠주세요 </p>
                </div>
                <div css={s.Top3donationList}>
                    {top3Donations.map(donation => (
                        <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId} css={s.Top3linkStyle}>
                            <div key={donation.donationPageId} css={s.Top3donationCard}>
                                <div css={s.Top3donationImage}>
                                    <img src={!donation.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : donation.mainImgUrl} alt="" />
                                </div>
                                <div css={s.Top3donationDetails}>
                                    <h2>{!donation.storyTitle ? "제목없음" : donation.storyTitle}  </h2>
                                    <Progress pageId={donation.donationPageId} />
                                    <div>
                                        <div css={s.Top3goalAmount}>
                                            <p><strong>{donation.goalAmount}원 목표</strong> </p>
                                            <p>모인 금액: {donation.addAmount} 원</p>
                                        </div>
                                    </div>
                                    <div>
                                        <LikeButton donationPageId={donation.donationPageId}/>
                                    </div>

                                </div>
                            </div>

                        </a>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default DonationKing;