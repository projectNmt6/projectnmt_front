/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest, getDonationListByTeamIdRequest } from "../../apis/api/teamApi";
import { useState } from "react";
import { now } from 'moment/moment';


function TeamInfoPage(props) {
    const [teamInfo, setTeamInfo] = useState();
    const [donationList, setDonationList] = useState([]);
    const [endDonationList, setEndDonationList] = useState([]);
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
    const getDonationListRequest = useQuery(
        ["getDonationListByTeamIdRequest"],
        async () => {
            return await getDonationListByTeamIdRequest({
                teamId: teamId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);

                const today = new Date();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                const date = today.getDate();
                let tempList = [];
                let tempEndList = [];
                for (let arr of response.data) {
                    const endDate = arr.endDate.split("T")[0].split("-")[2];
                    const endMonth = arr.endDate.split("T")[0].split("-")[1];
                    const endYear = arr.endDate.split("T")[0].split("-")[0];
                    if ((endYear - year) * 12 * 30 + (endMonth - month) * 30 + (endDate - date) >= 0) {
                        tempList = [...tempList, arr];
                    } else {
                        tempEndList = [...tempEndList, arr];
                    }
                    setDonationList(() => tempList);
                    setEndDonationList(() => tempEndList);
                }
            },
        }
    );

    return (
        <div css={s.layout}>
            <div>
                <div css={s.div1}>
                    <img css={s.img} src={teamInfo?.teamLogoImgUrl} alt="" />
                    <div>
                        <div>{teamInfo?.teamName}</div>
                        <span css={s.span}>프로젝트 팀</span>
                    </div>
                    </div>
                <div css={s.button}>
                    {teamInfo?.teamMembers.filter(teamMember => teamMember.userId === principalData.data.userId)[0]?.teamRoleId === 1
                        ? <Link css={s.link} to={`/team/management?id=${teamId}`} state={{ teamInfo }} >관리하기</Link>
                        : null}
                </div>
                <div css={s.div2}>
                    <span css={s.span}>주요활동 및 정보</span>
                    <div css={s.span2}>{teamInfo?.teamInfoText}</div>
                </div>
            </div>
            <div css={s.div3}>
                <div><h2>진행중인 스토리</h2>
                    {
                        donationList.map(donation => 
                        <>
                            <div css={s.div4}>
                            <Link to={`/donation?page=${donation.donationPageId}`}>
                                <img css={s.link1} src={donation.mainImgUrl} alt="" />
                            </Link>
                            <div>{donation.storyTitle}</div>
                            </div>
                        </>)
                    }
                </div>
                <div>
                    <h2>스토리 내역</h2>
                    {
                        endDonationList.map(donation => <>
                            <div css={s.div4}>
                            <Link to={`/donation?page=${donation.donationPageId}`}>
                                <img css={s.link1} src={donation.mainImgUrl} alt="" />
                            </Link>
                            <div>{donation.storyTitle}</div>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
}

export default TeamInfoPage;