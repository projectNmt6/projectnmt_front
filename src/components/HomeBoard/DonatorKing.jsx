/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { FaCrown } from "react-icons/fa6";
import LikeButton from "../../components/LikeButton/LikeButton";
import { getDonators } from "../../apis/api/donatorApi";

function DonatorKing(props) {
    const [sortedDonorRankings,setSortedDonorRankings] = useState([]);
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
                console.log(donations);
                             // 1. userId를 기준으로 그룹화
                             const donorGroups = donations.reduce((groups, donation) => {
                                const { name, donationAmount } = donation;
                                if (!groups[name]) {
                                  groups[name] = [];
                                }
                                groups[name].push(donation);
                                return groups;
                              }, {});
                            
                              // 2. 각 그룹별로 총 기부 금액 계산
                              const donorRankings = Object.entries(donorGroups).map(([name, donations]) => {
                                const totalDonations = donations.reduce((sum, donation) => sum + donation.donationAmount, 0);
                                return { name, totalDonations };
                              });
                            
                              // 3. 총 기부 금액 기준 내림차순 정렬
                              setSortedDonorRankings(donorRankings.sort((a, b) => b.totalDonations - a.totalDonations));
                          }
            },
        
    );
    return (
        <>
            <div css={s.kingCardStyle}>
                            <h2>오늘의 기부왕!  <FaCrown color="orange" /></h2>
                            {sortedDonorRankings.length > 0 ? (
                                <div>
                                <div css={s.rankingContainer}>
                                    {sortedDonorRankings.length > 1 && (
                                    <div css={s.rankingItem}>
                                        <div css={s.barAlign}>
                                        <p>{Math.ceil((sortedDonorRankings[1].totalDonations) / 10000)}만원</p>
                                            <FaCrown color="#C0C0C0" />
                                            <div css={s.amountBar2(sortedDonorRankings[1].totalDonations*0.0001)}></div>
                                            <h3>{sortedDonorRankings[1].name} 님</h3>
                                            <span css={s.rankingNumber}>2</span>
                                        </div>
                                    </div>
                                    )}
                                    <div css={s.rankingItem}>
                                        <div css={s.barAlign}>
                                        <p>{Math.ceil((sortedDonorRankings[0].totalDonations) / 10000)}만원</p>
                                            <FaCrown color="#FFD700" />
                                            <div css={s.amountBar1(sortedDonorRankings[0].totalDonations*0.0001)}></div>
                                            <h3>{sortedDonorRankings[0].name} 님</h3>
                                            <span css={s.rankingNumber}>1</span>
                                        </div>
                                    </div>
                                    {sortedDonorRankings.length > 2 && (
                                    <div css={s.rankingItem}>
                                        <div css={s.barAlign}>
                                            <p>{Math.ceil((sortedDonorRankings[2].totalDonations) / 10000)}만원</p>
                                            <FaCrown color="#B36700" />
                                            <div css={s.amountBar3(sortedDonorRankings[2].totalDonations*0.0001)}></div>
                                            <h3>{sortedDonorRankings[2].name} 님</h3>
                                            <span css={s.rankingNumber}>3</span>

                                        </div>
                                    </div>
                                    )}
                                </div>
                                </div>
                            ) : (
                                <p>아직 기부한 사람이 없습니다.</p>
                            )}
                        </div>
        </>
    );
}

export default DonatorKing;