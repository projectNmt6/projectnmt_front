
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import * as s from "./style";
/** @jsxImportSource @emotion/react */
import axios from 'axios';
import Select from 'react-select';
import { getDonationListRequest, getDonationTagRequest, registerDonationPage } from '../../../apis/api/DonationAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../../apis/api/principal';
import { getTeamInfoRequest, getTeamListRequest } from '../../../apis/api/teamApi';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { format } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko'; // 한국어 locale import

function DonationPageboard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedSecondTag, setSelectedSecondTag] = useState([]);
    const [teamId, setTeamId] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [projectDuration, setProjectDuration] = useState(null);
    const [userId, setUserId] = useState();
    const [amount, setAmount] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);



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
                    console.error(error);
                }
            };
            fetchTeams();
        }
    }, [userId]);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/tag/donationtag")
    //         .then(response => {
    //             const options = response.data.map(secondTag => ({
    //                 value: secondTag.donationTagId,
    //                 label: secondTag.donationTagName
    //             }));
    //             setSelectedSecondTag(options);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);
    useEffect(() => {
        const fetchDonationTags = async () => {
            try {
                const response = await getDonationTagRequest(); // 여기서 params가 필요하면 전달하면 됩니다.
                const options = response.data.map(secondTag => ({
                    value: secondTag.donationTagId,
                    label: secondTag.donationTagName
                }));
                setSelectedSecondTag(options);
            } catch (error) {
                console.error("Failed to fetch donation tags:", error);
            }
        };

        fetchDonationTags();
    }, []);


    const handleSelectTeam = (selectedOption) => {
        setSelectedTeam(selectedOption);
    };
    const [selectedTag, setSelectedTag] = useState(null); // 추가된 상태 변수

    const handleSecondTagChange = (selectedOption) => {
        setSelectedTag(selectedOption); // 선택된 태그 업데이트
    }


    const PostDonationPage = useMutation({
        mutationKey: "PostDonationPage",
        mutationFn: registerDonationPage,
        onSuccess: response => {
            console.log("페이지 작성 성공" + response)
        },
        onError: error => {
            console.log(error);
        }
    });

    const handleSubmitButton = () => {
        const data = {
            teamId: teamId,
            mainCategoryId: 1,
            pageCategoryId: 1,
            createDate: startDate,
            endDate: endDate,
            goalAmount: amount,
            storyTitle: title,
            storyContent: content,
            mainImgUrl: mainImg,
            donationTagId: selectedTag.value,
            donationPageShow: 2,
        };
        PostDonationPage.mutate(data);
    };
    console.log(selectedTag)
    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setContent("");
            setMainImg("");
            setAmount(0);
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


    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate) {
            const duration = calculateDuration(date, endDate);
            setProjectDuration(duration);
        }
    };
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
    const [displayValue, setDisplayValue] = useState('');
    const [actualValue, setActualValue] = useState('');
    const handleAmountChange = (event) => {
        const value = event.target.value; // 사용자 입력
        const numbersOnly = value.replace(/[^0-9]/g, ''); // 입력값에서 숫자만 추출
        setAmount(numbersOnly); // 숫자만 있는 상태로 상태 업데이트
    
        // 쉼표로 숫자 형식화하여 디스플레이용 상태 업데이트
        const formattedNumber = formatNumberWithCommas(numbersOnly);
        setDisplayValue(formattedNumber);
        console.log(amount)
    };
    
    const formatNumberWithCommas = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    
    return (
        <>
            <div css={s.mainLayout}>
            <div>
                    <div css={s.textTitle}>프로젝트 팀</div>
                    <Select  styles={s.customStyles}
                        value={selectedTeam}
                        onChange={handleSelectTeam}
                        options={teams}
                        placeholder="등록할 팀을 선택해주세요"
                    />
                </div>
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

                

                <div css={s.textTitle}>진행기간</div>

                <div css={s.dateDisplayBox} onClick={toggleStartDatePicker}>
                    {format(startDate, "yyyy년 MM월 dd일")}
                </div>
                {showStartDatePicker && (
                    <DatePicker
                        selected={startDate}
                        onChange={date => {
                            setStartDate(date);
                            toggleStartDatePicker(); // Optionally hide after selection
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

                <div css={s.dateDisplayBox} onClick={toggleEndDatePicker}>
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
                        // minDate={new Date()}
                        dateFormat="yyyy년 MM월 dd일"
                        inline
                        locale="ko"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                    />
                )}

                <div css={s.textTitle}>
                    <div>프로젝트 기간 : 
                        {projectDuration !== null ? `${projectDuration}일` : ''}</div>
                </div>

                <div css={s.textTitle}>
                    목표 금액
                </div>

                <input
                        css={s.inputField}
                        type="text"
                        value={displayValue}
                        onChange={handleAmountChange}
                    />

                    
                <Select
                    options={selectedSecondTag}
                    placeholder="기부 카테고리를 선택해주세요"
                    value={selectedTag}
                    onChange={handleSecondTagChange}
                    styles={s.customStyles}
                    menuPortalTarget={document.body}
                />

                <div>
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

                </div>


                <TextEditor content={content} setContent={setContent} />


                <div css={s.buttonBox}>
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

export default DonationPageboard;