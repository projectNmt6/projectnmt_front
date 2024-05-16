/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { getChallengeListByTeamIdRequest, getDonationListByTeamIdRequest, getTeamInfoRequest } from "../../apis/api/teamApi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { updatePageShowRequest } from "../../apis/api/teamApi";

function TeamStoryManagepage() {
    const [donationList, setDonationList] = useState([]);
    const [endDonationList, setEndDonationList] = useState([]);
    const [teamInfo, setTeamInfo] = useState();
    const [challengeList, setChallengeList] = useState([])
    const [visibleDonations, setVisibleDonations] = useState([]);
    const [visibleEndedDonations, setVisibleEndedDonations] = useState([]);
    const [visibleChallenges, setVisibleChallenges] = useState([]);
    const [visibleEndedChallenges, setVisibleEndedChallenges] = useState([]);
    const [currentPageActive, setCurrentPageActive] = useState(1);
    const [currentPageEnded, setCurrentPageEnded] = useState(1);
    const donationsPerPage = 5;
    const ChallengesPerPage = 5;
    const [selectedTab, setSelectedTab] = useState('ongoingStory');
    const [searchParams] = useSearchParams();
    const teamId = searchParams.get("id");
    const [endChallengeList, setEndChallengeList] = useState([])


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

    useQuery(
        ["getChallengeListByTeamIdRequest"],
        async () => {
            return await getChallengeListByTeamIdRequest({
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
                setChallengeList(tempList);
                setEndChallengeList(tempEndList);

                // 초기화 시 첫 페이지 데이터 세팅
                setVisibleChallenges(tempList.slice(0, ChallengesPerPage));
                setVisibleEndedChallenges(tempEndList.slice(0, ChallengesPerPage));
            }
        }
    );

    const handleLoadMoreEnded = () => {
        const nextPage = currentPageEnded + 1;
        const startIndex = currentPageEnded * donationsPerPage;
        const endIndex = startIndex + donationsPerPage;
        const moreDonations = endDonationList.slice(startIndex, endIndex);
        setVisibleEndedDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageEnded(nextPage);
    };
    useEffect(() => {
        const loadTeamAndDonations = async () => {
            try {
                const teamInfoData = await getTeamInfoRequest({ teamId });
                setTeamInfo(teamInfoData.data);

                const donationsData = await getDonationListByTeamIdRequest({ teamId });
                setDonationList(donationsData.data);
                setEndDonationList(donationsData.data.filter(donation => new Date(donation.endDate) < new Date()));
            } catch (error) {
                console.error(error);
            }
        };

        loadTeamAndDonations();
    }, [teamId]);



    useEffect(() => {
        const loadTeamAndChallenges = async () => {
            try {
                const teamInfoData = await getTeamInfoRequest({ teamId });
                setTeamInfo(teamInfoData.data);

                const challengeData = await getChallengeListByTeamIdRequest({ teamId });
                setChallengeList(challengeData.data);
                setEndChallengeList(challengeData.data.filter(challenge => new Date(challenge.endDate) < new Date()));
            } catch (error) {
                console.error(error);
            }
        };

        loadTeamAndChallenges();
    }, [teamId]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    const [currentPageChallengeActive, setCurrentPageChallengeActive] = useState(1);
    const [currentPageChallengeEnded, setCurrentPageChallengeEnded] = useState(1);

    // Existing useEffect and other logic...

    const handleLoadMoreChallengeActive = () => {
        const nextPage = currentPageChallengeActive + 1;
        const startIndex = (nextPage - 1) * ChallengesPerPage;
        const endIndex = startIndex + ChallengesPerPage;
        const moreChallenges = challengeList.slice(startIndex, endIndex);
        setVisibleChallenges(prev => [...prev, ...moreChallenges]);
        setCurrentPageChallengeActive(nextPage);
    };

    const handleLoadMoreChallengeEnded = () => {
        const nextPage = currentPageChallengeEnded + 1;
        const startIndex = (nextPage - 1) * ChallengesPerPage;
        const endIndex = startIndex + ChallengesPerPage;
        const moreChallenges = endChallengeList.slice(startIndex, endIndex);
        setVisibleEndedChallenges(prev => [...prev, ...moreChallenges]);
        setCurrentPageChallengeEnded(nextPage);
    };
    useEffect(() => {
        const loadTeamAndDonations = async () => {
            try {
                const teamInfoData = await getTeamInfoRequest({ teamId });
                setTeamInfo(teamInfoData.data);
    
                const donationsData = await getDonationListByTeamIdRequest({ teamId });
                setDonationList(donationsData.data);
                setEndDonationList(donationsData.data.filter(donation => new Date(donation.endDate) < new Date()));
    
                // Set initial visible donations
                setVisibleDonations(donationsData.data.slice(0, donationsPerPage));
                setVisibleEndedDonations(donationsData.data.filter(donation => new Date(donation.endDate) < new Date()).slice(0, donationsPerPage));
            } catch (error) {
                console.error(error);
            }
        };
    
        loadTeamAndDonations();
    }, [teamId]);
    
    useEffect(() => {
        const loadTeamAndChallenges = async () => {
            try {
                const challengeData = await getChallengeListByTeamIdRequest({ teamId });
                setChallengeList(challengeData.data);
                setEndChallengeList(challengeData.data.filter(challenge => new Date(challenge.endDate) < new Date()));
    
                // Set initial visible challenges
                setVisibleChallenges(challengeData.data.slice(0, ChallengesPerPage));
                setVisibleEndedChallenges(challengeData.data.filter(challenge => new Date(challenge.endDate) < new Date()).slice(0, ChallengesPerPage));
            } catch (error) {
                console.error(error);
            }
        };
    
        loadTeamAndChallenges();
    }, [teamId]);
    
    const handleLoadMoreActive = () => {
        const nextPage = currentPageActive + 1;
        const startIndex = currentPageActive * donationsPerPage;
        const endIndex = startIndex + donationsPerPage;
        const moreDonations = donationList.slice(startIndex, endIndex);
        setVisibleDonations(prev => [...prev, ...moreDonations]);
        setCurrentPageActive(nextPage);
    };
    return (
        <div>
            <div css={s.layout}>
                <div >
                    <div>
                        <div>
                            <div>
                                <div css={s.buttonGroup}>
                                    <button css={s.buttonText} onClick={() => handleTabChange('ongoingStory')}>진행중 스토리</button>
                                    <button css={s.buttonText} onClick={() => handleTabChange('completedStory')}>종료된 스토리</button>
                                    <button css={s.buttonText} onClick={() => handleTabChange('ongoingChallenge')}>진행중 챌린지</button>
                                    <button css={s.buttonText} onClick={() => handleTabChange('completedChallenge')}>종료된 챌린지</button>
                                </div>

                                <div>
                                    {selectedTab === 'ongoingStory' && (
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
                                                                <button css={s.button4} onClick={() => pagePermitButtonOnClick(donation.donationPageId)}>삭제 요청</button>

                                                            </div>


                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div>

                                                {donationList.length > visibleDonations.length && (
                                                    <button css={s.moreLoad} onClick={handleLoadMoreActive}>더 보기</button>
                                                )}
                                            </div>

                                        </div>
                                    )}
                                    {selectedTab === 'completedStory' && (
                                        <div>
                                            <div css={s.div3}>
                                                <h2>종료된 스토리 내역</h2>
                                                {
                                                    visibleEndedDonations.map(donation =>
                                                        <div css={s.div4} key={donation.donationPageId}>
                                                            <Link to={`/donation?page=${donation.donationPageId}`}>
                                                                <img css={s.link1} src={donation.mainImgUrl} alt="" />
                                                            </Link>
                                                            <div>

                                                                <div>{donation.storyTitle}</div>

                                                                <div>

                                                                    <button css={s.button4} onClick={() => pagePermitButtonOnClick(donation.donationPageId)}>삭제 요청</button>


                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                                {endDonationList.length > visibleEndedDonations.length && (
                                                    <button css={s.moreLoad} onClick={handleLoadMoreEnded}>더 보기</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {selectedTab === 'ongoingChallenge' && (
                                        <div>
                                            <div css={s.div3}>
                                                <h2>진행중 챌린지 내역</h2>
                                                {
                                                    visibleChallenges.map(challenge =>
                                                        <div css={s.div4} key={challenge.challengePageId}>
                                                            <Link to={`/main/challenge?page=${challenge.challengePageId}`}>
                                                                <img css={s.link1} src={challenge.challengeMainImg} alt="" />
                                                            </Link>
                                                            <div>

                                                                <div>{challenge.challengeTitle}</div>

                                                                <div>

                                                                    <button css={s.button4} onClick={() => pagePermitButtonOnClick(challenge.challengePageId)}>삭제 요청</button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                                {challengeList.length > visibleChallenges.length && (
                                                    <button css={s.moreLoad} onClick={handleLoadMoreChallengeActive}>더 보기</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {selectedTab === 'completedChallenge' && (
                                        <div>
                                            <div css={s.div3}>
                                                <h2>종료된 챌린지</h2>
                                                {
                                                    visibleEndedChallenges.map(challenge =>
                                                        <div css={s.div4} key={challenge.challengePageId}>
                                                            <Link to={`/main/challenge?page=${challenge.challengePageId}`}>
                                                                <img css={s.link1} src={challenge.challengeMainImg} alt="" />
                                                            </Link>
                                                            <div>

                                                                <div>{challenge.challengeTitle}</div>

                                                                <div>

                                                                    <button css={s.button4} onClick={() => pagePermitButtonOnClick(challenge.challengePageId)}>삭제 요청</button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                            </div>
                                        </div>
                                    )}
                                    {endChallengeList.length > visibleEndedChallenges.length && (
                                        <button css={s.moreLoad} onClick={handleLoadMoreChallengeEnded}>더 보기</button>
                                    )}
                                </div>



                            </div>
                            <div >

                                <div >

                                </div>
                                <div >

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
}

export default TeamStoryManagepage;