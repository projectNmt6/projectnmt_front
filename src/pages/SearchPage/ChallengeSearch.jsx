/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import Select from 'react-select';
import { getDonationTagRequest, searchChallengeRequest, searchDonationRequest } from "../../apis/api/DonationAPI";
import { FiSearch } from "react-icons/fi";
import { TiHome } from "react-icons/ti";

function SearchPage(props) {

    const [selectedMainTag, setSelectedMainTag] = useState(null);
    const [mainTagOptions, setMainTagOptions] = useState([]);
    const [secondTagOptions, setSecondTagOptions] = useState([]);
    const [ searchText, setSearchText] = useState("");
    const [ searchValue, setSearchValue] = useState("");
    const [donationList, setDonationList] = useState([]);
    const [ challengeList, setChallengeList ] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [state, setState] = useState('전체');
    const today = new Date();


    const handleOnChange = (e) => {
            setSearchText(()=>e.target.value);
        }

    const searchSubmit = () => {
        setSearchValue(()=>searchText);
    }
     

    const searchChallengeQuery = useQuery(
        ["searchChallengeQuery", searchValue],
        async () => {
            const response = await searchChallengeRequest({ name: searchValue });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setChallengeList(response.map(donation => ({
                    ...donation
                })));
            }
        }
    );


    // 정렬 순서 변경 핸들러
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };
    
    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    useEffect(() => {
        const filtered = challengeList.filter(donation => {
            let shouldInclude = true;
    
            if (state === '진행중') {
                shouldInclude = shouldInclude && new Date(donation.endDate) > today;
            } else if (state === '종료') {
                shouldInclude = shouldInclude && new Date(donation.endDate) < today;
            }
    
            return shouldInclude;
        });
    
        setFilteredDonations(filtered);
    }, [challengeList, state]);




    return (
        <>
        <div css={s.layout}>
            <div css={s.searchBar}>
                <div css={s.searchInput} >
                <input 
                    type="text" 
                    value={searchText}
                    placeholder="검색어를 입력해주세요"
                    onChange={handleOnChange}
                />
                <button css={s.searchButton} onClick={() => searchSubmit()}><FiSearch size={30} color="Orange"/></button>
                </div>
            </div>
        </div>
        <div css={s.searchSelect}>
   

        </div>
        <div css={s.tagHeader}>
            <div css={s.tagContainer}>
                <p>검색 결과 <strong>{filteredDonations.length}</strong> 건</p>
            </div>
            <div css={s.selectItems}>
                <button css={s.rightButton} onClick={handleSortChange} value={"최신순"}>최신순</button>
                <button css={s.rightButton} onClick={handleSortChange} value={"기부액순"}>기부액순</button>
                <select onChange={handleStateChange} css={s.rightSelect}>
                    <option value="전체">전체</option>
                    <option value="진행중">진행중</option>
                    <option value="종료">종료</option>
                </select>
            </div>
        </div>
            <div css={s.donationList}>
                {
                    filteredDonations.map( 
                        challenge =>
                        <a href={`/challenge?page=${challenge.challengePageId}`} key={challenge.challengePageId}  css={s.linkStyle}>
                            <div key={challenge.challengePageId} css={s.donationCard}>
                                <div css={s.donationImage}>
                                    <img src={
                                            ! challenge.mainImgUrl
                                            ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                            : challenge.mainImgUrl
                                        } alt="" />
                                </div>
                                <div css={s.donationDetails}>
                                    <div css={s.donationText}>
                                        <h2>
                                            <strong className={new Date(challenge.endDate) > today ? 'active' : 'finished'}>
                                            {new Date(challenge.endDate) > today ? '진행중' : '종료'}
                                            </strong> 
                                            {'  '}{challenge.challengeTitle}
                                        </h2>
                                        <p><TiHome color="gray"/> {!challenge.teamName?"기관 없음":challenge.teamName}</p>
                                    </div>

                                </div>
                            </div>
                        </a>
                    )
                }
            </div>
        </>
    );
}

export default SearchPage;
