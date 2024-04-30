import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Select from "react-select";
import { useMutation, useQuery } from 'react-query';
import { deleteTeamListRequest, getTeamListRequest, postMessageRequest } from '../../../apis/api/Admin';
import { Link, useSearchParams } from 'react-router-dom';
import Message from '../../../components/Message/Message';

function TeamManagement(props) {
    const [ teamList, setTeamList ] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchText, setSearchText ] = useState("");

    const checkBoxRef = useRef();
    const userId = searchParams.get("userId");
    const handleSearchTextOnChange = (e) => {
        setSearchText(() => e.target.value);
    }
    const searchSubmit = () => {
        setSearchParams({
            page: 1
        })
    }
    const getTeamListQuery = useQuery(
        [ "getTeamListQuery" ],
        async () => {
            return await getTeamListRequest()
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setTeamList(() => response.data.map(team => {
                    return {
                        ...team,
                        checked: false
                    }
                }));
            }
        }
    );
    const handleOnChange = (e, setOption) => {
        setOption(() => e);
    }
    const searchTextCategoryOption = [
        {value: 0, label: " 전체 "},
        {value: 1, label: " 유저번호 "},
        {value: 2, label: " 아이디 "},
        {value: 3, label: " 유저명 "},
        {value: 4, label: " 전화번호 "},
        {value: 5, label: " 이메일 "},
    ]
    const searchRoleCategoryOption = [
        {value: 0, label: " 전체 "},
        {value: 1, label: " 일반사용자 "},
        {value: 2, label: " 팀 프로젝트 "},
        {value: 3, label: " 관리자 "},
        {value: 5, label: " 사용제한된 유저 "},
    ]

    const handleAllCheckOnChange = (e) => {
        setTeamList(() =>teamList.map(team => {
            return {
                ...team,
                checked: e.target.checked
            }
        }));
    }
    const handleCheckOnChange = (e) => {
        const teamId = parseInt(e.target.value);
        setTeamList(() =>teamList.map(team => {
            if (teamId === team.teamId) {
                return {
                    ...team,
                    checked: e.target.checked
                }
            } else {
                return team
            }
            }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
    }
    useEffect(() => {
        for(let team of teamList) {
            checkBoxRef.current.checked = team.checked;
            if(!checkBoxRef.current.checked) {
                break;
            }
        }
        
    },[teamList])
    const deleteTeamMutation = useMutation({
        mutationKey: "deleteTeamMutation",
        mutationFn: deleteTeamListRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => {}
    })  
    const handleDeleteTeamsOnClick = () => {
        if(!window.confirm("정말로 해당 팀들을 삭제하시겠습니까?")) return;
        let teamIds = [];
        for(let team of teamList) {
            if(team.checked) {
                teamIds = [...teamIds, {teamId: team.teamId, teamName: team.teamName}];
            }
        }
        deleteTeamMutation.mutate(teamIds);
    }

    return (
        <div >
            <button onClick={handleDeleteTeamsOnClick}>선택된 팀 삭제</button>
            <Message list={teamList} isTeam={1}/>
            <div css={s.searchBar}>
                    <select 
                        options={searchRoleCategoryOption}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <div css={s.nullDiv}></div>

                    <Select 
                        options={searchTextCategoryOption}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <input 
                            css={s.searchInput} 
                            type="text" 
                            value={searchText}
                            onChange={handleSearchTextOnChange}
                            />
                    <button css={s.searchButton} onClick={() => searchSubmit()}>검색하기</button>
                </div>
                <table >
                    <thead>
                        <tr >
                            <th><input type="checkbox" ref={checkBoxRef} onChange={handleAllCheckOnChange}/></th>
                            <th>팀번호</th>
                            <th>팀명</th>
                            <th>로고URL</th>
                            <th>상세정보 보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teamList.map(
                                team => 
                                <tr key={team.teamId}>
                                    <td><input type="checkbox" value={team.teamId} checked={team.checked} onChange={handleCheckOnChange}/></td>
                                    <td>{team.teamId}</td>
                                    <td>{team.teamName}</td>
                                    <td><img src={team.teamLogoImgUrl} alt="" /></td>
                                    <td><Link to={`/team/info?id=${team.teamId}`}>상세정보</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    );
}

export default TeamManagement;