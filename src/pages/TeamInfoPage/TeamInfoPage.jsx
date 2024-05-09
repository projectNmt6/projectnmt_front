/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest, getDonationListByTeamIdRequest } from "../../apis/api/teamApi";
import { useState } from "react";
import { now } from 'moment/moment';
import { deleteDonationPage } from "../../apis/api/DonationAPI";
import { TbWindmill } from "react-icons/tb";


function TeamInfoPage(props) {
    const [teamInfo, setTeamInfo] = useState();
    const [donationList, setDonationList] = useState([]);
    const [endDonationList, setEndDonationList] = useState([]);
    const [searchParams] = useSearchParams();
    const teamId = searchParams.get("id");
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    const [visibleDonations, setVisibleDonations] = useState([]);
    const [visibleEndedDonations, setVisibleEndedDonations] = useState([]);
    const [currentPageActive, setCurrentPageActive] = useState(1);
    const [currentPageEnded, setCurrentPageEnded] = useState(1);
    const donationsPerPage = 5;



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
    useQuery(
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

                const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
                let tempList = [];
                let tempEndList = [];
                response.data.forEach(arr => {
                    if (new Date(arr.endDate) >= new Date(today)) {
                        tempList.push(arr);
                    } else {
                        tempEndList.push(arr);
                    }
                });
                setDonationList(tempList);
                setEndDonationList(tempEndList);

                // 초기화 시 첫 페이지 데이터 세팅
                setVisibleDonations(tempList.slice(0, donationsPerPage));
                setVisibleEndedDonations(tempEndList.slice(0, donationsPerPage));
            }
        }
    );

    const handleLoadMoreActive = () => {
        const nextPage = currentPageActive + 1;
        const startIndex = currentPageActive * donationsPerPage;
        const endIndex = startIndex + donationsPerPage;
        const moreDonations = donationList.slice(startIndex, endIndex);
        setVisibleDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageActive(nextPage);
    };

    const handleLoadMoreEnded = () => {
        const nextPage = currentPageEnded + 1;
        const startIndex = currentPageEnded * donationsPerPage;
        const endIndex = startIndex + donationsPerPage;
        const moreDonations = endDonationList.slice(startIndex, endIndex);
        setVisibleEndedDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageEnded(nextPage);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    console.log(donationPageId)
    const deleteMutationButton = useMutation({
        mutationKey: "deleteMutationButton",
        mutationFn: deleteDonationPage,
        onSuccess: response => {
            alert("삭제완료")
        },
        onError: error => {
            alert("삭제 권한이 없습니다")
        }
    })
    const handleDeleteButtonClick = (donationPageId) => {
        alert("삭제되었습니다.")
        deleteMutationButton.mutate({ donationPageId });
        window.location.reload();
    }
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
            <div >
                <div>
                    <div>
                        <div css={s.div3}>
                        <h2>진행중인 스토리</h2>
                            {
                                visibleDonations.map(donation =>
                                    <div css={s.div4} key={donation.donationPageId}>
                                        <Link to={`/donation?page=${donation.donationPageId}`}>
                                            <img css={s.link1} src={donation.mainImgUrl} alt="" />
                                        </Link>
                                        <div>

                                        <div>{donation.storyTitle}</div>
                                        
                                        <div>

                                        <button css={s.button4}><Link to={`/main/donation/update?page=${donation.donationPageId}`}>수정하기</Link></button>
                                        <button css={s.button4}><Link to={`/main/donation/news?page=${donation.donationPageId}`}>후기작성</Link></button>
                                        <button css={s.button4} onClick={() => handleDeleteButtonClick(donation.donationPageId)}>삭제하기</button>
                                        
                                        </div>
                                        </div>
                                    </div>
                                )
                            }
                            {donationList.length > visibleDonations.length && (
                                <button css={s.button4} onClick={handleLoadMoreActive}>더 보기</button>
                            )} </div>
                    </div>
                    <div >
                        <h2>스토리 내역</h2>
                        <div css={s.div3}>
                            {
                                visibleEndedDonations.map(donation =>
                                    <div css={s.div4} key={donation.donationPageId}>
                                        <Link to={`/donation?page=${donation.donationPageId}`}>
                                            <img css={s.link1} src={donation.mainImgUrl} alt="" />
                                        </Link>
                                        <div>{donation.storyTitle}</div>
                                    </div>
                                )
                            }
                            {endDonationList.length > visibleEndedDonations.length && (
                                <button css={s.button4} onClick={handleLoadMoreEnded}>더 보기</button>
                            )}
                        </div>
                    </div></div>
            </div>
        </div>
    );
}

export default TeamInfoPage;