import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { getDonationListRequest, getDonationTagRequest, registerChallengePage } from '../../apis/api/DonationAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamListRequest } from '../../apis/api/teamApi';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import TextEditor from '../../components/TextEditor/TextEditor';
import CommentSection from './CommentSection';

import { v4 as uuid } from "uuid";

function DonationChallengePage() {
    const [title, setTitle] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [teamId, setTeamId] = useState(""); 
    const [challengeContent, setChallengeContent] = useState("");
    const [overview, setOverview] = useState("");
    const [userId, setUserId] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    
    const queryClient = useQueryClient();    
    const principalData = queryClient.getQueryData("principalQuery");
    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId); // 예제로 userId 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    useEffect(() => {
        if (selectedTeam) {
            setTeamId(selectedTeam.value);
        }
    }, [selectedTeam]);

    useEffect(() => {
        if (userId) {
            const fetchTeams = async () => {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName
                        }));
                        setTeams(formattedTeams);
                    }
                } catch (error) {
                    console.error('Failed', error);
                }
            };
            fetchTeams();
        }
    }, [userId]);

    const handleSelectTeam = (selectedOption) => {
        setSelectedTeam(selectedOption);
        console.log(selectedTeam)
    };

    const PostChallengePage = useMutation({
        mutationKey: "PostChallengePage",
        mutationFn: registerChallengePage,
        onSuccess: response => {
            console.log("페이지 작성 성공" + response)
        },
        onError: error => {
            console.log("챌린지페이지에러:"+error)
        }
    })

    const handleSubmitButton = () => {
        // 현재 시간으로 startDate 업데이트
        const now = new Date();
    
        const data = {
            challengePageId: 1,
            teamId: teamId,
            mainCategoryId: 2,  // 챌린지
            pageCategoryId: 4,   // 4.mission, 5.action, 6.news
            createDate: now,
            endDate: endDate,
            challengeTitle: title,
            challengeOverview : overview,
            challengeContent: challengeContent,
            challengeMainImg: mainImg,
            challengePageShow: 2,            
        };
        PostChallengePage.mutate(data);
    };
    

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setMainImg("");
            alert("작성이 취소 되었습니다.");
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/main";
    };

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);

    };
    
    const [uploadedUrls, setUploadedUrls] = useState([]);

    return (
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                요약
                <input type="text" placeholder='요약' value={overview} onChange={(e) => setOverview(e.target.value)} />
            </div>

            <div>
            <h3>프로젝트 팀</h3>
            <Select
                value={selectedTeam}
                onChange={handleSelectTeam}
                options={teams}
                placeholder="등록할 팀을 선택해주세요"
            />
        </div>

        <div> <h4>프로젝트 진행 기간 </h4></div>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange }
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy년 MM월 dd일"
            />


            <div>
                <h2>메인 이미지 추가</h2>
                <div css={s.imgUrlBox}>
                    <label htmlFor="inputFile"></label>
                    <img src={mainImg} alt="Main" style={{ width: '300px', height: 'auto' }}/> 
                    <input  
                        id="inputFile" 
                        type="file" 
                        name="file" 
                        accept='image/*'
                        style={{ display: "block" }}
                        onChange={fileChange} 
                    /> 
                </div>  
                <button>이미지 제거 </button>
            </div>

            <TextEditor content={challengeContent} setContent={setChallengeContent} />
 
            <div css={s.buttonBox}>
                <button onClick={handleSubmitButton}>작성완료</button>
                <button onClick={handleCancelButton}>취소</button>
                <button onClick={handleHomeButton}>돌아가기</button>
            </div>     
        </>
    );
}

export default DonationChallengePage;