/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { useState } from "react";
import { getDonationListRequest, getDonationTagRequest } from "../../apis/api/donationAPI";

function MainPage() {
    
    const [donationTagList, setDonationTagList] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    //donationTag

    const getDonationTagQuery = useQuery(
        "getDonationTagQuery",
        async () => await getDonationTagRequest({
    
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationTagList(response.data.map(donationTag => ({
                    ...donationTag
                })));
            }
        }
    );
    console.log(donationTagList);

    
    
    //donationList
    
    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest({
            
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationList(response.data.map(donation => ({
                    ...donation
                })));
            }
        }
        );
        console.log(donationList);
        
        
        //handleTag(미완성))
        const handleTagClick = (tag) => {
            setSelectedTag(tag);
          };

        const filteredDonations = selectedTag
        ? donationList.filter(
                        (donation) => donation.donationTagName 
                        ? donation.donationTagName.includes(selectedTag) 
                        : false
                        )
        : donationList;
        


        return (
        <>
            <div>
                <h1>메인 페이지</h1>
            </div>
            <div css={s.tagContainer}>
                {donationTagList.map(
                    tag => (
                    <button 
                        key={tag.donationTagName} 
                        css={s.tagButton}
                        onClick={() => handleTagClick(tag.donationTagName)}
                        aria-pressed={selectedTag === tag.donationTagName}
                    >
                        {tag.donationTagName}
                    </button>
                ))}
            </div>
            <div css={s.donationList}>
                {
                    filteredDonations.map(
                        donation =>
                        <div key={donation.donationPageId} css={s.donationCard}>
                            <div css={s.donationImage}>
                                <img src={
                                        ! donation.mainImgUrl
                                        ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                        : donation.mainImgUrl
                                    } alt="" />
                            </div>
                            <div css={s.donationDetails}>
                                <h2>{donation.donationName}</h2>
                                <p><strong>기관:</strong> {donation.teamName}</p>
                                <p><strong>목표금액:</strong> {donation.goalAmount}원</p>
                                <p><strong>시작시간:</strong> {donation.createDate.split('T')[0]}</p>
                                <p><strong>종료시간:</strong> {donation.endDate.split('T')[0]}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
        );
}

export default MainPage;