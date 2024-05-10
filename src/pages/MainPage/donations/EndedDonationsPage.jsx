/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { getDonationListRequest, getDonationTagRequest } from "../../../apis/api/DonationAPI";
import LikeButton from "../../../components/LikeButton/LikeButton";
import Progress from "../../../components/progress/Progress";

function EndedDonationsPage(props) {
    const [donationTagList, setDonationTagList] = useState([]);
    const [donationList, setDonationList] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortOrder, setSortOrder] = useState('');

    const [visibleDonations, setVisibleDonations] = useState([]);
    const itemsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(0);
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
                    return endDate < today;
                });
                const updatedDonationList = validDonations.map(donation => {
                    const endDate = new Date(donation.endDate);
                    const timeDiff = endDate - today;
                    const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
    
                    return {
                        ...donation,
                        timeOut: daysLeft < 3,
                    };
                });
                setDonationList(validDonations);
                setVisibleDonations(updatedDonationList.slice(0, itemsPerPage));
            }
        }   
    );


    

  useEffect(() => {
    const onScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
            const nextPage = currentPage + 1;
            const nextItems = donationList.slice(nextPage * itemsPerPage, (nextPage + 1) * itemsPerPage);
            setVisibleDonations(prev => [...prev, ...nextItems]);
            setCurrentPage(nextPage);
        }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
}, [currentPage, donationList]);
    return (
        <>
                <div css={s.donationList}>
                    {

                visibleDonations.map(
                            donation =>
                                <a href={`/donation?page=${donation.donationPageId}`} key={donation.donationPageId} css={s.linkStyle}>
                                    <div key={donation.donationPageId} css={s.donationCard}>
                                        <div css={s.donationImage}>
                                            <img src={
                                                !donation.mainImgUrl
                                                    ? "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                                                    : donation.mainImgUrl
                                            } alt="" />
                                            <div css={s.finished}>종료</div>
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

export default EndedDonationsPage;