import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import { PostChallengeNews } from '../../../../apis/api/ChallengeApi';
import { getTeamListRequest } from '../../../../apis/api/teamApi';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { getChallengeList, getChallengePage, getChallengePageRequest, getUpdateChallengePageRequest, updateChallengeRequest } from '../../../../apis/api/DonationAPI';


function ChallengeNewsWrite() {

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


    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", challengePageId],
        async () => {
            const response = await getChallengePage({ page: challengePageId });
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
    const PostNews = useMutation({
        mutationKey: "PostNews",
        mutationFn: PostChallengeNews,
        onSuccess: response => {
            console.log("뉴스 작성 성공" + response)
        },
        onError: error => {
            console.log(error)
        }
    }) 

    const navigate = useNavigate(); // useNavigate 사용

    const handleHomeButton = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };
    const handleSubmitButton = () => {
        const data = {
            challengeNewsPageId: 0,
            challengePageId: challengePageId,
            pageCategoryId: 6,
            challengeNewsContent: content,
            teamId: teamId
        }
        PostNews.mutate(data);
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
                    console.error('Failed to fetch teams', error);
                }
            };

            fetchTeams();
        }
    }, [userId]);

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

export default ChallengeNewsWrite;