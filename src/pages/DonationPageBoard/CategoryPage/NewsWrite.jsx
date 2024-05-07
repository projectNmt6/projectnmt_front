import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import * as s from "./style";
/** @jsxImportSource @emotion/react */
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { registerNewsPage, updateDonationPageResponse } from '../../../apis/api/DonationAPI';
import { getPrincipalRequest } from '../../../apis/api/principal';
import { getTeamListRequest } from '../../../apis/api/teamApi';
import TextEditor from '../../../components/TextEditor/TextEditor';

const textEditorLayout = css`
    overflow-y: auto;
    margin-bottom: 20px;
`;

function NewsWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImg, setMainImg] = useState("");
    const [ storyImgs, setStoryImgs ] = useState([]);
    const [ teamId, setTeamId ] = useState();
    const [teams, setTeams] = useState([]);

    const [ userId, setUserId] = useState();
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const [selectedTeam, setSelectedTeam] = useState(null);
       
    useEffect(() => {
        const fetchData = async () => {
            if (donationPageId) {
                try {
                    const response = await updateDonationPageResponse({ donationPageId });
                    console.log(response.data)
                    if (response.status === 200) {
                        const data = response.data;
                        setTeamId(data.teamId);
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
    const PostDonationNews = useMutation({
        mutationKey: "PostDonationNews",
        mutationFn: registerNewsPage,
        onSuccess: response => {
            console.log("뉴스 작성 성공" + response)
        },
        onError: error=>{
            console.log(error)
        }
    })
    useEffect(() => {
        if (selectedTeam) {
            setTeamId(selectedTeam.value);
        }
    }, [selectedTeam]);

    const handleSubmitButton = () => {
        const data = {
            donationNewsPageId: 0,
                donationPageId: donationPageId,
                pageCategoryId: 3,
                newsContent: content,
                teamId: teamId
        }
        PostDonationNews.mutate(data);
    };

    const handleCancelButton = () => {
        if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
            setContent("");
            alert("작성이 취소 되었습니다.");
        }
    };

    const handleHomeButton = () => {
        window.location.href = "/main";
    };

    const fileChange2 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setStoryImgs(reader.result);
        };
        reader.readAsDataURL(file);
    };


    return (
        <>
        <div css={s.mainLayout}>
            
            <div css={s.textTitle}>
                    뉴스
            </div>


            <TextEditor content={content} setContent={setContent}  />

            <div style={buttonBox}>
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

export default NewsWrite;