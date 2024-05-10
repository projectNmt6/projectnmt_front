import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import * as s from "./style";
/** @jsxImportSource @emotion/react */
import { buttonBox } from './style';
import { imgUrlBox } from './style';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { getDonationStoryRequest, registerNewsPage, updateDonationPageResponse } from '../../../apis/api/DonationAPI';
import { getPrincipalRequest } from '../../../apis/api/principal';
import { getTeamListRequest } from '../../../apis/api/teamApi';
import TextEditor from '../../../components/TextEditor/TextEditor';


function NewsWrite() {
    const [content, setContent] = useState("");
    const [teamId, setTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const [selectedTeam, setSelectedTeam] = useState(null);
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

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId],
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log(data);
                setTeamId(data.teamId)
            }
        }
    );

    console.log("team"+teamId)

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

    const handleSubmitButton = () => {
        const data = {
            donationNewsPageId: 0,
                donationPageId: donationPageId,
                pageCategoryId: 3,
                newsContent: content,
                teamId: teamId
        }
        PostDonationNews.mutate(data);
        console.log("donationPageId"+data.donationPageId)
        console.log("newsContent"+data.content)
        console.log("datateamId"+data.teamId)
    };


    const navigate = useNavigate(); // useNavigate 사용

    const handleHomeButton = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };


    return (
        <>
        <div css={s.mainLayout}>
            
            <div css={s.textTitle}>
                    뉴스
            </div>


            <TextEditor content={content} setContent={setContent}  />

            <div style={buttonBox}>

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