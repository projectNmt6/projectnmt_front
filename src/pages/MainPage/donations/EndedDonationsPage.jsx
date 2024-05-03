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
                setDonationList(validDonations);
            }
        }   
    );


    return (
        <>
                <div css={s.donationList}>
                    {
                        donationList.map(
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