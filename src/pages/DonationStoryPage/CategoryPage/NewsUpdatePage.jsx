import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import { getPrincipalRequest } from '../../../apis/api/principal';
import { getTeamListRequest } from '../../../apis/api/teamApi';
import { useMutation, useQuery } from 'react-query';
import { getDonationNewsRequest, getDonationStoryRequest, updateDonationNewsPageResponse, updateNewsRequest } from '../../../apis/api/DonationAPI';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { errorSelector } from 'recoil';

function NewsUpdatePage() {

    const [content, setContent] = useState("");
    const [teamId, setTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [userId, setUserId] = useState()

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
        const fetchData = async () => {
            try {
                const response = await getDonationNewsRequest(donationPageId);

                if (response && response.data && response.data.newsContent) {
                    setContent(response.data.newsContent);
                    setTeamId(response.data.teamId);
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [donationPageId]);

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

    console.log("team:" + teamId)

    useEffect(() => {
        if (selectedTeam && selectedTeam.label === undefined) {
            const team = teams.find(team => team.value === selectedTeam.value);
            if (team) {
                setSelectedTeam(team);
            }
        }
    }, [selectedTeam, teams]);

    const navigate = useNavigate(); // useNavigate 사용

    const handleHomeButton = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };


    const UpdateDonationNews = useMutation({
        mutationKey: "UpdateDonationNews",
        mutationFn: updateNewsRequest,
        onSuccess: response => {
            console.log("뉴스 업데이트 성공" + response)
        },
        onError: error => {
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
        UpdateDonationNews.mutate(data);
        console.log("newsContent" + data.content)
        console.log("datateamId" + data.teamId)
    };

    return (
        <div>

            <div css={s.mainLayout}>

                <div css={s.textTitle}>
                    뉴스
                </div>


                <TextEditor content={content} setContent={setContent} />

                <div style={s.buttonBox}>

                    <button css={s.buttonStyle} onClick={handleSubmitButton}>
                        작성완료
                    </button>
                    <button css={[s.buttonStyle, s.backButtonStyle]} onClick={handleHomeButton}>
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsUpdatePage;