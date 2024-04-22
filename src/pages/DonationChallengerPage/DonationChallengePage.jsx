import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { getDonationListRequest, getDonationTagRequest } from '../../apis/api/DonationAPI';
import { useQuery, useQueryClient } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamListRequest } from '../../apis/api/teamApi';
import ChallengeAlbum from '../../components/TextEditor/ChallengeAlbum';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import TextEditor from '../../components/TextEditor/TextEditor';
import CommentSection from './CommentSection';


function DonationChallengePage() {
    const [title, setTitle] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [teamId, setTeamId] = useState(null); 
    const [challengeContent, setChallengeContent] = useState("");
    const [overview, setOverview] = useState("");
    const [userId, setUserId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

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
    
    const queryClient = useQueryClient();    
    const principalData = queryClient.getQueryData("principalQuery");
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
    };


    const handleSubmitButton = () => {
        // 현재 시간으로 startDate 업데이트
        const now = new Date();
        setStartDate(now);
    
        axios.post('http://localhost:8080/main/challenge/write', {
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
            challengePageShow: 2
        })
        .then(response => {
            alert("저장 성공");
            console.log(response);
        })
        .catch(error => {          
            console.error('Error:', error);
        });
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


    const [uploadedImages, setUploadedImages] = useState([]);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setUploadedImages((prevImages) => [...prevImages, reader.result]);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);

    };
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


            
            <h1>슬라이드쇼</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {uploadedImages.length > 0 && <ChallengeAlbum uploadedImages={uploadedImages} />}

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