/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import Select from 'react-select';

function AdminSearchPage(props) {

//     const [selectedMainTag, setSelectedMainTag] = useState(null);
//     const [selectedSecondTag, setSelectedSecondTag] = useState(null);
//     const [mainTagOptions, setMainTagOptions] = useState([]);
//     const [secondTagOptions, setSecondTagOptions] = useState([]);
//     const [ searchText, setSearchText] = useState("");
//     const [ searchValue, setSearchValue] = useState("");
//     const [donationList, setDonationList] = useState([]);
//     const [filteredDonations, setFilteredDonations] = useState([]);
//     const [sortOrder, setSortOrder] = useState('');
//     const [donationPageShow, setDonationPageShow] = useState(false);


//     const handleOnChange = (e) => {
//             setSearchText(()=>e.target.value);
//         }

//     const searchSubmit = () => {
//         setSearchValue(()=>searchText);
//         console.log(searchValue);
//     }


//     useEffect(() => {
//         axios.get("http://localhost:8080/main/storytypes")
//             .then(response => {
//                 const options = response.data.map(mainTag => ({
//                     value: mainTag.mainCategoryId,
//                     label: mainTag.mainCategoryName
//                 }));
//                 setMainTagOptions(options);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     useEffect(() => {
//         axios.get("http://localhost:8080/main/donationtag")
//             .then(response => {
//                 const options = response.data.map(secondTag => ({
//                     value: secondTag.donationTagId,
//                     label: secondTag.donationTagName
//                 }));
//                 setSecondTagOptions(options);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     const handleMainTagChange = (selectedOption) => {
//         setSelectedMainTag(selectedOption);
//     };


//     const searchDonationQuery = useQuery(
//         ["searchDonationQuery", searchValue],
//         async () => {
//             const response = await adminSearchDonationRequest({ name: searchValue });
//             return response.data; 
//         },
//         {
//             refetchOnWindowFocus: false,
//             onSuccess: response => {
//                 setDonationList(response.map(donation => ({
//                     ...donation
//                 })));
//             }
//         }
//     );

//         useEffect(() => {
//             setFilteredDonations(selectedMainTag
//             ? donationList.filter(
//                 (donation) => donation.mainCategoryName === (selectedMainTag.label) 
//                 )
//                 : donationList);
//         }, [selectedMainTag, donationList]);

//     // 정렬 순서 변경 핸들러
//     const handleSortChange = (event) => {
//         setSortOrder(event.target.value);
//     };

//     // sortOrder 상태가 변경될 때 자동으로 정렬 실행
//     useEffect(() => {
//             let sortDonations = filteredDonations; // 기존 목록을 복사
//             if (sortOrder === '최고금액순') {
//                 sortDonations.sort((a, b) => parseInt(b.goalAmount) - parseInt(a.goalAmount));
//             } else if (sortOrder === '최저금액순') {
//                 sortDonations.sort((a, b) => parseInt(a.goalAmount) - parseInt(b.goalAmount));        
//                 // sortDonations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
//             }
//             setFilteredDonations([...sortDonations]);
//     }, [sortOrder]);




// ////DonationPageShow 업데이트

//   // React Query 클라이언트 인스턴스를 가져옵니다.
//   const queryClient = useQueryClient();

//   // useMutation 훅을 사용하여 데이터 업데이트 로직을 구성합니다.
//   const mutation = useMutation(updatePageShowRequest, {
//     onSuccess: () => {
//         //요청 성공 후 캐시된 데이터를 무효화하여 새로운 데이터로 리프레시합니다.

//     }});

// const handlePageShow = (donation) => {
//     console.log(donation);
//     const updatedPageShow = {
//         donationPageId: donation.donationPageId
//     };
    
//     console.log(donation.donationPageShow);
//     // mutation.mutate를 사용하여 업데이트 로직을 실행
//     mutation.mutate(updatedPageShow);
//     donation.donationPageShow = !donation.donationPageShow;

// };


//     return (
//         <>
//         <div>
//             <div css={s.searchBar}>
//                 <input 
//                     css={s.searchInput} 
//                     type="text" 
//                     value={searchText}
//                     onChange={handleOnChange}
//                 />
//                 <button css={s.searchButton} onClick={() => searchSubmit()}>검색</button>
//             </div>
//         </div>
//         <div css={s.searchSelect}>
//             <div css={s.searchCategory}>
//             <Select
//                     options={mainTagOptions}
//                     value={selectedMainTag}
//                     placeholder="종류를 선택해주세요"
//                     onChange={handleMainTagChange}
//                 />
//             </div>
//             <div>
//                 <select onChange={handleSortChange}>
//                     <option value="금액순">금액 순</option>
//                     <option value="최고금액순">최고 금액 순</option>
//                     <option value="최저금액순">최저 금액 순</option>
//                 </select>
//                 <select onChange={handleSortChange}>
//                     <option value="최신 순">최신 순</option>
//                     <option value="인기 순">인기 순(미완성)</option>
//                 </select>
//             </div>

//         </div>
//         <p>검색 결과 {filteredDonations.length} 건</p>
//         <div css={s.tagContainer}>
//             </div>
//             <div css={s.donationList}>
//                 {
//                     filteredDonations.map(
//                         donation =>
//                         <div css={s.linkbox}>
//                             <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId}  css={s.linkStyle}>
//                                 <div key={donation.donationPageId} css={s.donationCard}>
//                                     <div css={s.donationImage}>
//                                         <img src={
//                                                 ! donation.mainImgUrl
//                                                 ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
//                                                 : donation.mainImgUrl
//                                             } alt="" />
//                                     </div>
//                                     <div css={s.donationDetails}>
//                                         <div css={s.donationText}>
//                                             <h2><strong>(진행중)</strong> {donation.storyTitle}</h2>
//                                             <p><strong>기관:</strong> {donation.teamName}</p>
//                                         </div>
//                                         <div css={s.donationAmount}>
//                                             <p><strong>₩</strong>{donation.goalAmount}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </a>
//                             <button css={s.getManageCard(donation.donationPageShow)} onClick={() => handlePageShow(donation)}>
//                                 {
//                                     !donation.donationPageShow
//                                     ? "확인 전"
//                                     : "확인 완료"
//                                 }
//                             </button>
//                         </div>
                        
//                     )
//                 }
//             </div>
//         </>
//     );
}

export default AdminSearchPage;
