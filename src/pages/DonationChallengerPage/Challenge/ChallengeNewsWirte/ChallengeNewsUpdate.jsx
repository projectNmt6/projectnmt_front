import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { useMutation, useQuery } from 'react-query';
import { getChallengeNewsRequest } from '../../../../apis/api/ChallengeApi';
import { getTeamListRequest } from '../../../../apis/api/teamApi';
import { updateChallengeNewsRequest } from '../../../../apis/api/DonationAPI';
import TextEditor from '../../../../components/TextEditor/TextEditor';

function ChallengeNewsUpdate() {

    const [content, setContent] = useState("");
    const [teamId, setTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const challengePageId = queryParams.get('page');
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
                const response = await getChallengeNewsRequest(challengePageId);

                if (response && response.data) {
                    setContent(response.data.challengeNewsContent);
                    setTeamId(response.data.teamId);
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error('Error fetching donation page:', error);
            }
        };
        fetchData();
    }, [challengePageId]);
    console.log("teamId"+teamId)
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
    const navigate = useNavigate(); // useNavigate 사용

    const handleHomeButton = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const UpdateChallengeNews = useMutation({
        mutationKey: "UpdateChallengeNews",
        mutationFn: updateChallengeNewsRequest,
        onSuccess: response => {
            console.log("뉴스 업데이트 성공" + response)
        },
        onError: error => {
            console.log(error)
        }
    })

    const handleSubmitButton = () => {
        const data = {
            challengePageId: challengePageId,
            pageCategoryId: 6,
            challengeNewsContent: content,
            teamId: teamId
        }
        UpdateChallengeNews.mutate(data);
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

export default ChallengeNewsUpdate;