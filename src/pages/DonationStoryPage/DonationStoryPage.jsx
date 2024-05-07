/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Progress from "../../components/progress/Progress";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getDonationNewsRequest, updatePageRequest, getDonationStoryRequest, getProgressAmount, getDonationListRequest, updateDonationPageResponse, registerNewsPage } from '../../apis/api/DonationAPI';
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
import { getDonators } from "../../apis/api/donatorApi";
import { getPrincipalRequest } from '../../apis/api/principal';
import CommentSection from "../DonationStoryPage/DonationComment/DonationComment";

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    const [donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const donationCommentId = queryParams.get('commentId')
    const [comment, setComment] = useState("");
    const [selectedTab, setSelectedTab] = useState('story'); //news, story 중 하나의 값을 가짐
    const [showModal, setShowModal] = useState(false);
    const [teamInfo, setTeamInfo] = useState();
    const [top3Donations, setTop3Donations] = useState([]);
    const [sortedRankings, setSortedRankings] = useState([]);
    const [userId, setUserId ] = useState();

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
        getUpdatePageBUtton.mutate({donationPageId : donationPageId})
    }


    const handleDeleteButtonClick = () => {
    console.log("삭제 시도:", donationPageId);
    deleteMutationButton.mutate({ donationPageId: donationPageId });
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        setComment(value);
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

    const handleCommentSubmit = () => {
        axios.post("http://localhost:8080/comment/upload", {
            donationCommentId: null,
            commentText: comment,
            donationPageId: donationPageId,
            userId: null
        })
            .then(response => {
                alert("전송 완료")
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }


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

    const handleNewsUpdateButton = () => {
    }
    const navigate = useNavigate();

    const getDonatorQuery = useQuery(
        "getDonatorQuery",
        async () => {
            const response = await getDonators();
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const donations = response.data;
                // 1. donationId를 기준으로 그룹화
                const donorGroups = donations.reduce((groups, donation) => {
                    const { donationPageId, donationAmount } = donation;
                    if (!groups[donationPageId]) {
                        groups[donationPageId] = [];
                    }
                    groups[donationPageId].push(donation);
                    return groups;
                }, {});
                // 2. 각 그룹별로 총 기부 금액 계산
                const donationRankings = Object.entries(donorGroups).map(([donationPageId, donations]) => {
                    const totalDonations = donations.reduce((sum, donation) => sum + donation.donationAmount, 0);
                    return { donationPageId, totalDonations };
                });
                // 3. 총 기부 금액 기준 내림차순 정렬
                setSortedRankings(donationRankings.sort((a, b) => b.totalDonations - a.totalDonations));
                const uniqueDonations = donations.reduce((acc, curr) => {
                    if (!acc.some(item => item.donationPageId === curr.donationPageId)) {
                        acc.push(curr);
                    }
                    return acc;
                }, []);
                const sortedDonations = uniqueDonations.sort((a, b) => {
                    const aPageId = sortedRankings.findIndex(item => item.donationPageId === a.donationPageId.toString());
                    const bPageId = sortedRankings.findIndex(item => item.donationPageId === b.donationPageId.toString());
                    return aPageId - bPageId;
                });

                setTop3Donations(sortedDonations.slice(0, 3));
            }
        },
    );
    // 카카오톡 공유 버튼 클릭 이벤트 핸들러 추가
const handleShareKakao = () => {
    const route = window.location.href; // 현재 페이지 URL
    const title = donationPage.storyTitle; // 기부 스토리 제목
    const THU = mainImgUrl;
    const content = "펀펀하게 펀딩하러 가기!"
    const page = donationPageId;

    shareKakao(route, title, THU, content, page);
  };
  
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);
    
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
        console.log('Attempting to mutate with ID:', donationPageId);
        window.location.replace(`/main/donation/news?page=${donationPageId}`);
    };
    return (
    <>
        <div>
            <div css={s.container1}>
                {showModal && (
                    <div css={s.container3}>
                        <div css={s.modal}><DonatorInfo setShowModal={setShowModal}/></div>
                    </div>
                )}
                <div css={s.header}>
                    {/* <Link css={s.link} to={"/main"}>메인으로 </Link> */}
                    {/* <Link css={s.button1} to={`/main/donation/donationnews?page=${donationPageId}`}>후기 작성하기</Link>
                    <Link css={s.button1} to={`/main/donation/news/update?page=${donationPageId}`}>후기수정하기</Link>
                    <Link css={s.button2} to={`/main/donation/update?page=${donationPageId}`}>수정하기</Link>
                    <button css={s.button3} onClick={handleDeleteButtonClick}>삭제하기</button> */}
                </div>
                <div css={s.storyContent}>
                    <div css={s.main}>
                        <img src={donationPage.mainImgUrl} alt="Story" css={s.storyImage} />
                        <div>
                            <h2 css={s.donationtitle}>{donationPage.storyTitle}</h2>
                            <div css={s.currentAmount}>{currentAmount}원</div>
                            <div css={s.goalAmount}>{donationPage.goalAmount}원 목표</div>
                            <button onClick={handleShareKakao}>카카오톡공유하기</button>
                            <Progress pageId={donationPageId} />
                            <div css={s.dates}>
                                <div css={s.dates2}>기부 시작일: {donationPage.createDate ? donationPage.createDate.substring(0, 10) : ''}</div>
                                <div css={s.dates3}>기부 종료일: {calculateDaysRemaining(donationPage.createDate, donationPage.endDate)}</div>
                                <div css={s.dates4}>o 기부금은 100% 단체에 전달됩니다.</div>
                                <div css={s.likebutton}>
                                    <button css={s.donation} onClick={() => setShowModal(() => !showModal)}>기부하기</button>
                                    <div css={s.likebutton1}>
                                        <LikeButton donationPageId={donationPageId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div css={s.container}>
                        <Link css={s.link} to={"/main"}>메인으로</Link>
                    </div>
                    <div css={s.container2}>
                        <button css={s.button4} onClick={() => handleTabChange('news')}>news</button>
                        <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                        <div css={s.boxbox1}>
                            <div css={s.mainBox}>
                                {selectedTab === 'news' ? <NewsPage donationPageId={donationPageId} /> : <Story />}
                                <div css={s.teamNDonationBox}>
                                    <div css={s.teamInfo}>
                                        <div css={s.div3}>
                                            <div css={s.logoImg}>
                                                <img src={teamInfo?.teamLogoImgUrl} alt="" />
                                            </div>
                                            <div>{teamInfo?.teamName}</div>
                                        </div>
                                        <div css={s.teamInfoText}>{teamInfo?.teamInfoText}</div>
                                        <Link css={s.link1} to={`/team/info?id=${teamInfo?.teamId}`}>
                                            <div>자세히 보기 </div>
                                        </Link>
                                    </div>
                                    <div css={s.donationInfo}>
                                        <div css={s.h3}>같이 기부해요</div>
                                        {top3Donations.map(donation => (
                                            <a css={s.div5} href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId}>
                                                <div css={s.div5} key={donation.donationPageId}>
                                                    <div>
                                                        <img css={s.img} src={!donation.mainImgUrl ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" : donation.mainImgUrl} alt="" />
                                                    </div>
                                                    <div css={s.div6}>
                                                        <div css={s.font}>{!donation.storyTitle ? "제목없음" : donation.storyTitle}</div>
                                                        <div>{teamInfo?.teamName}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div css={s.container2}>
                            <button css={s.button4} onClick={() => handleTabChange('story')}>Story</button>
                            <button css={s.button4} onClick={() => handleTabChange('donators')}>Donators</button>
                            <button css={s.button4} onClick={() => handleTabChange('news')}>News</button>
                            <div css={s.boxbox1}>
                                <div>
                                    <h2>분리공간</h2>
                                    {selectedTab === 'story' ? <Story /> : selectedTab === 'news' ? <NewsPage donationPageId={donationPageId} /> : <Donators donationPageId={donationPageId} />}
                                </div>
                            </div>
                            <h3>댓글</h3>
                            <div css={s.commentBox}>
                                <CommentSection donationPageId={donationPageId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);   
}

export default DonationStoryPage;