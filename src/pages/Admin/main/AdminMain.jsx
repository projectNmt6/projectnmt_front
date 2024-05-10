/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Message from '../../../components/Message/Message';
import MessagePage from '../../MessagePage/MessagePage';
import UserManagement from "../userManagement/UserManagement";
import TeamManagement from "../TeamManagement/TeamManagement";
import SearchPage from "../storyManagement/StoryManagement";

function AdminMain(props) {
    const [selectedTab, setSelectedTab] = useState('profile');
    const [ searchParams, setSearchParams ] = useSearchParams();

    return (
        <div>
            <div>
                        <div>
                            <div css={s.div}>
                                <button css={s.button1} onClick={() => {
                                    setSelectedTab(() => "profile")
                                    setSearchParams({
                                        page: 1
                                    })
                                }}> 유저관리 </button>
                                <button css={s.button1} onClick={() => {
                                    setSelectedTab(() => "donation")
                                    setSearchParams({
                                        page: 1
                                    })
                                }}>팀 관리</button>
                                <button css={s.button1} onClick={() =>  {
                                    setSelectedTab(() => "team")
                                    setSearchParams({
                                        page: 1
                                    })
                                }}>스토리 관리</button>
                                <button css={s.button1} onClick={() =>  {
                                    setSelectedTab(() => "message")
                                    setSearchParams({
                                        page: 1
                                    })
                                }}>문의 사항</button>
                            </div>
                            {
                                selectedTab === "profile"
                                    ?
                                    <>
                                        <span css={s.span}> 유저관리 </span>
                                        <UserManagement />
                                    </>
                                : selectedTab === "donation"
                                    ? <div>
                                        <span css={s.span}> 팀 관리</span>
                                        <TeamManagement />
                                    </div>
                                : selectedTab === "team"
                                    ? <div>
                                        <span css={s.span}> 스토리 관리 </span>
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