/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import React, { useState } from 'react';
import { getDonationListByTeamIdRequest } from "../../apis/api/teamApi";
import { Link, useLocation } from "react-router-dom";
import { updatePageShowRequest } from "../../apis/api/teamApi";

function TeamStoryManagepage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const [donationList, setDonationList] = useState([]);
    const [endDonationList, setEndDonationList] = useState([]);
    const getDonationListRequest = useQuery(
        ["getDonationListByTeamIdRequest"],
        async () => {
            return await getDonationListByTeamIdRequest({
                teamId: teamInfo.teamId
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
    const updateDonationShowMutation = useMutation({
        mutationKey: "updateDonationShowMutation",
        mutationFn: updatePageShowRequest,
        onSuccess: response => {
            alert("수정완료.");
        },
        onError: error => {}
    }) 
    const pagePermitButtonOnClick = (id) => {
        updateDonationShowMutation.mutate({pageId: id});
    }
    return (
            <div>
                <div><h2>진행중인 스토리</h2>
                    {
                        donationList.map(donation => 
                        <>
                            <div >
                            <Link to={`/donation?page=${donation.donationPageId}`}>
                                <img  src={donation.mainImgUrl} alt="" />
                            </Link>
                            <div>{donation.storyTitle}</div>
                            <Link  to={`/main/donation/update?page=${donation.donationPageId}`}>수정하기</Link>
                            </div>
                            <button onClick={() => pagePermitButtonOnClick(donation.donationPageId, 3)}>삭제 요청</button>
                        </>)
                    }
                </div>
                <div>
                    <h2>스토리 내역</h2>
                    {
                        endDonationList.map(donation => <>
                            <div >
                            <Link to={`/donation?page=${donation.donationPageId}`}>
                                <img  src={donation.mainImgUrl} alt="" />
                            </Link>
                            <div>{donation.storyTitle}</div>
                            { 1 > 0 ? <Link to={`/main/donation/donationnews?page=${donation.donationPageId}&teamId=${donation.teamId}`}>후기 작성하기</Link> 
                            : <Link to={`/main/donation/news/update?page=${donation.donationPageId}`}>후기수정하기</Link> }
                            </div>
                            <button onClick={() => pagePermitButtonOnClick(donation.donationPageId)}>삭제 요청</button>

                        </>)
                    }
                </div>
        </div>
    );
}

export default TeamStoryManagepage;