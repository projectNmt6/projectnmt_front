/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';
import { getAllAmount, getDonationListRequest, getProgressAmount } from "../../apis/api/DonationAPI";
import Progress from "../../components/progress/Progress";
import introImg from '../../assets/introImg.png';
import introImg2 from '../../assets/introImg2.jpeg';
import { FaArrowCircleRight } from "react-icons/fa";
import sideImg from '../../assets/sideImg.png';
import { FaWonSign } from "react-icons/fa";
import { BsEmojiHeartEyes } from "react-icons/bs";
import LikeButton from "../../components/LikeButton/LikeButton";
import lion from '../../assets/lion.gif';
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import { getDonators } from "../../apis/api/DonatorApi";

function HomePage() {
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [totalDonationLength, setTotalDonationLength] = useState(0);
    const [upcomingDonation, setUpcomingDonation] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const [closestToGoal, setClosestToGoal] = useState(null);
    const [topThreeDonations, setTopThreeDonations] = useState([]);
    const [topDonator, setTopDonator] = useState(null);


    const getProgressQuery = useQuery(
        "progressAmountQuery",
        async () => {
            const response = await getProgressAmount();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setTotalAmount(response.data.totalAmount);
                setCurrentAmount(response.data.addAmount);
                console.log(response);
            },
        }
    );
    const getAmountQuery = useQuery(
        "getAmountQuery",
        async () => {
            const response = await getAllAmount();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setTotalDonationAmount(response.data.totalAmount);
            },
        }
    );

    const getDonatorQuery = useQuery(
        "getDonatorQuery",
        async () => {
            const response = await getDonators();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                // const donors = sortedDonations.flatMap(donation => donation.donators);
                // const topDonator = donors.reduce((prev, curr) => {
                //     const prevTotal = prev.donations.reduce((sum, donation) => sum + donation.amount, 0);
                //     const currTotal = curr.donations.reduce((sum, donation) => sum + donation.amount, 0);
                //     return prevTotal > currTotal ? prev : curr;
                // });
                setTopDonator(topDonator);
            },
        }
    );


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
                    }))
                    
                

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
            <main css={s.mainLayout}>
                <header css={s.rootheader}>
                    <div css={s.headerStyle}>
                        <h1>세상을 위한 따뜻한 마음 <br />노먹튀와 함께해요 <img src={lion} alt="" width="7%" /></h1>
                    </div>
                    <div css={s.introStyle}>
                        <img src={introImg} />
                        <h3>총 기부 {totalDonationLength} 건</h3>
                        <img src={introImg2} />
                        <h3>노먹튀 소개</h3>
                        <button><FaArrowCircleRight size="30" /></button>
                    </div>
                </header>
                <div css={s.contentAreaStyle}>
                    <div css={s.leftCardLayout}>
                        <div css={s.cardStyle}>
                                <div css={s.cardText}>
                                    <h2>시간이 얼마 남지 않았어요 <GiSandsOfTime color="orange" /></h2>
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
                        <div css={s.cardStyle}>
                            <div css={s.cardText}>
                                <h2>가장 많이 기부 중인 모금함 <FaSackDollar color="orange" /></h2>
                                <p>오늘, 기부 하셨나요? 당신의 마음도 함께 나눠주세요 </p>
                            </div>
                            <div css={s.Top3donationList}>
                                {topThreeDonations.map(donation => (
                                    <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId} css={s.Top3linkStyle}>
                                        <div key={donation.donationPageId} css={s.Top3donationCard}>
                                            <div css={s.Top3donationImage}>
                                                <img src={!donation.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : donation.mainImgUrl} alt="" />
                                            </div>
                                            <div css={s.Top3donationDetails}>
                                                <h2>{donation.storyTitle}</h2>
                                                <Progress pageId={donation.donationPageId} />
                                                <div>
                                                    <div css={s.Top3goalAmount}>
                                                        <p><strong>{donation.goalAmount}원 목표</strong> </p>
                                                        <p>모인 금액: {currentAmount} </p>
                                                    </div>


                                                    {/* <div><p><strong>남은 시간:</strong> {calculateTimeRemaining(donation.endDate)}</p></div> */}
                                                </div>
                                                <div>
                                                    <LikeButton />
                                                </div>
                                
                                                </div>
                                            </div>
                                        
                                    </a>
                                )
                                )}
                            </div>
                        </div>


                        <div css={s.cardStyle}>
                            <h2>마지막 기부자를 찾습니다 <BsFillSearchHeartFill color="orange" /></h2>
                            <p>목표 달성까지 얼마 남지 않았어요! </p>
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
                                                    <p>모인 금액: {currentAmount} </p>

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

                        <div css={s.cardStyle}>
                            <h2>오늘의 기부왕!  <FaCrown color="orange" /></h2>
                            {topDonator ? (
                                <div>
                                    <h3>{topDonator.name}</h3>
                                    {/* <p>총 기부 금액: {topDonator.donations.reduce((sum, donation) => sum + donation.amount, 0)}원</p> */}
                                </div>
                            ) : (
                                <p>아직 기부한 사람이 없습니다.</p>
                            )}
                        </div>
                    </div>



                    <div css={s.rightCardLayout}>
                        <div css={s.sidebarStyle}>
                            <div css={s.sidebarText}>
                                <div>
                                    <h2>우리가<br />같이 만든 변화들</h2>

                                    <p>{formattedDate} 기준</p>
                                </div>
                                <div>
                                    <img src={sideImg} />
                                </div>
                            </div>
                            <div css={s.totalAmountBox}>
                                <h3> ₩ 총 기부금                               {totalDonationAmount.toLocaleString()}원</h3>
                            </div>
                        </div>

                        <div css={s.sidebarStyle}>
                            <h2>따뜻한 후기</h2>
                        </div>
                        <div css={s.sidebarStyle}>
                            <h2>놓치면 아까운 소식</h2>
                        </div>

                    </div>
                </div>

                <div css={s.additionalContentStyle}>
                </div>


            </main>
            <footer css={s.footerStyle}>
                <p>© 2024 ProjectNMT</p>
                <a href="">고객센터 </a>
                <a href="">문의하기 </a>
                <a href="">이용약관 </a>
                <a href="">개인정보처리방침 </a>
            </footer>

        </>
    );
}
export default HomePage;