/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { useState } from "react";
import { getDonationListRequest } from "../../apis/api/donationAPI";

function MainPage() {
    console.log("메인");
    
    const [donationList, setDonationList] = useState([]);
    
    const getDonationListQuery = useQuery(
        ["getDonationQuery"],
        async () => await getDonationListRequest({
    
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationList(response.data.map(donation => ({
                    ...donation,
                    checked: false // Assuming you want to track selection with a 'checked' property
                })));
            }
        }
    );
    console.log(donationList);
    return (
    <>
        <div class="donationList">
            {
                donationList.map(
                    donation =>
                    <div key={donation.donationPageId} css={s.donationCard}>
                            <div css={s.donationImage}>
                            <img src={donation.mainImgUrl} alt="Donation" />
                            </div>
                            <div css={s.donationDetails}>
                            <h2>{donation.donationName}</h2>
                            <p><strong>기관:</strong> {donation.teamName}</p>
                            <p><strong>목표금액:</strong> {donation.goalAmount}</p>
                            <p><strong>시작시간:</strong> {donation.createDate.toString().split('T')[0]}</p>
                            <p><strong>종료시간:</strong> {donation.endDate.toString().split('T')[0]}</p>
                        </div>
                    </div>
                )
            }
        </div>
    </>
    );
}

export default MainPage;