/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaPen } from "react-icons/fa6";
import { getDonationListRequest, getDonationTagRequest } from "../../../apis/api/DonationAPI";
import Progress from "../../../components/progress/Progress";
import LikeButton from "../../../components/LikeButton/LikeButton";
import { getLike } from "../../../apis/api/Like";

function NowDonationPage() {
    const [donationTagList, setDonationTagList] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortOrder, setSortOrder] = useState('');


    //donationTag
    const getDonationTagQuery = useQuery(
        "getDonationTagQuery",
        async () => await getDonationTagRequest(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationTagList(response.data.map(donationTag => ({
                    ...donationTag
                })));
            }
        }
    );


    const getDonationListQuery = useQuery(
        "getDonationQuery",
        async () => await getDonationListRequest(),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const today = new Date();
                const validDonations = response.data.filter(donation => {
                    const endDate = new Date(donation.endDate);
                    return endDate > today;
                });
    
                const updatedDonationList = validDonations.map(donation => {
                    const endDate = new Date(donation.endDate);
                    const timeDiff = endDate - today;
                    const daysLeft = timeDiff / (1000 * 60 * 60 * 24); // 밀리초를 일 단위로 변환
    
                    return {
                        ...donation,
                        timeOut: daysLeft < 3,
                    };
                });
    
                setDonationList(updatedDonationList);
            }
        }   
    );

    //handleTag
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

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };



    const sortedDonations = [...filteredDonations].sort((a, b) => {
        switch (sortOrder) {
          case '최신순':
            return new Date(b.createDate) - new Date(a.createDate);
          case '추천순':
            return b.likeCount - a.likeCount;
          case '종료임박순':
            return new Date(a.endDate) - new Date(b.endDate);
          default:
            return new Date(b.createDate) - new Date(a.createDate);
        }
      });

      console.log(sortedDonations);

    return (
        <>
                <div css={s.tagContainer}>
                    <button
                        key="alltag"
                        onClick={() => setSelectedTag(null)}
                        css={s.tagAllButton(selectedTag)}
                    >전체보기
                    </button>
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
                <div css={s.selectItems}>
                    <button css={s.rightButton(sortOrder)} onClick={handleSortChange} value={"최신순"}>최신순</button>
                    <button css={s.rightButton} onClick={handleSortChange} value={"추천순"}>추천순</button>
                    <button css={s.rightButton} onClick={handleSortChange} value={"종료임박순"}>종료임박순</button>
                </div>
                <div css={s.donationList}>
                    {
                        sortedDonations.map(
                            donation =>
                                <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId} css={s.linkStyle}>
                                    <div key={donation.donationPageId} css={s.donationCard}>
                                        <div css={s.donationImage}>
                                            <img src={
                                                !donation.mainImgUrl
                                                    ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                                    : donation.mainImgUrl
                                            } alt="" />
                                            <div css={s.RunningOut(donation.timeOut)}>종료임박</div>
                                        </div>
                                        <div css={s.donationDetails}>
                                            <div css={s.donationTitle}>
                                             <h3>{donation.storyTitle}</h3>
                                            </div>
                                            <p><strong>기관:</strong> {donation.teamName}</p>
                                            <LikeButton donationPageId = {donation.donationPageId} />
                                            <Progress pageId={donation.donationPageId} />

                                        </div>
                                    </div>
                                </a>
                        )
                    }
                </div>
        </>
    );
}

export default NowDonationPage;