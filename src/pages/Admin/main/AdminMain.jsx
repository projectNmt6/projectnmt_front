/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../../components/Message/Message';
import MessagePage from '../../MessagePage/MessagePage';
import UserManagement from "../userManagement/UserManagement";
import TeamManagement from "../TeamManagement/TeamManagement";
import SearchPage from "../storyManagement/StoryManagement";

function AdminMain(props) {
    const [selectedTab, setSelectedTab] = useState('profile');

    return (
        <div>
            <div>
                        <div>
                            <div css={s.div}>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "profile")}>회원관리</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "donation")}>MyDonation</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "team")}>MyTeam</button>
                                <button css={s.button1} onClick={() => setSelectedTab(() => "message")}>MyMessage</button>
                            </div>
                            {
                                selectedTab === "profile"
                                    ?
                                    <>
                                        <span css={s.span}> 회원    </span>
                                        <Link to={"/admin/management/user?page=1"}>회원관리</Link>        
                                        <UserManagement />
                                    </>
                                : selectedTab === "donation"
                                    ? <div>
                                        <span css={s.span}> 신생 팀 리스트</span>
                                        <Link to={"/admin/management/team?page=1"}>팀 관리</Link>        
                                        <TeamManagement />
                                    </div>
                                : selectedTab === "team"
                                    ? <div css={s.div7}>
                                        <span css={s.span}> 오늘 신청된 스토리들 </span>
                                        <Link to={"/admin/management/story?page=1"}>게시글 관리</Link>   
                                        <SearchPage />
                                    </div>
                                : <div>
                                    <span css={s.span}> 문의 사항</span>
                                    <MessagePage isTeam={1} adminId={1}/> 
                                </div>
                            }
                        </div>
                    </div>
        </div>
    );
}

export default AdminMain;