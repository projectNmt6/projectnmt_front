import React, { useEffect, useMemo, useState } from 'react';
import { getPrincipalRequest } from '../../apis/api/principal';
import { useQuery, useQueryClient } from 'react-query';
import { getTeamListRequest } from '../../apis/api/teamApi';
import { getChallengePageRequest, getChallengeRequest, getUpdateChallengePageRequest, updateChallengeRequest } from '../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import TextEditor from '../../components/TextEditor/TextEditor';
import ChallengeAlbum from '../../components/TextEditor/ChallengeAlbum';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ChallengeUpdatePage(props) {
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
    const [uploadedImages, setUploadedImages] = useState([]);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
    const queryClient = useQueryClient();

    // 사용자 주요 정보 로드
    const principalQuery = useQuery(
        "principalQuery", 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setUserId(response.data.userId);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

   

    const principalData = queryClient.getQueryData("principalQuery");
    useEffect(() => {
        if (selectedTeam) {
            setTeamId(selectedTeam.value);
        }
    }, [selectedTeam]);
    

    // 팀 정보 로드
    useEffect(() => {
        const fetchTeams = async () => {
            if (userId) {
                try {
                    const response = await getTeamListRequest({ userId });
                    if (response.status === 200 && response.data.length > 0) {
                        const formattedTeams = response.data.map(team => ({
                            value: team.teamId,
                            label: team.teamName // 데이터 구조에 따라 정확하게 매핑
                        }));
                        setTeams(formattedTeams);
                    } else {
                        console.log("No teams found or empty response.");
                    }
                } catch (error) {
                    console.error('Failed to load teams', error);
                }
            }
        };
    
        fetchTeams();
    }, [userId]);

useEffect(() => {
    const fetchData = async () => {
        if (challengePageId) {
            try {
                const response = await getUpdateChallengePageRequest({ challengePageId });
                if (response.status === 200) {
                    const data = response.data;
                    setTitle(data.challengeTitle);
                    setMainImg(data.challengeMainImg);
                    setChallengeContent(data.challengeContent);
                    setOverview(data.challengeOverview);
                    setStartDate(new Date(data.startDate));
                    setEndDate(new Date(data.endDate));
                    setSelectedTeam({ value: data.teamId, label: data.teamName });
                }
            } catch (error) {
                console.error('Error fetching challenge page:', error);
            }
        } else {
            console.error('No valid challengePageId provided');
        }
    };
    fetchData();
}, [challengePageId]);

useEffect(() => {
    if (selectedTeam && selectedTeam.label === undefined) {
        const team = teams.find(team => team.value === selectedTeam.value);
        if (team) {
            setSelectedTeam(team);
        }
    }
}, [selectedTeam, teams]);

    const handleSelectTeam = (selectedOption) => {
        setSelectedTeam(selectedOption);
    };

  

    const handleSubmitButton = () => {
        // 현재 시간으로 startDate 업데이트
        const now = new Date();
        setStartDate(now);
    
        axios.put(`http://localhost:8080/main/challenge/update/${challengePageId}`, {
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
                <input type="text" placeholder='제목' 
                value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                요약
                <input type="text" placeholder='요약' value={overview} onChange={(e) => setOverview(e.target.value)} />
            </div>

            <div>
            <h3>프로젝트 팀</h3>
            <Select
                value={selectedTeam} // 현재 선택된 팀
                onChange={handleSelectTeam} // 선택이 변경될 때 실행되는 함수
                options={teams} // 팀 목록
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
export default ChallengeUpdatePage;