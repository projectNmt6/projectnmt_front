/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { commentResponse, getAllAmount, getDonationListRequest, getDonationStoryRequest, getProgressAmount } from "../../apis/api/DonationAPI";

import sideImg from '../../assets/sideImg.png';
import DonatorKing from "../../components/HomeBoard/DonatorKing";
import LastDonator from "../../components/HomeBoard/LastDonator";
import DonationKing from "../../components/HomeBoard/DonationKing";
import TimeOut from "../../components/HomeBoard/TimeOut";
import lion from '../../assets/lion.gif';
import CommentShow from "../../components/HomeBoard/CommentShow";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import AutoSlide from "../../components/HomeBoard/AutoSlide";
import { Link } from "react-router-dom";
import KakaoChannel from "../../components/HomeBoard/KakaoChannel";
import DonateTip from "../../components/HomeBoard/DonateTip";


function HomePage() {
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);
    const [totalDonationLength, setTotalDonationLength] = useState(0);
    const [showModal, setShowModal] = useState(false);


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
                if (Array.isArray(response.data)) {
                    setTotalDonationLength(response.data.length);
                }
            }
        }
    );
    
    const handleNmtButton = () => {
        window.location.href = '/aboutNMT';
    }

    const NoticeButton = ({ label, color }) => {
        return (
          <div css={s.button(color)}>
            <p css={s.NoticeText}>{label}</p>
            <div css={s.icon}><FaRegArrowAltCircleRight /></div>
          </div>
        );
      };
      
      const handleChannel = () => {
        console.log('a');
      }

      useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal])

    
    
    return (
        <>
        <main css={s.mainLayout}>
            <header css={s.rootheader}>
                <div css={s.headerStyle}>
                    <h1>세상을 위한 따뜻한 마음 <br />NMT와 함께해요 </h1>
                </div>
                <div css={s.introStyle}>
                    {/* <img src={introImg} /> */}
                    {/* <h3>총 기부 {totalDonationLength} 건</h3> */}
                    {/* <img src={introImg2} /> */}
                    {/* <h3>NMT 소개</h3>
                    <button css={s.nmtbutton} onClick={handleNmtButton}><FaArrowCircleRight size="30" /></button> */}
                </div>
            </header>
            <AutoSlide />
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
                            <img css={s.sideImg} src={sideImg} />
                        </div>
                        <div css={s.totalAmountBox}>
                            <h3>총 기부     {totalDonationLength} 건</h3>
                            <h3> ₩ 총 기부금     {totalDonationAmount.toLocaleString()}원</h3>
                        </div>
                    </div>


                    <div css={s.sidebarStyle}>
                   
                        <h2>따뜻한 후기</h2>
                    
                        <CommentShow donationPageId={97} />  
                    </div>
                    
                    <div css={s.sidebarStyle}>
                      
                        <h2>놓치면 아까운 소식</h2>
                    
                        <div css={s.buttonLayout}>  
                            <div css={s.button}>
                                <p css={s.NoticeText}>카카오톡 채널을 추가해보세요!</p>
                                
                                <div css={s.icon}><KakaoChannel /></div>
                            </div>
                            <div css={s.button2}>
                                <p css={s.NoticeText}>챌린지 참여만으로 기부에 참여할 수 있어요!</p>
                                <a href="/main/challenges" css={s.icon}><FaRegArrowAltCircleRight /></a>
                            </div>
                            <div css={s.button}>
                                <p css={s.NoticeText}>모금을 제안하고 싶은 당신을 위한 꿀팁!</p>
                                <button css={s.icon} onClick={()=>setShowModal(!showModal)}><FaRegArrowAltCircleRight /></button>
                                {showModal && (
                                
                                    <div css={s.modal}><DonateTip setShowModal={setShowModal} /></div>
                                 )}
                            </div>
                            <div css={s.button2}>
                                <p css={s.NoticeText}>NMT를 통해 어떤 변화가 이루어질까요?</p>
                                <a href="/aboutNMT" css={s.icon}><FaRegArrowAltCircleRight /></a>
                            </div>
                        </div>
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