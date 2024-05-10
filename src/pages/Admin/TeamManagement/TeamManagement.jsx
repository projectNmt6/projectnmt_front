import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Select from "react-select";
import { useMutation, useQuery } from 'react-query';
import { deleteTeamListRequest, getTeamCountRequest, getTeamListRequest, postMessageRequest } from '../../../apis/api/Admin';
import { Link, useSearchParams } from 'react-router-dom';
import Message from '../../../components/Message/Message';
import { link } from '../../DonationStoryPage/style';
import AdminSearchPageNumbers from '../../../components/AdminSearchPageNumbers/AdminSearchPageNumbers';
import { account } from '../../../components/rootHeader/style';
import { IoClose } from 'react-icons/io5';

function TeamManagement(props) {
    const [ teamList, setTeamList ] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchText, setSearchText ] = useState("");
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ selectedSearchTextOption, setSelectedSearchTextOption ] = useState({});
    const [ selectedTeam, setSelectedTeam  ] = useState("");
    const [ showModal, setShowModal  ] = useState(false);
    const searchCount = 10;

    const checkBoxRef = useRef();
    const linkRef = useRef();
    const userId = searchParams.get("userId");
    const handleSearchTextOnChange = (e) => {
        setSearchText(() => e.target.value);
    }
    const searchSubmit = () => {
        setSearchParams({
            page: 1
        })
        getTeamListQuery.refetch();
    }
    
    const teamTypeCategoryOption = [
        { value: 0, label: " 전체 " },
        { value: -2, label: " 개인 " },
        { value: -1, label: " 법인 " },
        { value: 1, label: " 사회복지시설/사회복지법인 " },
        { value: 2, label: " 복지관(종합/노인/장애인 등) " },
        { value: 3, label: " 비영리법인/비영리민간단체 " },
        { value: 4, label: " 비영리(임의)단체 " },
        { value: 5, label: " 사회적경제 영역(소셜벤처, 사회적기업, 협동조합 등) " },
        { value: 6, label: " 기타 " }
    ]
    const searchTextCategoryOption = [
        {value: 0, label: " 전체 "},
        {value: 1, label: " 팀 번호 "},
        {value: 2, label: " 팀 명 "},
        {value: 3, label: " 사업자 등록 번호 "},
        {value: 4, label: " 대표 이메일 "},
        {value: 5, label: " 대표 번호 "},
    ]
    const selectStyle1 = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            width: "280px",
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

    
    const getTeamListQuery = useQuery(
        [ "getTeamListQuery", searchParams.get("page") ],
        async () => {
            return await getTeamListRequest({
                userId: searchParams.get("userId") !== "undefined" ? searchParams.get("userId") : 0,
                selectedSearchTextOption: selectedSearchTextOption.value,
                selectedCategory: selectedCategory.value    ,
                searchCount,
                searchText,
                pageNumber: searchParams.get("page")
            })
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

    const getCountQuery = useQuery(
        [ "getCountQuery", getTeamListQuery.data],
        async () => await getTeamCountRequest({
            userId: searchParams.get("userId") !== "undefined" ? searchParams.get("userId") : 0,
            selectedSearchTextOption: selectedSearchTextOption.value,
            selectedCategory: selectedCategory.value    ,
            searchCount,
            searchText,
            pageNumber: searchParams.get("page")
        }),
        {   
            onSuccess: response => {
                console.log(response);
            },
        }
    )
    const handleOnChange = (e, setOption) => {
        setOption(() => e);
    }
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
                setSelectedTeam(() => team);
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
        <div css={s.mainContainer}>
            <div>

                <div css={s.buttonContainer}>
                    <Message list={teamList} isTeam={1} text={"공지 보내기"}/>
                    <button onClick={handleDeleteTeamsOnClick} css={s.baseButton}>팀 해체</button>
                    <button onClick={() => linkRef.current.click()} css={s.baseButton}>스토리 보기</button>
                    <Link to={`/admin/management/story?page=1&teamId=${selectedTeam.teamId}`} style={{display:"none"}} ref={linkRef}></Link>
                </div>
            </div>
            <div css={s.container}>
                <table css={s.registerTable}>
                        <tbody>
                            <tr>
                                <th css={s.registerTh}>팀 번호</th>
                                <td>
                                    <div >{selectedTeam?.teamId}</div>
                                </td>
                                <th css={s.registerTh}>팀명</th>
                                <td>
                                    {selectedTeam?.teamName}
                                </td>
                                <td rowSpan={3} style={{width:"200px"}}>
                                    <div css={s.imgBox}>
                                        <img src={selectedTeam?.teamLogoImgUrl} alt="" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th css={s.registerTh}>카테고리</th>
                                <td >
                                    {selectedTeam?.teamTypeCategoryName !== null ?  selectedTeam.teamTypeCategoryName : " 개인 " }
                                </td>
                                <th css={s.registerTh}>홈페이지</th>
                                <td onClick={() => window.open("http://" + selectedTeam?.teamHomepage)}>
                                        {selectedTeam?.teamHomepage}
                                </td>
                                
                            </tr>
                            <tr>
                            <th css={s.registerTh}>사업자 등록 번호</th>
                                <td>
                                    {selectedTeam?.companyRegisterNumber}
                                </td>
                                <th css={s.registerTh}>팀 계좌 목록</th>
                                <td >
                                    <button css={null} onClick={() => setShowModal(true)}>목록 열기</button>
                                    <div css={s.layout(showModal)}>
                                        <div css={s.accountBox}>
                                            <button onClick={() => setShowModal(false)} css={s.accountBoxButton}><IoClose/></button>
                                            {selectedTeam?.accounts?.map(account => {
                                                    return <div> 
                                                        <div>{account.bankName}</div>
                                                        <div>{account.accountUsername}</div>
                                                        <div>{account.accountNumber}</div>
                                                    </div>
                                                
                                            })}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div css={s.searchBar}>
                    <Select 
                        options={teamTypeCategoryOption}
                        styles={selectStyle1} 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(() => e)}
                    />
                    <div css={s.nullDiv}></div>
                    <Select 
                        options={searchTextCategoryOption}
                        styles={selectStyle2} 
                        value={selectedSearchTextOption}
                        onChange={(e) => setSelectedSearchTextOption(() => e)}
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
                                <th>팀 번호</th>
                                <th>팀 명</th>
                                <th>대표 번호</th>
                                <th>이메일</th>
                                <th>카테고리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamList.map(
                                    team => 
                                    <>
                                        <tr key={team.teamId}>
                                            <td><input type="checkbox" value={team.teamId} checked={team.checked} onChange={handleCheckOnChange}/></td>
                                            <td>{team.teamId}</td>
                                            <td>{team.teamName}</td>
                                            <td>{team.teamPhoneNumber}</td>
                                            <td>{team.teamEmail}</td>
                                            <td>{team.teamTypeCategoryName !== null ?  team.teamTypeCategoryName : " 개인 " }</td>
                                        </tr>
                                    </>
                                )
                                }
                        </tbody>
                    </table>
                </div>
                <AdminSearchPageNumbers count={getCountQuery?.data?.data} page={searchParams.get("page")}/>
            </div>
        </div>
    );
}

export default TeamManagement;