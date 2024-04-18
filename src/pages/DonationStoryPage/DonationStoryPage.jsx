/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Progress from "../../components/progress/Progress";
import {Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { commentReqest, commentResponse, deleteDonationPage, getDonationNewsRequest, getDonationStoryRequest, updatePageRequest, getDonationStoryRequest, getProgressAmount } from '../../apis/api/DonationAPI';
import DOMPurify from 'dompurify';
import LikeButton from '../../components/LikeButton/LikeButton';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import CommentSection from '../../pages/DonationStoryPage/CommentSection'; 
import NewsPage from './CategoryPage/NewsPage'; // NewsPage 경로 수정
import Story from './CategoryPage/Story'; // Story 경로 수정

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});
    const [goalAmount, setGoalAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const[donationNewsPage, setDonationNewsPage] = useState({});
    const [ commentList, setCommentList ] = useState([]);
    const donationCommentId = queryParams.get('commentId')
    const [comment, setComment ] = useState("");
    const [selectedTab, setSelectedTab] = useState('story'); // news, story 중 하나의 값을 가짐

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setDonationPage(data);
            }
        }
    );

    
    useEffect(() => {
        axios.get(`http://localhost:8080/comment/getcomment/${donationPageId}`)
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
        }
    })

    const handleDeleteButtonClick = () => {
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
                console.log(data.data);
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
            commentText : comment,
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
    const navigate = useNavigate();

    const handleNewsUpdateButton = () => {

    }
    
    return (
        <>
            <div css={s.container}>                
             <Link css={s.link} to={"/main"}>메인으로 </Link>
                </div>
            
                <div css={s.header}>
                <button>
                <Link to={`/main/donation/donationnews?page=${donationPageId}`}>후기 작성하기</Link>
                    </button>
                <button> 
                    <Link to={`/main/donation/news/update?page=${donationPageId}`}>후기수정하기</Link>
                </button>

                <Link to={`/main/donation/update?page=${donationPageId}`}>수정하기</Link>                
                <button onClick={handleDeleteButtonClick} >삭제하기</button>

            </div>
            <div css={s.storyHeader}>
                <h1>Donation Stories</h1>
                <p>page: {donationPageId}</p>
            </div>


            <div>
                    <LikeButton donationPageId={donationPageId} />
                    <h2>{donationPage.storyTitle}</h2>
                    <img src={donationPage.mainImgUrl} alt="" />
                    <p>기부 시작일: {donationPage.createDate}</p>
                    <p>기부 종료일: {donationPage.endDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />

            <div css={s.storyContent}>
                <div css={s.main}>
                    <img src={donationPage.mainImgUrl} alt="Story" css={s.storyImage}/>
                    <div>
                        <h2 css={s.donationtitle}>{donationPage.storyTitle}</h2>
                        <div css={s.currentAmount}>{currentAmount}원</div>
                        <div css={s.goalAmount}>{donationPage.goalAmount}원 목표</div>
                        <Progress pageId={donationPageId}/>
                        <div css={s.dates}>
                            <p>기부 시작일: {donationPage.createDate ? donationPage.createDate.substring(0, 10) : ''}</p>
                            <p>기부 종료일: {calculateDaysRemaining(donationPage.createDate, donationPage.endDate)}</p>
                        </div>
                    </div>
                </div>
                <div css={s.sanitizeHtml} dangerouslySetInnerHTML={{ __html: safeHTML }} />

            </div>
        </div>
            <button onClick={() => handleTabChange('news')}>news</button>
            <button onClick={() => handleTabChange('story')}>Story</button>


            <div css={s.boxbox1}>
                <div>
                    <h2>분리공간 </h2>

                {selectedTab === 'news' ? <NewsPage donationPageId={donationPageId} />: <Story />}
                </div>                
            </div>

                <h3>덧글</h3>
            <div css={s.commentBox}>

                <div>
                <CommentSection donationPageId={donationPageId} /> 
                </div>

                {/* <div>
                    <input 
                        type="text" 
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <p>{commentList.commentText}</p>
                    <button onClick={handleCommentSubmit}>덧글입력</button>
                </div> */}

            </div>

        </>

    )
}
export default DonationStoryPage;