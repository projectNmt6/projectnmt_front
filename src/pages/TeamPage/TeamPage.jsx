import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MessagePage from '../MessagePage/MessagePage';
import Message from '../../components/Message/Message';

function TeamPage() {
    const location = useLocation();
    const data = location.state.teamInfo;
    console.log(data);    
    return (
        <div>
            <Link state={{teamInfo: data}} to={`/team/update?id=${data.teamId}`}>수정하기</Link>
            <Link state={{teamInfo: data}} to={`/team/member?id=${data.teamId}`}>회원관리</Link>
            <Link state={{teamInfo: data}} to={`/team/story?id=${data.teamId}`}>스토리관리</Link>
            <Message list={[{teamId:0, checked: true}] } isTeam={1} text={"문의보내기"}/>
            <div>
                <MessagePage isTeam={1}/>   
            </div>
        </div>
    );
}

export default TeamPage;