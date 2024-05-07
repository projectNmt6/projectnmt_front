import React, { useCallback, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { FiLogOut, FiUser,FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { useQuery, useQueryClient } from 'react-query';
import instance from '../../apis/utils/instance';
import axios from 'axios';

function RootHeader(props) {
    const [isLogin, setLogin] = useState(false);
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("principalQuery");
    const [isAdmin, setIsAdmin] = useState();
    const [headerLine, setHeaderLine] = useState("");
    useEffect(() => {
        setLogin(() => principalState.status === "success");
        setIsAdmin(() => !!principalState?.data?.data.authorities.filter(authority => authority.authority === "ROLE_ADMIN")[0])
    }, [principalState.status])

    const handleOpenMenuClick = (e) => {
        e.stopPropagation();
    }
    
    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken");
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");
        window.location.replace("/auth/signin");
    }
    const handleHeaderLine = (value) => {
        setHeaderLine(value);
    }
    console.log(headerLine);
    return (
        <div css={s.header}>
            <Link css={s.account} to={"/"}>
                <FaHome size={25} />
            </Link>
            <div css={s.header1}>
                <div css={s.mainbox(headerLine)}>
                    <Link to={"/main"} onClick={() => handleHeaderLine("기부")} > 기부하기 </Link>
                </div>
                <div css={s.challengebox(headerLine)}>
                    <Link to={"/main/donations/challenge"} onClick={() => handleHeaderLine("챌린지")}>챌린지</Link>
                </div>
                <div css={s.adminbox(true)}>
                    {isAdmin ? <Link to={"/admin/main"} > 관리자 </Link> : null}
                </div> 
            </div>

            <div css={s.div}>
                {
                    !isLogin ?
                        <div css={s.div}>
                            <Link css={s.account} to={"/auth/signin"}>
                                <FiUser size={22} />
                            </Link>
                            <Link to={"/search"} css={s.searchIcon}><FiSearch size={22} /></Link>
                        </div>
                        : <div css={s.accountItems}>
                            <button css={s.logout} onClick={handleLogoutClick}>
                                <FiLogOut size={22} />
                            </button>
                            <Link css={s.account} to={"/account/mypage"}>
                                <FiUser size={22} />
                            </Link>
                            <Link to={"/search"} css={s.searchIcon}><FiSearch size={22} /></Link>
                        </div>
                }

            </div>

        </div>
    );
}

export default RootHeader;