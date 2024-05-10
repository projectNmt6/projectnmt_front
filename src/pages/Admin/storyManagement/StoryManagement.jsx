/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from "react-query";
import Select from 'react-select';
import { donation } from "../../DonationStoryPage/style";
import { deleteDonationListRequest, deleteTeamListRequest, getAdminDonationListRequest, getStoryCountRequest, getTeamListRequest, updateDonationShowRequest } from "../../../apis/api/Admin";
import Message from "../../../components/Message/Message";
import { Link, useSearchParams } from "react-router-dom";
import AdminSearchPageNumbers from "../../../components/AdminSearchPageNumbers/AdminSearchPageNumbers";
import { getDonatorsByPageId } from "../../../apis/api/donatorApi";


function SearchPage(props) {

    const [ mainCategoryId, setMainCategoryId] = useState({value: 0, label: " 전체 "});
    const [ isTimeOut, setIsTimeOut] = useState({value: 0, label: " 전체 "});
    const [ donationIsShow, setDonationIsShow ] = useState({value: 0, label: " 전체 "});
    const [ selectedOption, setSelectedOption ] = useState({value: 0, label: " 전체 "});
    const [ searchText, setSearchText] = useState("");
    const [ storyList, setStoryList ] = useState([]);
    const [donator, setDonator] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ selectedStory, setSelectedStory ] = useState({});
    const searchCount = 10;
    const checkBoxRef = useRef();
    const storyLinkRef = useRef();
    const userId = searchParams.get("userId");
    const handleSearchTextOnChange = (e) => {
        setSearchText(() => e.target.value);
    }
    const searchSubmit = () => {
        setSearchParams({
            page: 1
        })
        getDonationListQuery.refetch();
    }
    
    const teamTypeCategoryOption = [
        { value: 0, label: " 전체 " },
        { value: 2, label: " 보류 중 " },
        { value: 1, label: " 확인 완료 " },
        { value: -1, label: " 삭제 요청 " }
    ]
    const TypeCategoryOption = [
        { value: 0, label: " 전체 " },
        { value: 1, label: " 기부하기 " },
        { value: 2, label: " 챌린지 " },
    ]
    const CategoryOption = [
        { value: 0, label: " 전체 " },
        { value: 1, label: " 모금 중 " },
        { value: -1, label: " 모금 완료 " },
    ]
    const searchTextCategoryOption = [
        {value: 0, label: " 전체 "},
        {value: 1, label: " 스토리 번호 "},
        {value: 2, label: " 스토리 타이틀 "},
        {value: 3, label: " 스토리 내용 "},
        {value: 4, label: " 태그 "},
        {value: 5, label: " 팀 명 "},
    ]
    const selectStyle1 = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            width: "150px",
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
            width: "150px",
            borderRight: "1px solid #dbdbdb",
            outline: "none",
            boxShadow: "none"
        })
    }
    const selectStyle3 = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            width: "200px",
            outline: "none",
            boxShadow: "none"
        })
    }
    const getDonationListQuery = useQuery(
        [ "getDonationListQuery", searchParams.get("page") ],
        async () => {
            return await getAdminDonationListRequest({
                pageId: searchParams.get("page"),
                searchCount,
                teamId: searchParams.get("teamId") !== "undefined" ? searchParams.get("teamId") : 0,
                mainCategoryId: mainCategoryId.value,
                isTimeOut: isTimeOut.value,
                donationIsShow: donationIsShow.value,
                selectedOption: selectedOption.value,
                searchText
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setStoryList(() => response.data.map(story => {
                    return {
                        ...story,
                        checked: false,
                        isDonation: 1
                    }
                }));
            }
        }
    );
    const getCountQuery = useQuery(
        [ "getCountQuery", storyList ],
        async () => await getStoryCountRequest({
            pageId: searchParams.get("page"),
            searchCount,
            teamId: searchParams.get("teamId") !== "undefined" ? searchParams.get("teamId") : 0,
            mainCategoryId: mainCategoryId.value,
            isTimeOut: isTimeOut.value,
            donationIsShow: donationIsShow.value,
            selectedOption: selectedOption.value,
            searchText
        }),
        {   
            onSuccess: response => {
            },
        }
    )
    const getDonatorQuery = useQuery(
        [ "getDonatorQuery", storyList ],
        async () => await getDonatorsByPageId({
            pageId: selectedStory.donationPageId
        }),
        {   
            onSuccess: response => {
                console.log(response);
                setDonator(response.data.map(donator => {
                    return {
                        ...donator,
                        checked: true
                    }
                }));
            },
        }
    )
    const handleAllCheckOnChange = (e) => {
        setStoryList(() =>storyList.map(story => {
            return {
                ...story,
                checked: e.target.checked
            }
        }));
    }
    const handleCheckOnChange = (e) => {
        const storyId = parseInt(e.target.value);
        setStoryList(() =>storyList.map(story => {
            if (story.isDonation === 1) {
                if(storyId === story.donationPageId) {
                    setSelectedStory(() => story);
                    console.log(story);
                    return {
                        ...story,
                        checked: e.target.checked
                    }
                } else {
                    return story
                }
            } else {
                if(storyId === story.challengePageId) {
                    setSelectedStory(() => story);
                    return {
                        ...story,
                        checked: e.target.checked
                    }
                } else {
                    return story
                }
            }
        }));
        if(!e.target.checked) {
            checkBoxRef.current.checked = false
        }
    }
    
    const deleteDonationMutation = useMutation({
        mutationKey: "deleteDonationMutation",
        mutationFn: deleteDonationListRequest,
        onSuccess: response => {
            alert("삭제완료.");
        },
        onError: error => {}
    })  
    const handleDeleteDonationsOnClick = () => {
        if(!window.confirm("정말로 해당 스토리들을 삭제하시겠습니까?")) return;
        const list =  storyList.filter(story => story.checked);
        deleteDonationMutation.mutate(list);
    }
    const updateDonationShowMutation = useMutation({
        mutationKey: "updateDonationShowMutation",
        mutationFn: updateDonationShowRequest,
        onSuccess: response => {
            alert("수정완료.");
            getDonationListQuery.refetch();
        },
        onError: error => {}
    })   
    const pagePermitButtonOnClick = (id) => {
        updateDonationShowMutation.mutate([{donationPageId: id}]);
        
    }
    const pageListPermitButtonOnClick = () => {
        const tempList = storyList.filter(story =>story.checked);
        updateDonationShowMutation.mutate(tempList);
    }

    return (
        <div css={s.mainContainer}>
            <div>
                
                <div css={s.buttonContainer}>
                    <Message list={storyList} isTeam={1} text={"팀 공지"} />
                    <div style={{marginLeft:"82px"}}>
                        <Message list={donator} isTeam={0} text={"후원자 공지"}/>
                    </div>
                    <button onClick={pageListPermitButtonOnClick} css={s.baseButton}> 확인완료 </button>
                    <button onClick={handleDeleteDonationsOnClick} css={s.baseButton}>스토리 삭제</button>
                </div>
            </div>
            <div css={s.container}>
                <table css={s.registerTable}>
                    {
                        selectedStory.isDonation === 1 ?
                        <tbody>
                            <tr>
                                <th css={s.registerTh}>스토리 번호</th>
                                <td>
                                    {selectedStory.donationPageId}
                                </td>
                                <th css={s.registerTh}>스토리 타이틀</th>
                                <td>
                                    {selectedStory.storyTitle}
                                </td>
                                <td rowSpan={3} style={{width:"200px"}}>
                                    <div css={s.imgBox}>
                                        <div style={{display:"none"}}>
                                            <Link to={`/donation?page=${selectedStory.donationPageId}`} ref={storyLinkRef}></Link>
                                        </div>
                                        <img src={selectedStory.mainImgUrl} alt="" onClick={() => storyLinkRef.current.click()}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th css={s.registerTh}>모금 현황 / 모금 목표</th>
                                <td >
                                    {donator[0].addAmount} / {selectedStory.goalAmount}
                                </td>
                                <th css={s.registerTh}>기부 / 챌린지</th>
                                <td >
                                    {selectedStory.mainCategoryName}
                                </td>                                
                            </tr>
                            <tr>
                            <th css={s.registerTh}> 보류상태 </th>
                                <td>
                                    {selectedStory.donationPageShow === 1 ?  "확인 완료" : selectedStory.donationPageShow === 2 ? " 보류 중 " : "삭제 요청" }  
                                </td>
                                <th css={s.registerTh}>팀 명</th>
                                <td >
                                    {selectedStory.teamName}
                                </td>
                            </tr>
                        </tbody>
                        : <tbody>
                        <tr>
                            <th css={s.registerTh}>스토리 번호</th>
                            <td>
                                {selectedStory.donationPageId}
                            </td>
                            <th css={s.registerTh}>스토리 타이틀</th>
                            <td>
                                {selectedStory.storyTitle}
                            </td>
                            <td rowSpan={3} style={{width:"200px", boxSizing:"border-box", padding:"5px"}}>
                                <div css={s.imgBox}>
                                    <img src={selectedStory.mainImgUrl} alt="" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>모금 현황 / 모금 목표</th>
                            <td >
                                {selectedStory.goalAmount}
                            </td>
                            <th css={s.registerTh}>main_category_id</th>
                            <td >
                                {selectedStory.mainCategoryName}
                            </td>                                
                        </tr>
                        <tr>
                            <th css={s.registerTh}>donation_page_show</th>
                            <td>
                                
                            </td>
                            <th css={s.registerTh}>page_category_id</th>
                            <td >
                            </td>
                        </tr>
                    </tbody>
                    }
                    </table>
                <div css={s.searchBar}>
                    <Select 
                        options={teamTypeCategoryOption}
                        styles={selectStyle1} 
                        onChange={(e) => {setDonationIsShow(() => e)}}
                    />
                    <Select 
                        options={CategoryOption}
                        styles={selectStyle1} 
                        onChange={(e) => {setIsTimeOut(() => e)}}
                    />
                    <Select 
                        options={TypeCategoryOption}
                        styles={selectStyle2} 
                        onChange={(e) => {setMainCategoryId(() => e)}}
                    />
                    <Select 
                        options={searchTextCategoryOption}
                        styles={selectStyle3} 
                        onChange={(e) => {setSelectedOption(() => e)}}
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
                                <th>스토리 번호</th>
                                <th>스토리 타이틀</th>
                                <th>모금 현황</th>
                                <th>보류 상태</th>
                                <th>카테고리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storyList.map(
                                    story => 
                                    <>
                                    
                                    {
                                        story?.isDonation === 1 ?
                                        <tr key={story.donationPageId}>
                                            <td><input type="checkbox" value={story.donationPageId} checked={story.checked} onChange={handleCheckOnChange}/></td>
                                            <td>{story.donationPageId}</td>
                                            <td>{story.storyTitle}</td>
                                            <td>{story.goalAmount}</td>
                                            <td>{story.donationPageShow === 1 ?  "확인 완료" : story.donationPageShow === 2 ? <button onClick={() => pagePermitButtonOnClick(story.donationPageId)} css={s.showButton}> 보류 중 </button> : "삭제 요청"}</td>
                                            <td>{story.mainCategoryName}</td>
                                        </tr>
                                    :
                                        <tr key={story.donationPageId}>
                                            <td><input type="checkbox" value={story.donationPageId} checked={story.checked} onChange={handleCheckOnChange}/></td>
                                            <td>{story.donationPageId}</td>
                                            <td>{story.storyTitle}</td>
                                            <td>{story.goalAmount}</td>
                                            <td>{story.donationPageShow === 1 ?  "확인 완료" : story.donationPageShow === 2 ? " 보류 중 " : "삭제 요청"}</td>
                                            <td>{story.mainCategoryName}</td>
                                        </tr>
                                    }
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

export default SearchPage;
