/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest, getDonationListByTeamIdRequest, getChallengeListByTeamIdRequest } from "../../apis/api/teamApi";
import { useState } from "react";
import { deleteChallengePage, deleteDonationPage, getDonationNewsRequest } from "../../apis/api/DonationAPI";
import { getChallengeNewsRequest } from "../../apis/api/ChallengeApi";


function TeamInfoPage(props) {
    const [teamInfo, setTeamInfo] = useState();
    const [donationList, setDonationList] = useState([]);
    const [challengeList, setChallengeList] = useState([])
    const [endDonationList, setEndDonationList] = useState([]);
    const [endChallengeList, setEndChallengeList] = useState([])
    const [searchParams] = useSearchParams();
    const teamId = searchParams.get("id");
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    const [visibleDonations, setVisibleDonations] = useState([]);
    const [visibleEndedDonations, setVisibleEndedDonations] = useState([]);
    const [visibleChallenges, setVisibleChallenges] = useState([]);
    const [visibleEndedChallenges, setVisibleEndedChallenges] = useState([]);
    const [currentPageActive, setCurrentPageActive] = useState(1);
    const [currentPageEnded, setCurrentPageEnded] = useState(1);
    const donationsPerPage = 5;
    const ChallengesPerPage = 5;
    const [currentPageActiveChallenge, setCurrentPageActiveChallenge] = useState(1);
    const [currentPageEndedChallenge, setCurrentPageEndedChallenge] = useState(1);

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

    const deleteChallengeMutationButton = useMutation({
        mutationKey: "deleteMutationButton",
        mutationFn: deleteChallengePage,
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
    const handleChallengeDeleteButtonClick = (challengePageId) => {
        alert("삭제되었습니다.")
        deleteChallengeMutationButton.mutate({ challengePageId });
        window.location.reload();
    }

    const [newsData, setNewsData] = useState({});
    const [challengeNewsData, setChallengeNewsData] = useState({});
    const [selectedTab, setSelectedTab] = useState('ongoingStory');

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
        donationList.forEach(donation => {
            const fetchNews = async () => {
                try {
                    const newsResponse = await getDonationNewsRequest(donation.donationPageId);
                    setNewsData(prev => ({
                        ...prev,
                        [donation.donationPageId]: newsResponse.data ? newsResponse.data : null
                    }));
                } catch (error) {
                    console.error('Error fetching news for donation:', error);
                }
            };
            fetchNews();
        });
    }, [donationList]);
    useEffect(() => {
        challengeList.forEach(donation => {
            const fetchNews = async () => {
                try {
                    const newsResponse = await getChallengeNewsRequest(donation.challengePageId);
                    setChallengeNewsData(prev => ({
                        ...prev,
                        [donation.challengePageId]: newsResponse.data ? newsResponse.data : null
                    }));
                } catch (error) {
                    console.error('Error fetching news for donation:', error);
                }
            };
            fetchNews();
        });
    }, [challengeList]);

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
    useEffect(() => {
        challengeList.forEach(challenge => {
            const fetchNews = async () => {
                try {
                    const newsResponse = await getChallengeNewsRequest(challenge.challengePageId);
                    setNewsData(prev => ({
                        ...prev,
                        [challenge.challengePageId]: newsResponse.data ? newsResponse.data : null
                    }));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchNews();
        });
    }, [challengeList]);
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    const handleLoadMoreActiveChallenge = () => {
        const nextPage = currentPageActiveChallenge + 1;
        const startIndex = currentPageActiveChallenge * ChallengesPerPage;
        const endIndex = startIndex + ChallengesPerPage;
        const moreChallenges = challengeList.slice(startIndex, endIndex);
        setVisibleChallenges(prev => [...prev, ...moreChallenges]);
        setCurrentPageActiveChallenge(nextPage);
    };

    const handleLoadMoreEndedChallenge = () => {
        const nextPage = currentPageEndedChallenge + 1;
        const startIndex = currentPageEndedChallenge * ChallengesPerPage;
        const endIndex = startIndex + ChallengesPerPage;
        const moreChallenges = endChallengeList.slice(startIndex, endIndex);
        setVisibleEndedChallenges(prev => [...prev, ...moreChallenges]);
        setCurrentPageEndedChallenge(nextPage);
    };

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
                    {teamInfo?.teamMembers.filter(teamMember => teamMember.userId === principalData?.data?.userId)[0]?.teamRoleId === 1
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

                                                            <button css={s.button4}><Link css={s.link2} to={`/main/donation/update?page=${donation.donationPageId}`}>수정하기</Link></button>
                                                            {/* <button css={s.button6} onClick={() => handleDeleteButtonClick(donation.donationPageId)}>삭제하기</button> */}

                                                            {newsData[donation.donationPageId] ? (
                                                                <button css={s.button5}>
                                                                    <Link css={s.link2} to={`/main/donation/news/update?page=${donation.donationPageId}`}>
                                                                        후기수정</Link>
                                                                </button>

                                                            ) : (
                                                                <button css={s.button4}>

                                                                    <Link css={s.link2} to={`/main/donation/news?page=${donation.donationPageId}`}>
                                                                        후기작성
                                                                    </Link>
                                                                </button>
                                                            )}
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

                                                                <button css={s.button4}><Link css={s.link2} to={`/main/donation/update?page=${donation.donationPageId}`}>수정하기</Link></button>
                                                                <button css={s.button6} onClick={() => handleDeleteButtonClick(donation.donationPageId)}>삭제하기</button>

                                                                {newsData[donation.donationPageId] ? (
                                                                    <button css={s.button5}>
                                                                        <Link css={s.link2} to={`/main/donation/news/update?page=${donation.donationPageId}`}>
                                                                            후기수정</Link>
                                                                    </button>

                                                                ) : (
                                                                    <button css={s.button4}>

                                                                        <Link css={s.link2} to={`/main/donation/news?page=${donation.donationPageId}`}>
                                                                            후기작성
                                                                        </Link>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            {endDonationList.length > visibleEndedDonations.length && (
                                                <button css={s.button4} onClick={handleLoadMoreEnded}>더 보기</button>
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

                                                                <button css={s.button4}><Link css={s.link2} to={`/challenge/update?page=${challenge.challengePageId}`}>수정하기</Link></button>
                                                                {/* <button css={s.button6} onClick={() => handleChallengeDeleteButtonClick(challenge.challengePageId)}>삭제하기</button> */}

                                                                {newsData[challenge.challengePageId] ? (
                                                                    <button css={s.button5}>
                                                                        <Link css={s.link2} to={`/main/challenge/news/update?page=${challenge.challengePageId}`}>
                                                                            후기수정</Link>
                                                                    </button>

                                                                ) : (
                                                                    <button css={s.button4}>

                                                                        <Link css={s.link2} to={`/main/challenge/news?page=${challenge.challengePageId}`}>
                                                                            후기작성
                                                                        </Link>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            {challengeList.length > visibleChallenges.length && (
                                                <button css={s.moreLoad} onClick={handleLoadMoreActiveChallenge}>더 보기</button>
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

                                                                <button css={s.button4}><Link css={s.link2} to={`/main/challenge/update?page=${challenge.challengePageId}`}>수정하기</Link></button>
                                                                {/* <button css={s.button6} onClick={() => handleChallengeDeleteButtonClick(challenge.challengePageId)}>삭제하기</button> */}

                                                                {challengeNewsData[challenge.challengePageId] ? (
                                                                    <button css={s.button5}>
                                                                        <Link css={s.link2} to={`/main/challenge/news/update?page=${challenge.challengePageId}`}>
                                                                            후기수정</Link>
                                                                    </button>

                                                                ) : (
                                                                    <button css={s.button4}>
                                                                        <Link css={s.link2} to={`/main/challenge/news?page=${challenge.challengePageId}`}>
                                                                            후기작성
                                                                        </Link>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            {endChallengeList.length > visibleEndedChallenges.length && (
                                                <button css={s.moreLoad} onClick={handleLoadMoreEndedChallenge}>더 보기</button>
                                            )}
                                        </div>
                                    </div>
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
    );
}

export default TeamInfoPage;