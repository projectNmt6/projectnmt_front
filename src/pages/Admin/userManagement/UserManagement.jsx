/** @jsxImportSource @emotion/react */

import * as s from "./style";
import Select from "react-select";
import React, { useEffect, useRef, useState } from 'react';
import { deleteUsersRequest, getUserCountRequest, getUserListRequest, postMessageRequest, postUserRoleRequest, updateDeleteUsersRequest } from '../../../apis/api/Admin'
import { useMutation, useQuery } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';
import Message from '../../../components/Message/Message';
import CommentManagement from "../commentManagement/CommentManagement";
import AdminSearchPageNumbers from "../../../components/AdminSearchPageNumbers/AdminSearchPageNumbers";

function UserManagement({page, }) {
    const checkBoxRef = useRef();
    const linkRef = useRef();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ userList, setUserList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ selectedUser, setSelectedUser ] = useState({});
    const [selectedTextOption, setSelectedTextOption] = useState({value: 0, label: "전체"});
    const [selectedRoleoption, setSelectedRoleoption] = useState({value: 0, label: "전체"});
    const searchCount = 10;
    const [activeTab, setActiveTab] = useState("userInfo"); // 추가된 탭 상태

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const handleSearchTextOnChange = (e) => {
        setSearchText(() => e.target.value);
    }
    const handleOnChange = (e, setOption) => {
        setOption(() => e);
    }
    const selectStyle1 = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            width: "200px",
            borderRight: "1px solid #dbdbdb",
            outline: "none",
            boxShadow: "none"
        })
    }
    const selectStyle2 = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            width: "200px",
            outline: "none",
            boxShadow: "none"
        })
    }
    const userListQuery = useQuery(["userListQuery", selectedRoleoption, searchText, searchParams.get("page")], 
    async () => { return await getUserListRequest(
        {
        searchCount,
        selectedRoleoption: selectedRoleoption.value,
        selectedTextOption: selectedTextOption.value,
        searchText,
        pageNumber: searchParams.get("page")
    }
    )}
    , {
        retry: 3,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setUserList(() => response.data.map(user => {
                return {
                    ...user,
                    checked: false
                }
            }));
        }
    });

    const getCountQuery = useQuery(
        ["getCountQuery", userListQuery.data],
        async () => await getUserCountRequest({
            searchCount,
            selectedRoleoption: selectedRoleoption.value,
            selectedTextOption: selectedTextOption.value,
            searchText,
            pageNumber: searchParams.get("page")
        }),
        {   
            onSuccess: response => {
                console.log(response);
            },
        }
    )
    const handleAllCheckOnChange = (e) => {
        setUserList(() =>userList.map(user => {
            return {
                ...user,
                checked: e.target.checked
            }
        }));
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

    



    const handleCheckOnChange = (e) => {
        const userId = parseInt(e.target.value);
        setUserList(() =>userList.map(user => {
            if (userId === user.userId) {
                if(e.target.checked) {
                    console.log(user);
                    setSelectedUser(() => user);
                } else {
                    setSelectedUser({});    
                }
                return {
                    ...user,
                    checked: e.target.checked
                }
            } else {
                return user
            }
            }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
    }
    useEffect(() => {
        for(let user of userList) {
            checkBoxRef.current.checked = user.checked;
            if(!checkBoxRef.current.checked) {
                break;
            }
        }
        
        },[userList])
    
    const searchSubmit = () => {
        setSearchParams({
            page: 1
        })
        userListQuery.refetch();
    }
    const deleteUserMutation = useMutation({
        mutationKey: "deleteUserMutation",
        mutationFn: deleteUsersRequest,
        onSuccess: response => {
            console.log(response);
            alert("삭제완료.");
        },
        onError: error => {}
    })   
    const handleUserDeleteOnClick = () => {
        if(!window.confirm("지정된 유저들의 계정을 삭제 하시겠습니까?")) {
            return
        }
        let userIds = [];
        for(let user of userList) {
            if(user.checked) {
                userIds = [...userIds, user.userId];
            }
        }
        deleteUserMutation.mutate(userIds)
    }
    const addUserRoleMutation = useMutation({
        mutationKey: "addUserRoleMutation",
        mutationFn: postUserRoleRequest,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    }) 
    const handleAdminRoleClick = (roleId) => {
        addUserRoleMutation.mutate({ userId: selectedUser?.userId, roleId: roleId})
    }
    return (
        <div css={s.mainContainer}>
            <div>
                
                <div css={s.buttonContainer}>
                    <Message list={userList} isTeam={0} text={"공지 보내기"}/>
                    <button onClick={handleUserDeleteOnClick} css={s.baseButton}>계정 삭제</button>
                    <button onClick={() => linkRef.current.click()} css={s.baseButton}> 소속팀 보기</button>
                    <Link to={`/admin/management/team?page=1&userId=${selectedUser.userId}`} style={{display:"none"}} ref={linkRef}></Link>
                    <button onClick={() => handleAdminRoleClick(3)} css={s.baseButton}> 관리자 권한 부여 </button>
                    <button onClick={() => handleAdminRoleClick(5)} css={s.baseButton}>사용 권한 제제</button>
                </div>
            </div>
            <div css={s.container}>
            <div >
                    <button onClick={() => handleTabChange("userInfo")} css={activeTab === "userInfo" ? s.baseButton : s.baseButton}>User Info</button>
                    <button onClick={() => handleTabChange("comments")} css={activeTab === "comments" ? s.baseButton : s.baseButton}>Comments</button>
                </div>

                 {activeTab === "userInfo" && (
                    <div>
                                       <table css={s.registerTable}>
                        <tbody>
                            <tr>
                                <th css={s.registerTh}>유저번호</th>
                                <td>
                                    <div >{selectedUser?.userId}</div>
                                </td>
                                <th css={s.registerTh}>유저명</th>
                                <td>
                                    {selectedUser?.name}
                                </td>
                                <td rowSpan={3} style={{width:"200px", boxSizing:"border-box", padding:"5px"}}>
                                    <div css={s.imgBox}>
                                        <img src={selectedUser?.profileImg} alt="" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th css={s.registerTh}>이메일</th>
                                <td >
                                    {selectedUser?.email}
                                </td>
                                <th css={s.registerTh}>전화번호</th>
                                <td>
                                    {selectedUser.phoneNumber}
                                </td>
                            </tr>
                            <tr>
                            <th css={s.registerTh}>아이디</th>
                                <td colSpan={3}>
                                    {selectedUser?.username}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div css={s.searchBar}>
                    <Select 
                        options={searchRoleCategoryOption}
                        defaultValue={selectedRoleoption}
                        value={selectedRoleoption}
                        styles={selectStyle1} 
                        onChange={(e) => handleOnChange(e, setSelectedRoleoption)}
                    />
                    <div css={s.nullDiv}></div>

                    <Select 
                        options={searchTextCategoryOption}
                        defaultValue={selectedTextOption}
                        value={selectedTextOption}
                        styles={selectStyle2} 
                        onChange={(e) => handleOnChange(e, setSelectedTextOption)}
                    />
                    <input 
                            css={s.searchInput} 
                            type="text" 
                            value={searchText}
                            onChange={handleSearchTextOnChange}
                            />
                    <button css={s.searchButton} onClick={() => searchSubmit()}>검색하기</button>
                </div>
                <div css={s.tableLayout}>
                    <table css={s.table} >
                        <thead>
                            <tr css={s.tableHeader} key={0}>
                                <th><input type="checkbox" ref={checkBoxRef} onChange={handleAllCheckOnChange}/></th>
                                <th>유저번호</th>
                                <th>아이디</th>
                                <th>유저명</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th>권한</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList.map(
                                    user => 
                                    <>
                                        <tr key={user.userId}>
                                            <td><input type="checkbox" value={user.userId} checked={user.checked} onChange={handleCheckOnChange}/></td>
                                            <td>{user.userId}</td>
                                            <td>{user.username}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role[0].roleNameKor}</td>                                      
                                        </tr>
                                    </>
                                )
                                }
                        </tbody>
                    </table>
                    <AdminSearchPageNumbers count={getCountQuery.data?.data} page={searchParams.get("page")}/>
                </div>
                    </div>
                )}
                {activeTab === "comments" && (
                    <CommentManagement userId={selectedUser?.userId} />
                )}

                    
            </div>
        </div>
    );

}

export default UserManagement;