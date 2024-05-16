import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MessagePage from '../MessagePage/MessagePage';
import Message from '../../components/Message/Message';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
function TeamPage() {
    const location = useLocation();
    const data = location.state.teamInfo;
    console.log(data);    
    return (
        <div>
            <div>

            <div css={s.moreLoad}>
            <Link css={s.textCss} state={{teamInfo: data}} to={`/team/update?id=${data.teamId}`}>수정하기</Link>

            </div>
            <div  css={s.moreLoad}>

            <Link  css={s.textCss} state={{teamInfo: data}} to={`/team/member?id=${data.teamId}`}>회원관리</Link>
            </div>
            <div  css={s.moreLoad}>
            <Link css={s.textCss} state={{teamInfo: data}} to={`/team/story?id=${data.teamId}`}>스토리관리</Link>
            </div>
            <div css={s.moreLoad2}>
            <Message list={[{teamId:0, checked: true}] } senderId={data.teamId} isTeam={1} text={"문의보내기"}/>
            </div>
            <div>
                <MessagePage isTeam={1}/>   
            </div>
            </div>
        </div>
    );
}

export default TeamPage;