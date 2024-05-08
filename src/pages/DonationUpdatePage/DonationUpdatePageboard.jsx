import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Select from 'react-select';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamListRequest } from '../../apis/api/teamApi';
import { getDonationTagRequest, updateDonationPageResponse, updatePageRequest } from '../../apis/api/DonationAPI';
import { format } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko'; // 한국어 locale import
import * as s from "./style";

import TextEditor from '../../components/TextEditor/TextEditor';
import axios from 'axios';
/** @jsxImportSource @emotion/react */

function DonationUpdatePageBoard() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');

    const [donationPage, setDonationPage] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mainImg, setMainImg] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userId, setUserId] = useState();
    const [teamId, setTeamId] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [projectDuration, setProjectDuration] = useState(null);
    const [amount, setAmount] = useState();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    


    useEffect(() => {
        axios.get("http://localhost:8080/tag/donationtag")
            .then(response => {
                const options = response.data.map(secondTag => ({
                    value: secondTag.donationTagId,
                    label: secondTag.donationTagName
                }));
                setSecondTagOptions(options);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSecondTagChange = (selectedOption) => {
        setSelectedSecondTag(selectedOption);
    }

    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null; // 입력된 값이 있는 경우에만 정수로 변환하고 그렇지 않으면 null로 설정
        setAmount(parsedValue); // 값 업데이트
    };

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
                    console.error(error);
                }
            };

            fetchTeams();
        }
    }, [userId]);


    useEffect(() => {

    }, [selectedSecondTag]);

    useEffect(() => {
        const fetchData = async () => {
            if (donationPageId) {
                try {
                    const response = await updateDonationPageResponse({ donationPageId });
                    console.log(response.data)
                    if (response.status === 200) {
                        const data = response.data;
                        setDonationPage(data);
                        setTitle(data.storyTitle);
                        setContent(data.storyContent);
                        setMainImg(data.mainImgUrl);
                        setStartDate(new Date(data.createDate));
                        setEndDate(new Date(data.endDate));
                        setAmount(data.goalAmount !== null ? data.goalAmount : 0);
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
    }, [donationPageId]);

    // useMutation을 사용하여 mutation을 생성
    const mutation = useMutation(updatePageRequest);
    const UpdateDonationPage = useMutation({
        mutationKey: "UpdateDonationPage",
        mutationFn: updatePageRequest,
        onSuccess: response => {
            console.log("페이지 작성 성공" + response)
        },
        onError: error => {
            console.log(error);
        }
    });
    const handleSubmitButton = async () => {

        // API 호출 시 teamId 사용
        const data = {
            donationPageId: donationPageId,
            teamId: teamId,
            mainCategoryId: 1,
            pageCategoryId: 1,
            createDate: startDate,
            endDate: endDate,
            goalAmount: amount,
            storyTitle: title,
            storyContent: content,
            mainImgUrl: mainImg,
            donationTagId: selectedSecondTag ? selectedSecondTag.value : null,
            donationPageShow: 2,
        };
        // 데이터베이스 업데이트 요청 보내기
        UpdateDonationPage.mutate(data);
    };

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setAmount(0);
            setContent("");
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

    useEffect(() => {
        if (startDate && endDate) {
            const duration = calculateDuration(startDate, endDate);
            setProjectDuration(duration);
        }
    }, [startDate, endDate]);

    const calculateDuration = (start, end) => {
        const diff = end - start;
        const duration = Math.round(diff / (1000 * 60 * 60 * 24));
        return duration;
    };

    const toggleStartDatePicker = () => {
        setShowStartDatePicker(prev => !prev);
    };

    const toggleEndDatePicker = () => {
        setShowEndDatePicker(prev => !prev);
    };

    return (
        <>
        <div css={s.mainLayout}>

                <div css={s.textTitle}>
                    프로젝트 제목
                </div>

                <div>
                    <input type="text"
                        placeholder='프로젝트 제목'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        css={s.inputField}
                    />
                </div>

                <div>
                    <div css={s.textTitle}>프로젝트 팀</div>
                    <Select
                        value={selectedTeam}
                        onChange={handleSelectTeam}
                        options={teams}
                        placeholder="등록할 팀을 선택해주세요"
                    />
                </div>

                <div css={s.textTitle}>진행기간</div>

                <div css={s.dateDisplayBox} 
                    onClick={toggleStartDatePicker}>
                    {format(startDate, "yyyy년 MM월 dd일")}
                </div>
                {showStartDatePicker && (
                    <DatePicker
                        selected={startDate}
                        onChange={date => {
                            setStartDate(date);
                            toggleStartDatePicker();
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy년 MM월 dd일"
                        inline
                        locale="ko"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                    />
                )}

                <div css={s.dateDisplayBox} 
                onClick={toggleEndDatePicker}>
                    {format(endDate, "yyyy년 MM월 dd일")}
                </div>

                {showEndDatePicker && (
                    <DatePicker
                        selected={endDate}
                        onChange={date => {
                            setEndDate(date);
                            toggleEndDatePicker();
                        }}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        dateFormat="yyyy년 MM월 dd일"
                        inline
                        locale="ko"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                    />
                )}

                <div>
                    <div>프로젝트 기간:{projectDuration !== null ? `${projectDuration}일` : ''}</div>
                </div>

                <div css={s.textTitle}>
                    목표 금액
                </div>

                <input
                    css={s.inputField}
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                />

                
                <div css={s.textTitle}>메인 이미지 추가</div>
                    <div css={s.imgUrlBox}>
                        <label css={s.imageUrlBox} htmlFor="inputFile">
                            {mainImg ? <img src={mainImg} alt="Uploaded" style={{ width: '300px', height: 'auto' }} /> : "사진 첨부"}
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

                <div css={s.textTitle}>카테고리</div>
                <Select 
                    options={secondTagOptions}
                    placeholder="기부 카테고리를 선택해주세요"
                    value={selectedSecondTag}
                    onChange={handleSecondTagChange}
                />

                <TextEditor content={content} setContent={setContent} />


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

export default DonationUpdatePageBoard;