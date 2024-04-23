/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "react-query";
import Select from 'react-select';
import { searchDonationRequest } from "../../../apis/api/DonationAPI";
import { donation } from "../../DonationStoryPage/style";
import { updateDonationShowRequest } from "../../../apis/api/Admin";
import Message from "../../../components/Message/Message";

function SearchPage(props) {

    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [selectedShowTag, setSelectedShowTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [ searchText, setSearchText] = useState("");
    const [ searchValue, setSearchValue] = useState("");
    const [donationList, setDonationList] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    const handleOnChange = (e) => {
            setSearchText(()=>e.target.value);
        }

    const searchSubmit = () => {
        setSearchValue(()=>searchText);
        console.log(searchValue);
    }


    useEffect(() => {
        axios.get("http://localhost:8080/main/storytypes")
            .then(response => {
                const options = response.data.map(mainTag => ({
                    value: mainTag.mainCategoryId,
                    label: mainTag.mainCategoryName
                }));
                setMainTagOptions([{value: 0, label: '전체'}, ...options]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/main/donationtag")
            .then(response => {
                const options = response.data.map(secondTag => ({
                    value: secondTag.donationTagId,
                    label: secondTag.donationTagName
                }));
                setSecondTagOptions(options);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleMainTagChange = (selectedOption) => {
        setSelectedMainTag(selectedOption);
    };
    const handleShowTagChange = (selectedOption) => {
        setSelectedShowTag(selectedOption);
    };

    const searchDonationQuery = useQuery(
        ["searchDonationQuery", searchValue],
        async () => {
            const response = await searchDonationRequest({ name: searchValue });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
                setDonationList(response.map(donation => ({
                    ...donation,
                    checked: false
                })));

            }
        }
    );

        useEffect(() => {
            let tempList = !!selectedMainTag && selectedMainTag?.value !== 0
            ? donationList.filter((donation) => donation.mainCategoryName === (selectedMainTag.label) )
            : donationList;
            tempList = !!selectedShowTag && selectedShowTag?.value !== 0
            ? tempList.filter((donation) => donation.donationPageShow === (selectedShowTag.value) )
            : tempList;
            setFilteredDonations(() => tempList);
        }, [selectedMainTag, donationList, selectedShowTag]);
    
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // sortOrder 상태가 변경될 때 자동으로 정렬 실행
    useEffect(() => {
            let sortDonations = filteredDonations; // 기존 목록을 복사
            if (sortOrder === '최고금액순') {
                sortDonations.sort((a, b) => parseInt(b.goalAmount) - parseInt(a.goalAmount));
            } else if (sortOrder === '최저금액순') {
                sortDonations.sort((a, b) => parseInt(a.goalAmount) - parseInt(b.goalAmount));        
                // sortDonations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
            }
            setFilteredDonations([...sortDonations]);
    }, [sortOrder]);
    const updateDonationShowMutation = useMutation({
        mutationKey: "updateDonationShowMutation",
        mutationFn: updateDonationShowRequest,
        onSuccess: response => {
            alert("수정완료.");
        },
        onError: error => {}
    })   
    const pagePermitButtonOnClick = (id) => {
        updateDonationShowMutation.mutate([{donationPageId: id}]);
    }
    const permitCheckBoxOnChange = (e) => {
        const donationPageId = parseInt(e.target.value);
        setDonationList(() =>donationList.map(donation => {
            if (donationPageId === donation.donationPageId) {
                return {
                    ...donation,
                    checked: e.target.checked
                }
            } else {
                return donation
            }
            }));
    }
    
    const pageListPermitButtonOnClick = () => {
        const tempList = donationList.filter(donation =>donation.checked);
        updateDonationShowMutation.mutate(tempList);
    }
    return (
        <>
        <div>
            <div css={s.searchBar}>
                <input 
                    css={s.searchInput} 
                    type="text" 
                    value={searchText}
                    onChange={handleOnChange}
                />
                <button css={s.searchButton} onClick={() => searchSubmit()}>검색</button>
            </div>
            <Message list={donationList} isTeam={1}/>
        </div>
        <div css={s.searchSelect}>
            <div css={s.searchCategory}>
            <Select
                    options={mainTagOptions}
                    value={selectedMainTag}
                    placeholder="종류를 선택해주세요"
                    onChange={handleMainTagChange}
                />
            <Select
                options={[{value: 0, label: "전체"}, {value:1, label: "확인완료"}, {value:2, label:"보류 중"}]}
                value={selectedShowTag}
                placeholder="종류를 선택해주세요"
                onChange={handleShowTagChange}
            />
            </div>
            <div>
                <select onChange={handleSortChange}>
                    <option value="금액순">금액 순</option>
                    <option value="최고금액순">최고 금액 순</option>
                    <option value="최저금액순">최저 금액 순</option>
                </select>
                <select onChange={handleSortChange}>
                    <option value="최신 순">최신 순</option>
                    <option value="인기 순">인기 순(미완성)</option>
                </select>
            </div>

        </div>
        <p>검색 결과 {filteredDonations.length} 건</p>
        <div><button onClick={pageListPermitButtonOnClick}>등록하기</button></div>
        <div css={s.tagContainer}>
            </div>
            <div css={s.donationList}>
                {
                    filteredDonations.map(
                        donation =>
                        <>
                        <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId}  css={s.linkStyle}>
                            <div key={donation.donationPageId} css={s.donationCard}>
                                <div>   
                                    <input type="checkbox" value={donation.donationPageId} checked={donation.checked} onChange={(e) => permitCheckBoxOnChange(e)}/>
                                </div>
                                <div css={s.donationImage}>
                                    <img src={
                                            ! donation.mainImgUrl
                                            ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                            : donation.mainImgUrl
                                        } alt="" />
                                </div>
                                <div css={s.donationDetails}>
                                    <div css={s.donationText}>
                                        <h2><strong>(진행중)</strong> {donation.storyTitle}</h2>
                                        <p><strong>기관:</strong> {donation.teamName}</p>
                                    </div>
                                    <div css={s.donationAmount}>
                                        <p><strong>₩</strong>{donation.goalAmount}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                        <div>
                            { donation.donationPageShow === 1 
                            ? <button>확인 완료</button> 
                            : <button onClick={() => pagePermitButtonOnClick(donation.donationPageId)}> 보류 중</button>
                            }
                        </div>
                        </>
                    )
                }
            </div>
        </>
    );
}

export default SearchPage;
