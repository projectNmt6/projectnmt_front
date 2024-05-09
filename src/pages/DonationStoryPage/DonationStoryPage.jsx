
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Progress from "../../components/progress/Progress";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getDonationNewsRequest, updatePageRequest, getDonationStoryRequest, getProgressAmount, updateDonationPageResponse, registerNewsPage, getDonationListRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import LikeButton from '../../components/LikeButton/LikeButton';
import axios from 'axios';
import NewsPage from './CategoryPage/NewsPage'; // NewsPage 경로 수정
import Story from './CategoryPage/Story'; // Story 경로 수정
import { shareKakao } from '../../apis/utils/shareKakaoLink';
import Donators from "./CategoryPage/Donators";
import DonationComment from "../DonationStoryPage/DonationComment/DonationComment";
import DonatorInfo from "../DonatorInfo/DonatorInfo";
import { getTeamInfoRequest } from "../../apis/api/teamApi";
import { RxShare2 } from "react-icons/rx";
import { getPrincipalRequest } from '../../apis/api/principal';
import ShareButton from "../../components/ShareModal/ShareButton";
import DonationHeader from "./PageHeader/DonationHeader";
import { div } from "../DonatorInfo/style";
function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    const [donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const donationCommentId = queryParams.get('commentId')
    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐
    const [showModal, setshowModal] = useState(false);
    const [userId, setUserId] = useState();
    const [teamInfo, setTeamInfo] = useState();
    const contentRef = useRef(null);


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


    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId],
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log(data);
                setDonationPage(data);
            }
        }
    );


    useEffect(() => {
        commentResponse({ params: { donationPageId } })
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);


    const { storyContent, storyTitle, mainImgUrl, createDate, endDate } = donationPage || {};

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);

    const deleteMutationButton = useMutation({
        mutationKey: "deleteMutationButton",
        mutationFn: deleteDonationPage,
        onSuccess: response => {
            alert("삭제완료")
            window.location.replace("/main");
        },
        onError: error => {
            alert("삭제 권한이 없습니다")
        }
    })


    const getTeamInfoMutation = useQuery(
        ["getTeamInfoMutation"],
        async () => {
            console.log(donationPage);
            const response = await getTeamInfoRequest({ teamId: donationPage.teamId });
            return response;
        },
        {
            refetchOnWindowFocus: false,
            enabled: !!donationPage.teamId,
            onSuccess: response => {
                console.log(response.data);
                setTeamInfo(() => response.data);
            }
        }
    );

    const getUpdatePageBUtton = useMutation({
        mutationKey: "getUpdatePageBUtton",
        mutationFn: updateDonationPageResponse,
        onSuccess: response => {
            console.log(response)
            window.location.replace(`/main/donation/update?page=${donationPageId}`)
        },
        onError: error => {
            alert("잘못된 접근입니다.")
            console.log(error)
        }
    })

    const handleUpdateButtonClick = () => {
        getUpdatePageBUtton.mutate({ donationPageId: donationPageId })
    }

    const handleDeleteButtonClick = () => {
        console.log("삭제 시도:", donationPageId);
        deleteMutationButton.mutate({ donationPageId: donationPageId });
    }

    const getamountQuery = useQuery(
        ["getamountQuery", donationPageId],
        async () => {
            return await getProgressAmount(donationPageId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setGoalAmount(data.data.goalAmount);
                setCurrentAmount(data.data.addAmount);
            },
        }
    )
    const calculateDaysRemaining = (startDate, endDate) => {
        const today = new Date();
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        startDateTime.setHours(0, 0, 0, 0);

        const timeRemaining = Math.ceil((endDateTime - today) / (1000 * 60 * 60 * 24));
        if (timeRemaining <= 0) {
            return "종료";
        } else {
            return `${timeRemaining}일 남음`;
        }
    };

    const [visibleDonations, setVisibleDonations] = useState([]);
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => {
            const allDonationsResponse = await getDonationListRequest();
            console.log("All Donations:", allDonationsResponse); // Log to check structure
            if (allDonationsResponse && Array.isArray(allDonationsResponse.data)) {
                // Filter out the current page from the donations list
                return allDonationsResponse.data.filter(donation => donation.donationPageId !== donationPageId);
            }
            return []; // Return an empty array if data is not in expected format
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (filteredDonations) => {
                console.log("Filtered Donations:", filteredDonations); // Log to verify data
                const today = new Date();
                const updatedDonationList = filteredDonations.filter(donation => {
                    const endDate = new Date(donation.endDate);
                    return endDate > today;
                }).map(donation => {
                    const endDate = new Date(donation.endDate);
                    const timeDiff = endDate - today;
                    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    return {
                        ...donation,
                        timeOut: daysLeft < 3,
                    };
                });
                setVisibleDonations(updatedDonationList);
            }
        }
    );
    
    useEffect(() => {
        async function fetchDonations() {
            try {
                const allDonationsResponse = await getDonationListRequest();
                if (allDonationsResponse && Array.isArray(allDonationsResponse.data)) {
                    const today = new Date();
                    // 필터링 로직 개선: `donationPageId`를 문자열로 처리
                    const currentId = String(donationPageId); // 페이지 ID를 문자열로 변환
                    const filteredAndSortedDonations = allDonationsResponse.data
                        .filter(donation => String(donation.donationPageId) !== currentId && new Date(donation.endDate) > today)
                        .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                        .slice(0, 5);
    
                    setVisibleDonations(filteredAndSortedDonations);
                }
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            }
        }
    
        fetchDonations();
    }, [donationPageId]);
    

    
    useEffect(() => {
        console.log("visibleDonations updated: ", visibleDonations);
    }, [visibleDonations]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonationStoryRequest({ page: donationPageId });
                setDonationPage(response.data);
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }

    useEffect(() => {
        if (donationPage && donationPage.endDate) {
            const endDate = new Date(donationPage.endDate);
            const today = new Date();
            if (endDate < today) {
                setSelectedTab('news');
            }
        }
    }, [donationPage]);


    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal])


    const handleNewsButtonClick = () => {
        console.log('PageID:', donationPageId);
        window.location.replace(`/main/donation/news?page=${donationPageId}`);
    };

    return (
        <div>
            <DonationHeader
                contentRef={contentRef}
                donationPageId={donationPageId}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
            />
            <div css={s.contentAreaStyle}>
                <div css={s.leftCardLayout}>                  

                    <div css={s.storyContent}>
                        <div css={s.main}>
                            <img src={donationPage.mainImgUrl} alt="Story" css={s.storyImage} />

                        </div>
                    </div>
                    <div>
                        <div ref={contentRef} css={s.buttonGroupContainer}>
                            <div css={s.buttonGroup}>
                                <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                                <button css={s.button4} onClick={() => handleTabChange('donators')}>Donators</button>
                                <button css={s.button4} onClick={() => handleTabChange('news')}>News</button>
                            </div>
                        </div>
                        <div >
                            <div >
                                {selectedTab === 'story' ?
                                    <Story />
                                    : selectedTab === 'news' ?
                                        <NewsPage donationPageId={donationPageId} />
                                        : <Donators donationPageId={donationPageId} />}
                            </div>
                        </div >
                        <div css={s.commentBorder}>
                            <h3>덧글</h3>
                        </div>
                        <DonationComment donationPageId={donationPageId} />

                    </div>
                </div>


                <div css={s.rightCardLayout}>
                    <div css={s.sidebarStyle2}>

                        <h1>{donationPage.storyTitle}</h1>
                        <div css={s.actingCount}>{currentAmount}원</div>
                        <div css={s.headCountCss}>{donationPage.goalAmount}원 목표</div>

                        <Progress pageId={donationPageId} />
                        <div>
                            <div >기부 시작일: {donationPage.createDate ? donationPage.createDate.substring(0, 10) : ''}</div>
                            <div >기부 종료일: {calculateDaysRemaining(donationPage.createDate, donationPage.endDate)}</div>
                            <div >기부금은 100% 단체에 전달됩니다.</div>
                            <div css={s.likebutton}>
                                <button css={s.donation} onClick={() => setshowModal(!showModal)}>기부하기</button>
                                <div css={s.likebutton1}>
                                    <span>
                                        <LikeButton donationPageId={donationPageId} />
                                    </span >
                                    <span ><ShareButton /> 공유</span>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div css={s.teamInfo}>
                        <div css={s.teamName}>
                            <img css={s.teamLogo} src={teamInfo?.teamLogoImgUrl} alt="" />
                            {teamInfo?.teamName}</div>
                        <div css={s.teamText}>{teamInfo?.teamInfoText}</div>
                    </div>


                    <div css={s.sidebarStyle}>
                        <div css={s.actionText}> 같이 기부해요</div>
                        {
                            visibleDonations.slice(0, 5).map(
                                donation => (
                                    <a href={`/donation?page=${donation.donationPageId}`}
                                        key={donation.donationPageId} css={s.linkStyle}>
                                        <div key={donation.donationPageId} css={s.donationCard}>
                                            <div css={s.minidonationImage}>
                                                <img src={
                                                    donation.mainImgUrl
                                                } alt="" />
                                            </div>
                                            <div css={s.donationDetails}>
                                                <div css={s.donationTitle}>
                                                    <div>{donation.storyTitle}</div>
                                                </div>
                                                <div css={s.teamFont}>{donation.teamName}</div>
                                            </div>
                                        </div>
                                    </a>
                                )
                            )
                        }

                    </div>


                    <div>
                    </div>

                </div>
            </div>
            {showModal && (
                <div >
                    <div ><DonatorInfo setShowModal={setshowModal} /></div>
                </div>
            )}
        </div>


    );
}

export default DonationStoryPage;
