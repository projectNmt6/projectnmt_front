import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { getDonationListRequest, getDonationTagRequest, registerChallengePage } from '../../../../apis/api/DonationAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MainPage from '../../../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { getTeamListRequest } from '../../../../apis/api/teamApi';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import TextEditor from '../../../../components/TextEditor/TextEditor';
import CommentSection from '../ChallenegComment/CommentSection';
import { format } from 'date-fns'; 
import { v4 as uuid } from "uuid";
import DOMPurify from 'dompurify';
import DatePicker, { registerLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko'; // 한국어 locale import
registerLocale('ko', ko); // DatePicker에 한국어 locale 등록
function ChallengeWrite() {
    const [title, setTitle] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [teamId, setTeamId] = useState(""); 
    const [challengeContent, setChallengeContent] = useState("");
    const [overview, setOverview] = useState("");
    const [userId, setUserId] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ headCount, setHaedCount] = useState();
    const datePickerRef = useRef(null);
    const [showDatePicker, setShowDatePicker] = useState(false); // Controls the visibility of the DatePicker


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
            headCount: headCount       
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
        window.location.href = "/main/challenges";
    };


    
    const headCountChange = (e) => {
        const value = e.target.value;
        const parsedValue = value ? parseInt(value) : null;
        setHaedCount(parsedValue);
    }
    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
        // Optionally focus the DatePicker when it becomes visible
        if (!showDatePicker && datePickerRef.current) {
            datePickerRef.current.setFocus();
        }
    }
    return (
        <>
        <div css={s.mainLayout}>

            <div css={s.textTitle}>
                프로젝트 제목
            </div>
            <div>
                <input type="text" 
                placeholder='제목' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                css={s.inputField}
                />
            </div>

            <div>
            <div  css={s.textTitle}>프로젝트 요약</div>
                <textarea type="text" 
                placeholder='어떻게 프로젝트에 참여할지 간단하게 요약해주세요.' 
                value={overview} 
                onChange={(e) => setOverview(e.target.value)} 
                css={s.inputField}
                />
            </div>

            <div>
            <div  css={s.textTitle}>프로젝트 팀</div>
            <Select
                value={selectedTeam}
                onChange={handleSelectTeam}
                options={teams}
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

export default ChallengeWrite;