import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getChallengeList } from '../../../apis/api/DonationAPI';
import { useQuery, useQueryClient } from 'react-query';
import { getTeamInfoRequest, getTeamListRequest } from '../../../apis/api/teamApi';
import { PiPencilLineThin } from "react-icons/pi";
function ChallengeMainPage() {
    const [challengeList, setChallengeList] = useState([]);

        const [teamInfo, setTeamInfo] = useState();
        const [searchParams] = useSearchParams();
        const teamId = searchParams.get("id");
        const queryClient = useQueryClient();
        const principalData = queryClient.getQueryData("principalQuery");
        const getTeamInfoQuery = useQuery(
            ["getTeamListQuery"],
            async () => {
                return await getTeamInfoRequest({
                    teamId: teamId
                })
            },
            {
                refetchOnWindowFocus: false,
                onSuccess: response => {
                    setTeamInfo(() => response.data);
                },
            }
        );
    const [teamsInfo, setTeamsInfo] = useState({});

        const getChallengeQuery = useQuery(
            "getChallengeQuery",
            async () => await getChallengeList(),
            {
                refetchOnWindowFocus: false,
                onSuccess: response => {
                    setChallengeList(response.data);
                    // 팀 정보를 가져오는 부분
                    response.data.forEach(challenge => {
                        getTeamInfoRequest({ teamId: challenge.teamId }).then(teamResponse => {
                            setTeamsInfo(prev => ({
                                ...prev,
                                [challenge.teamId]: teamResponse.data
                            }));
                        });
                    });
                    console.log(response.data)
                }
            }
        );


    return (
        <>
        <div css={s.mainLayout}>

            <div css={s.writeStyles}>
                <Link to="/main/challenge/write" css={s.linkStyles}>
                    <PiPencilLineThin css={s.iconStyles} />
                    작성하기
                </Link>
            </div>
            
            <div css={s.donationList}>
                {
                    challengeList.map(
                    (challenge, index) => (
                        <a href={`challenge?page=${challenge.challengePageId}`} key={challenge.challengePageId} 
                        css={index < 2 ? s.bigDonationCard : s.smallDonationCard}>
                        <div css={s.donationImage}>
                            <img src={
                            !challenge.challengeMainImg 
                            ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                            : challenge.challengeMainImg 
                            } alt="" />
                        </div>
                        <div css={s.title}>{challenge.challengeTitle}</div> 
                        {teamsInfo[challenge.teamId] && (
                        <div css={s.teamName}>
                            <img css={s.teamLogo} src={teamsInfo[challenge.teamId].teamLogoImgUrl} alt="" />
                            <div css={s.teamInfo}>{teamsInfo[challenge.teamId].teamName}</div>
                        </div>
                        )}
                        </a>
                        
                    )
                    )
                }
                </div>

            
        </div>
        </>
    );
}

export default ChallengeMainPage;
