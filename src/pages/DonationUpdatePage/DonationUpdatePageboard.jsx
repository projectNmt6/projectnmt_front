import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Select from 'react-select';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrincipalRequest } from '../../apis/api/principal';
import { getTeamListRequest } from '../../apis/api/teamApi';
import { updateDonationPageResponse, updatePageRequest } from '../../apis/api/DonationAPI';
import TextEditor from '../../components/TextEditor/TextEditor';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../apis/filrebase/config/firebaseConfig';
import { v4 as uuid } from "uuid"


function DonationUpdatePageBoard() {
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 

    const [donationPage, setDonationPage] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mainImg, setMainImg] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedSecondTag, setSelectedSecondTag] = useState(null);
    const [userId, setUserId ] = useState();
    const [ teamId, setTeamId ] = useState();
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [ amount, setAmount ] = useState();
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [ storyImages, setStoryImages] = useState([])

    const handleAmountChange = (e) => {
        const value = e.target.value; // 입력된 값
        const parsedValue = value ? parseInt(value) : null; // 입력된 값이 있는 경우에만 정수로 변환하고 그렇지 않으면 null로 설정
        setGoalAmount(parsedValue); // 값 업데이트
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

    useEffect(() => {
                
        axios.get("http://localhost:8080/main/donationtag")
        .then(response => {
            const options = response.data.map(secondTag => ({
                value: secondTag.donationTagId,
                label: secondTag.donationTagName
            }));
            setSecondTagOptions(options);
            setSelectedSecondTag(options.filter(option => option.value === donationPage.donationTagId)[0]);
        })
        .catch(error => {
            console.error(error);
        });
        
    }, [donationPage]);
    
    useEffect(() => {
    }, [selectedSecondTag]);

    const [goalAmount, setGoalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (donationPageId) {
                try {
                    const response = await updateDonationPageResponse({ donationPageId });
                    console.log(response.data)
                    if (response.status === 200) {
                        const data = response.data;
                        setStoryImages(data.donationImages);
                        setDonationPage(data);
                        setTeamId(data.teamId);
                        setTitle(data.storyTitle);
                        setContent(data.storyContent);
                        setMainImg(data.mainImgUrl);
                        setStartDate(new Date(data.createDate));
                        setEndDate(new Date(data.endDate));
                        setGoalAmount(data.goalAmount !== null ? data.goalAmount : 0);
                        setSelectedTeam({ value: data.teamId, label: data.teamName });
                        // setStoryImages(data.donationImages);
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
    
    const handleSubmitButton = () => {
        // API 호출 시 teamId 사용
        const data =  {
            donationPageId: donationPageId,
            teamId: teamId,
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
            donationImages: uploadedUrls.map((donationImageURL, index) => ({
                donationImageNumber: index + 1,
                donationImageURL: donationImageURL.url,
                userId: userId,
                createDate: new Date(),
            }))
        };
        updatePageRequest.mutate(data); 
    };
    
    const handleMainTagChange = (selectedOption) => {
        setSelectedMainTag(selectedOption);
        console.log(handleMainTagChange)
    };

    const handleSecondTagChange = (selectedOption) => {
        console.log("!!!!", selectedOption)
        setSelectedSecondTag(selectedOption);
    }

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImg(reader.result);
        };
        reader.readAsDataURL(file);
    };
    

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setTitle("");
            setGoalAmount(0);
            setContent("");
            setMainImg("");
            alert("작성이 취소 되었습니다.");
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/main";
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
                        getDownloadURL(storageRef).then((donationImageURL) => {
                            const imageId = uuid(); // 각 이미지에 대한 고유 ID 생성
                            resolve({ donationImageURL, imageId });
                        }).catch(reject);
                    }
                );
            });
        });
    
        const uploadedImages = await Promise.all(uploads);
        setUploadedUrls(uploadedImages); // 업로드된 이미지의 URL과 ID 저장
        console.log(uploadedImages)
        setStoryImages(uploadedImages); // 새로운 이미지로 대체
        console.log(storyImages);
    };

    return (
        <>
            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>기부 프로젝트 시작일: </div>
            <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                selectsStart
                dateFormat="yyyy년 MM월 dd일"
                // minDate={new Date()}
            />

            <div>기부 프로젝트 종료일: </div>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    // minDate={startDate}
                    dateFormat="yyyy년 MM월 dd일"
                />

            <div>
                <h3>대표이미지</h3>
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

            <Select 
                options={secondTagOptions}
                placeholder="기부 카테고리를 선택해주세요"
                value={selectedSecondTag}
                onChange={handleSecondTagChange}
                defaultValue={selectedSecondTag}
            />

            
            <div>
            <div>목표 금액: {goalAmount !== null && goalAmount}</div>

                <input type="number" 
                    value={goalAmount !== null ? goalAmount : ''} 
                    onChange={(e) => handleAmountChange(e)} 
                />
            </div>

            <div>
                {/* 기존 이미지 보여주기 */}
                {storyImages && storyImages.map((image, index) => (
                    <img key={index} src={image.donationImageURL} alt={`Image ${index}`} />
                ))}
            </div>

            {/* TextEditor 컴포넌트 */}
            <TextEditor content={content} setContent={setContent} onUploadImages={handleImageUpload} />

            <div>
                <button onClick={handleSubmitButton}>수정 완료</button>
                <button onClick={handleCancelButton}>취소</button>
                <button onClick={handleHomeButton}>돌아가기</button>
            </div>
        </>
    );
}

export default DonationUpdatePageBoard;