import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTeamListRequest } from '../../../../apis/api/teamApi';
import { getChallengePageRequest, getChallengeRequest, getUpdateChallengePageRequest, updateChallengeRequest } from '../../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "../ChallengeUpdate/style";
import TextEditor from '../../../../components/TextEditor/TextEditor';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'; 
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
    const [endDate, setEndDate] = useState(new Date());
    const [uploadedImages, setUploadedImages] = useState([]);
    const datePickerRef = useRef(null);
    const [showDatePicker, setShowDatePicker] = useState(false); // Controls the visibility of the DatePicker
    const [ headCount, setHaedCount] = useState();
   
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
        console.log("teamId" + teamId)
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
                    setHaedCount(data.headCount);
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

    
    const PostChallengeUpdate = useMutation({
        mutationKey: "PostChallengeUpdate",
        mutationFn: updateChallengeRequest
        ,
        onSuccess: response => {
            console.log("페이지 작성 성공"+response)
        },
        onError: error => {
            console.log(error);
        }
    });

    const handleSubmitButton = () => {
        // 현재 시간으로 startDate 업데이트
        const now = new Date();
        setStartDate(now);
    
        const data = {
            challengePageId: challengePageId,
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
        }
        PostChallengeUpdate.mutate(data);
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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMainImg(reader.result); // 이미지 데이터를 상태에 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
        // Optionally focus the DatePicker when it becomes visible
        if (!showDatePicker && datePickerRef.current) {
            datePickerRef.current.setFocus();
        }
    }
   
    const headCountChange = (e) => {
        const value = e.target.value;
        const parsedValue = value ? parseInt(value) : null;
        setHaedCount(parsedValue);
    }
    return (
        <>
        <div css={s.mainLayout}>
        <div css={s.textTitle}>
                프로젝트 제목
            </div>
            <div>
                <input type="text" placeholder='제목' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                css={s.inputField}
                />
            </div>

            <div>
            <div  css={s.textTitle}>프로젝트 요약</div>
                <textarea type="text" 
                css={s.textarea}
                placeholder='요약' 
                value={overview} 
                onChange={(e) => setOverview(e.target.value)} />
            </div>

            <div>
            <div  css={s.textTitle}>프로젝트 팀</div>
            <Select
                value={selectedTeam} // 현재 선택된 팀
                onChange={handleSelectTeam} // 선택이 변경될 때 실행되는 함수
                options={teams} // 팀 목록
                placeholder="등록할 팀을 선택해주세요"
            />

        </div>

        <div  css={s.textTitle}>진행기간</div>
        <div css={s.dateDisplayBox} onClick={toggleDatePicker}>
                {format(endDate, "yyyy년 MM월 dd일")}
                <span css={s.textTitle}> 까지</span>
            </div>
            {showDatePicker && (
                <DatePicker
                ref={datePickerRef}
                selected={endDate}
                onChange={date => {
                    setEndDate(date);
                    toggleDatePicker(); // Optionally hide after selection
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy년 MM월 dd일"
                inline
                locale="ko" // 한국어로 설정
                showYearDropdown
                showMonthDropdown
                dropdownMode="select" // 드롭다운 모드 활성화
                css={s.DatePickerCss}
            />
            
            )}


            <div>
                <h2>메인 이미지 추가</h2>
                <label css={s.imageUrlBox} htmlFor="inputFile">
                {mainImg ? <img src={mainImg} alt="Uploaded" style={{ width: '300px', height: 'auto' }}/> : "사진 첨부"}
                <input  
                    id="inputFile" 
                    type="file" 
                    name="file" 
                    accept="image/*"
                    css={s.fileInputStyle}
                    onChange={fileChange} 
                />
            </label>             
            </div>

            <div  css={s.textTitle}>
                목표 인원
                </div>
            <input 
                css={s.inputField}
                type="number"
                value={headCount}
                onChange={headCountChange} />
            <TextEditor content={challengeContent} setContent={setChallengeContent} />
 

            <div css={s.buttonBox}>
            <button css={[s.buttonStyle, s.cancelButtonStyle]} onClick={handleCancelButton}>
                취소
            </button>
            <button css={s.buttonStyle} onClick={handleSubmitButton}>
                작성완료
            </button>
            <button css={[s.buttonStyle, s.backButtonStyle]} onClick={handleHomeButton}>
                돌아가기
            </button>    
            </div>
            </div>
        </>
    );
}
export default ChallengeUpdatePage;