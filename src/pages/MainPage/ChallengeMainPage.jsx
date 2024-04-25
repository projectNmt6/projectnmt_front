import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getChallengeList } from '../../apis/api/DonationAPI';
import { useQuery } from 'react-query';

function ChallengeMainPage() {
    const [challengeList, setChallengeList] = useState([]);

    const getChallengeQuery = useQuery(
        "getChallengeQuery",
        async () => await getChallengeList(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setChallengeList(response.data.map(donation => ({
                    ...donation
                    
                })));
                console.log(response.data)
            }
        }
        );


    return (
        <>
            <div>
                <h1>Main Page</h1>
            </div>
            <div >
                <div css={s.sign}>
                    <Link to={"/signin"}>로그인</Link>
                    <Link to={"/signup"}>회원가입</Link>
                </div>
                <div>
                    <Link to={"/search"} ><FiSearch size={40}/></Link>
                </div>
            </div>
            <div css={s.write}>
                <Link to={"/main/challenge/write"}>작성하기</Link>
            </div>
            <div css={s.donationList}>
                {
                    challengeList.map(
                        challenge => (
                            <a href={`challenge?page=${challenge.challengePageId}`} key={challenge.challengePageId} css={s.linkStyle}>
                                <div css={s.donationCard}>
                                    <div css={s.donationImage}>
                                        <img src={challenge.challengeMainImgUrl || "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"} alt="" />
                                    </div>
                                    <div css={s.donationDetails}>
                                        <h3>{challenge.challengeTitle}</h3>
                                        <p>{challenge.challengeContent}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    )
                }
            </div>
        </>
    );
}

export default ChallengeMainPage;
