/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Progress from "../../components/progress/Progress";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDonationStoryRequest, getProgressAmount, updateDonationPageResponse, getDonationListRequest } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import LikeButton from '../../components/LikeButton/LikeButton';
import NewsPage from './CategoryPage/NewsPage'; // NewsPage 경로 수정
import Story from './CategoryPage/Story'; // Story 경로 수정
import Donators from "./CategoryPage/Donators";
import DonationComment from "../DonationStoryPage/DonationComment/DonationComment";
import DonatorInfo from "../DonatorInfo/DonatorInfo";
import { getTeamInfoRequest } from "../../apis/api/teamApi";
import { getPrincipalRequest } from '../../apis/api/principal';
import ShareButton from "../../components/ShareModal/ShareButton";
import DonationHeader from "./PageHeader/DonationHeader";
import LoginRequiredModal from "../../components/LoginRequiredModal/LoginRequiredModal";
import TopButton from "../../components/TopButton/TopButton";

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    const [donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐
    const [showModal, setshowModal] = useState(false);
    const [userId, setUserId] = useState();
    const [teamInfo, setTeamInfo] = useState();
    const contentRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 표시 상태
    const [modalType, setModalType] = useState(null); // 'login' 또는 'donatorInfo'
    const [visibleDonations, setVisibleDonations] = useState([]);
    const [endDatePassed, setEndDatePassed] = useState(false);


    const handleDonateClick = () => {
        if (!isLoggedIn) {
            setModalType('login');
            setshowModal(true); // 로그인 모달 표시
        } else {
            setModalType('donatorInfo');
            setshowModal(true); // 기부 관련 모달 표시
        }
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        setshowModal(false);
        setModalType(null); // 모달 타입 초기화
    };

    // 로그인 모달 상태 관리
    useEffect(() => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            setShowLoginModal(false);
        }
    }, [isLoggedIn]);


    // 사용자 인증 쿼리
    const principalQuery = useQuery(
        ["principalQuery"],
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId);
                setIsLoggedIn(true); // 사용자 인증 성공 시 로그인 상태를 true로 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
                setIsLoggedIn(false); // 에러 발생 시 로그인 상태를 false로 설정
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

    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => {
            const response = await getDonationListRequest();
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const today = new Date();
                const currentId = String(donationPageId);
                const updatedDonations = data
                    .filter(donation => String(donation.donationPageId) !== currentId && new Date(donation.endDate) > today)
                    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                    .slice(0, 5);
                setVisibleDonations(updatedDonations);
                console.log("Filtered and Sorted Donations:", updatedDonations);
            },
            onError: (error) => {
                console.error("Failed to fetch donations:", error);
            }
        }
    );
    

    useEffect(() => {
    }, [visibleDonations]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonationStoryRequest({ page: donationPageId });
                setDonationPage(response.data);
            } catch (error) {
                console.error(error);
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


    const { storyContent, storyTitle, mainImgUrl, createDate, endDate } = donationPage || {};

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);
    useEffect(() => {
        if (donationPage.endDate) {
            const endDate = new Date(donationPage.endDate);
            const today = new Date();
            setEndDatePassed(endDate < today);
        }
    }, [donationPage.endDate]);


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
                                <div>

                                <button
                                    css={endDatePassed ? { ...s.donation, ...s.disabledDonateButtonStyle } : s.donation}
                                    onClick={handleDonateClick}
                                    disabled={endDatePassed}
                                    >기부하기
                                </button>
                                    </div>

                                <div css={s.likebutton1}>
                                    <span>
                                        <LikeButton donationPageId={donationPageId} />
                                    </span >
                                    <span ><ShareButton donationPage={donationPage}
                                     /> 공유</span>
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
                                                }  />
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

            <div>
                <div className="modal-overlay">
                    {showModal && modalType === 'login' && (
                        <div css={s.cardStyle}>
                            <LoginRequiredModal setShowModal={handleCloseModal} />
                        </div>
                    )}
                    {showModal && modalType === 'donatorInfo' && (
                        <div>
                            <DonatorInfo setShowModal={handleCloseModal} />
                        </div>
                    )}
                </div>
            </div>


            <TopButton />
        </div>

    );
}

export default DonationStoryPage;