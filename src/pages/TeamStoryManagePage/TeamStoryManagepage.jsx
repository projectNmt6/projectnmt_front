/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { getDonationListByTeamIdRequest } from "../../apis/api/teamApi";
import { Link, useLocation } from "react-router-dom";
import { updatePageShowRequest } from "../../apis/api/teamApi";

function TeamStoryManagepage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const [donationList, setDonationList] = useState([]);
    const [endDonationList, setEndDonationList] = useState([]);
    const [currentPageActive, setCurrentPageActive] = useState(1);
    const [currentPageEnded, setCurrentPageEnded] = useState(1);
    const itemsPerPage = 5; // 페이지당 항목 수 설정
    const [visibleDonations, setVisibleDonations] = useState([]);
    const [visibleEndedDonations, setVisibleEndedDonations] = useState([]);


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
        onError: error => { }
    })
    const pagePermitButtonOnClick = (id) => {
        updateDonationShowMutation.mutate({ pageId: id });
    }
    const handleLoadMoreActive = () => {
        const nextPage = currentPageActive + 1;
        const startIndex = currentPageActive * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moreDonations = donationList.slice(startIndex, endIndex);
        setVisibleDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageActive(nextPage);
    };

    const handleLoadMoreEnded = () => {
        const nextPage = currentPageEnded + 1;
        const startIndex = currentPageEnded * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moreDonations = endDonationList.slice(startIndex, endIndex);
        setVisibleEndedDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageEnded(nextPage);
    };

    useEffect(() => {
        if (donationList.length > 0) {
            setVisibleDonations(donationList.slice(0, itemsPerPage));
        }
        if (endDonationList.length > 0) {
            setVisibleEndedDonations(endDonationList.slice(0, itemsPerPage));
        }
    }, [donationList, endDonationList]);

    return (
        <div>
            <div css={s.layout}>
                <div><h2>진행중인 스토리</h2>
                    {
                        visibleDonations.map(donation => (
                            <div key={donation.donationPageId}>
                                <Link to={`/donation?page=${donation.donationPageId}`}>
                                    <img src={donation.mainImgUrl} css={s.mainImgUrl} />
                                </Link>
                                <div css={s.buttonBox}>

                                <div>{donation.storyTitle}</div>
                                <button css={s.deleteButton} onClick={() => pagePermitButtonOnClick(donation.donationPageId)}>삭제 요청</button>
                                </div>
                            </div>
                        ))
                    }
                    <div css={s.buttonBox}>
                    {
                        donationList.length > visibleDonations.length && (
                            <button onClick={handleLoadMoreActive} css={s.moreButton}>더 보기</button>
                        )
                    }
                    </div>
                </div>
                <div>
                    <h2>스토리 내역</h2>

                    {
                        visibleEndedDonations.map(donation => (
                            <div key={donation.donationPageId}>
                                <Link to={`/donation?page=${donation.donationPageId}`}>
                                    <img src={donation.mainImgUrl} alt="" css={s.mainImgUrl} />
                                </Link>
                                <div>{donation.storyTitle}</div>
                                <button onClick={() => pagePermitButtonOnClick(donation.donationPageId)}>삭제 요청</button>
                            </div>
                        ))
                    }

                    <div css={s.buttonBox}>

                    {
                        endDonationList.length > visibleEndedDonations.length && (
                            <button onClick={handleLoadMoreEnded} css={s.moreButton}>더 보기</button>
                        )
                    }
                    </div>

                </div>
            </div></div>
    );
}

export default TeamStoryManagepage;