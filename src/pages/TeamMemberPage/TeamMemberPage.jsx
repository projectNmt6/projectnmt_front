import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from "react-query";
import { getTeamMemberInfoRequest } from '../../apis/api/teamApi';
import { button } from '../MessagePage/style';
import { shareKakao } from '../../apis/utils/shareKakaoLink';

import * as s from './style';
import { div } from '../SignInPage/style';
/** @jsxImportSource @emotion/react */
function TeamMemberPage(props) {
    const location = useLocation();
    const teamInfo = location.state.teamInfo;
    const [ membersId, setMembersId ] = useState(); 
    const [ members, setMembers ] = useState();
    useEffect(() => {
        const memberIds = teamInfo.teamMembers.map(member => `userId=${member.userId}`).join('&');
        setMembersId(() => `teamId=${teamInfo.teamId}&${memberIds}`);
      },[])
    const getDonationListQuery = useQuery(
        ["getDonationQuery", membersId],
        async () => await getTeamMemberInfoRequest(membersId),
        {
            refetchOnWindowFocus: false,
            enabled: !!membersId,
            onSuccess: response => {
                setMembers(() => response.data);
                console.log(response.data);
            }
    });
    const handleShareKakao = () => {
        console.log("work");
        const route = `http://localhost:3000/team/join?id=${teamInfo.teamId}`; // 현재 페이지 URL
        const title = teamInfo.teamName; // 기부 스토리 제목
        const THU = teamInfo.teamImgLogo;
        const content = "팀과 함께 행동하기!"
        const page = teamInfo.teamId;
        shareKakao(route, title, THU, content, page);
    };
    return (
        <>
        <div css={s.layout}>

        <div css={s.text}>
            팀원들에게 카카오톡으로 공유하기
        </div>
        <div css={s.button} onClick={handleShareKakao}>공유하기</div>
        
        </div>
        </>

    );
}

export default TeamMemberPage;