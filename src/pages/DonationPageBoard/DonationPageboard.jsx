import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

/** @jsxImportSource @emotion/react */
import axios from 'axios';
import Select from 'react-select';
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { PostDonationImage, getDonationListRequest, getDonationTagRequest, registerDonationPage } from '../../apis/api/DonationAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { errorSelector } from 'recoil';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamInfoRequest, getTeamListRequest, getTeamMemberInfoRequest, getTeamMemberInfoRequest2 } from '../../apis/api/teamApi';
import TextEditor from '../../components/TextEditor/TextEditor';
import { useFileUpload } from '../../hooks/useFileUpload';

import { v4 as uuid } from "uuid"
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function DonationPageboard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [ teamId, setTeamId ] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [projectDuration, setProjectDuration] = useState(null);
    const [userId, setUserId ] = useState();
    const [ amount, setAmount ] = useState();
    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null; // 입력된 값이 있는 경우에만 정수로 변환하고 그렇지 않으면 null로 설정
        setAmount(parsedValue); // 값 업데이트
    };

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
                    console.error('Failed to fetch teams', error);
                }
            };

            fetchTeams();
        }
    }, [userId]);

    const handleSelectTeam = (selectedOption) => {
        setSelectedTeam(selectedOption);
    };
    
    useEffect(() => {
        axios.get("http://localhost:8080/main/storytypes")
            .then(response => {
                const options = response.data.map(mainTag => ({
                    value: mainTag.mainCategoryId,
                    label: mainTag.mainCategoryName
                }));
                setMainTagOptions(options);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/main/donationtag")
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

    const handleMainTagChange = (selectedOption) => {
        setSelectedMainTag(selectedOption);
    };

    const handleSecondTagChange = (selectedOption) => {
        setSelectedSecondTag(selectedOption);
    }
        

    const registerDonationImage = useMutation({
        mutationKey: "registerDonationImage",
        mutationFn: PostDonationImage,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    })

    const PostDonationPage = useMutation({
        mutationKey: "PostDonationPage",
        mutationFn: registerDonationPage,
        onSuccess: response => {
            console.log("페이지 작성 성공"+response)
        },
        onError: error => {
            console.log(error);
        }
    });
    
    const handleSubmitButton = () => {
        // API 호출 시 teamId 사용
        const data =  {
            donationPageId: 1,
            teamId: teamId,
            mainCategoryId: 1,
            pageCategoryId: 1,
            createDate: startDate,
            endDate: endDate,
            goalAmount : amount,
            storyTitle: title,
            storyContent: content,
            mainImgUrl: mainImg,
            donationTagId: selectedSecondTag ? selectedSecondTag.value : null,
            donationPageShow: 2,
            // 이미지 등록 후에 mutation이 완료된 후에 이미지 정보를 사용할 수 있도록 함
            donationImages: uploadedUrls.map((url, index) => ({
                donationImageNumber: index + 1,
                donationImageURL: url.url,
                userId: userId,
                createDate: new Date(),
            }))
        };
        PostDonationPage.mutate(data); 
    };
    

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

    const fileChange = (e) => { //main
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

  
    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate) {
            const duration = Math.round((endDate - date) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate) {
            const duration = Math.round((date - startDate) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    };

    const imgFileRef = useRef();

    const [uploadedUrls, setUploadedUrls] = useState([]);
    
    const handleImageUpload = async (files) => {
        console.log(files);
        const uploads = files.map(file => {
            return new Promise((resolve, reject) => {
                const storageRef = ref(storage, `images/${uuid()}_${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        
                    },
                    reject,
                    () => {
                        getDownloadURL(storageRef).then((url) => {
                            const imageId = uuid(); // 각 이미지에 대한 고유 ID 생성
                            resolve({ url, imageId });
                        }).catch(reject);
                    }
                );
            });
        });
    
        const uploadedImages = await Promise.all(uploads);
        setUploadedUrls(uploadedImages); // 업로드된 이미지의 URL과 ID 저장
        console.log(uploadedImages)
    };
    return (
        <>
            <div>
                <input type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
            <h3>Select Your Team</h3>
            <Select
                value={selectedTeam}
                onChange={handleSelectTeam}
                options={teams}
                placeholder="Select your team..."
            />
        </div>
            
            <div>기부 프로젝트 시작일: </div>
            <DatePicker 
                selected={startDate} 
                onChange={handleStartDateChange} 
                selectsStart
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date()}
            />

            <div>기부 프로젝트 종료일: </div>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange }
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy년 MM월 dd일"
            />
            
            <div>
                <div>프로젝트 기간: {projectDuration !== null ? `${projectDuration}일` : ''}</div>       
            </div>
                            
            <Select 
                    options={secondTagOptions}
                    placeholder="기부 카테고리를 선택해주세요"
                    value={selectedSecondTag}
                    onChange={handleSecondTagChange}
            />

            <div>
                <h2>메인 이미지 추가</h2>
                <div css={imgUrlBox}>
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
                
            </div>

            <h3>슬라이드</h3>
 
            <TextEditor content={content} setContent={setContent} 
                        onUploadImages={handleImageUpload}/>

            <div>
                목표 금액:
                <input 
                type="number"
                value={amount}
                onChange={handleAmountChange}
                 />
            </div>

            <div style={buttonBox}>
                <button onClick={handleSubmitButton}>작성완료</button>
                <button onClick={handleCancelButton}>취소</button>
                <button onClick={handleHomeButton}>돌아가기</button>
            </div>     
        </>
    );
}

export default DonationPageboard;