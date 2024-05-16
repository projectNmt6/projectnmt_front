import React, { useEffect, useState } from 'react';
import { donationGivingResponse } from '../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function Donators({ donationPageId }) {
    const [donationList, setDonationList] = useState([]);

    useEffect(() => {
        if (donationPageId) {
            donationGivingResponse(donationPageId)
            .then(response => {
                console.log("API Response:", response.data);
                setDonationList(response.data.map(donation => ({
                    ...donation,
                    username: donation.donatorAnonymous === 1 ? "*".repeat(donation.username.length) : donation.username
                })));
            })
            .catch(error => {
                console.error("에러남:", error);
            });
        }
    }, [donationPageId]);
    

    return (
        <div>
            
        <div css={s.actionBoardContainer}>
                {donationList.map((donation, index) => (
                    <div key={index} css={s.actionItem}>
                        <p css={s.username}>{donation.username}</p>
                        <p css={s.amount}>{donation.amount}원 기부</p>
                        <p css={s.donationDate}>{donation.donationDate.substring(0, 10)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Donators;
