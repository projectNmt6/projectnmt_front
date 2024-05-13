import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getChallengeList } from '../../../apis/api/DonationAPI';
import { useQuery, useQueryClient } from 'react-query';
import { getTeamInfoRequest, getTeamListRequest } from '../../../apis/api/teamApi';
import { FaPen } from "react-icons/fa6";
import { getPrincipalRequest } from '../../../apis/api/principal';

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
                },
                onError: error => {
                    console.log(error);
                }
            }
        );

        const principalQuery = useQuery(
            ["principalQuery"],
            getPrincipalRequest,
            {
                retry: 0,
    
                refetchOnWindowFocus: false,
                onSuccess: (response) => {
                    console.log("Auth", response.data);
                    setUserId(response.data.userId);
                },
                onError: (error) => {
                    console.error("Authentication error", error);
                }
            }
        );
        const [userId, setUserId] = useState();
        const navigate = useNavigate(); // Hook from React Router for navigation
    
        const handleDonationProposalClick = () => {
            if (userId) {
                navigate('/main/challenge/write'); // Use navigate for SPA behavior
            } else {
                navigate('/auth/signin'); // Redirect to signin if not authenticated
            }
        }
    return (
        <>
        <div css={s.mainLayout}>

            <div css={s.writeStyles} onClick={handleDonationProposalClick}>
                <div css={s.write}>                   
                        <FaPen color="black" size={14} /> 작성하기 
                </div>
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
