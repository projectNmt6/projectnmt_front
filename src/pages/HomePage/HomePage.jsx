/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { getAllAmount, getDonationListRequest, getProgressAmount } from "../../apis/api/DonationAPI";
import introImg from '../../assets/introImg.png';
import introImg2 from '../../assets/introImg2.jpeg';
import { FaArrowCircleRight } from "react-icons/fa";
import sideImg from '../../assets/sideImg.png';
import DonatorKing from "../../components/HomeBoard/DonatorKing";
import LastDonator from "../../components/HomeBoard/LastDonator";
import DonationKing from "../../components/HomeBoard/DonationKing";
import TimeOut from "../../components/HomeBoard/TimeOut";
import { FaWonSign } from "react-icons/fa";
import { BsEmojiHeartEyes } from "react-icons/bs";
import lion from '../../assets/lion.gif';
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import LikeButton from "../../components/LikeButton/LikeButton";

function HomePage() {
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);
    const [totalDonationLength, setTotalDonationLength] = useState(0);
    const [ upcomingDonation , setUpcomingDonation] = useState();

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
            onSuccess: response => {
                setTotalDonationAmount(response.data.totalAmount);
                const donations = response.data;
            }
        },
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
                }
            }
        }
    );

    return (
        <>
            <main css={s.mainLayout}>
                <header css={s.rootheader}>
                    <div css={s.headerStyle}>
                        <h1>세상을 위한 따뜻한 마음 <br />NMT와 함께해요 <img src={lion} alt="" width="7%" /></h1>
                    </div>
                    <div css={s.introStyle}>
                        <img src={introImg} />
                        <h3>총 기부 {totalDonationLength} 건</h3>
                        <img src={introImg2} />
                        <h3>NMT 소개</h3>
                        <button><FaArrowCircleRight size="30" /></button>
                    </div>
                </header>
                <div css={s.contentAreaStyle}>
                    <div css={s.leftCardLayout}>

                        <TimeOut />
                        <DonationKing />
                        <LastDonator />
                        <DonatorKing />

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
                                <h3> ₩ 총 기부금                               
                                    {totalDonationAmount.toLocaleString()}원</h3>
                            </div>

                            {/* {upcomingDonation && (
                                <div css={s.donationList}>
                                    <a href={`/donation?page=${upcomingDonation.donationPageId}`} key={upcomingDonation.donationPageId} css={s.linkStyle}>
                                        <div key={upcomingDonation.donationPageId} css={s.donationCard}>
                                            <div css={s.donationImage}>
                                                <img src={!upcomingDonation.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : upcomingDonation.mainImgUrl} alt="" />
                                            </div>
                                            <div css={s.donationDetails}>
                                                <h2>{upcomingDonation.storyTitle}</h2>
                                                <Progress pageId={upcomingDonation.donationPageId}/>
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
                            )} */}

                        </div>

                        <div css={s.sidebarStyle}>
                            <h2>따뜻한 후기</h2>
                        </div>
                        <div css={s.sidebarStyle}>
                            <h2>놓치면 아까운 소식</h2>
                        </div>
                    </div>
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