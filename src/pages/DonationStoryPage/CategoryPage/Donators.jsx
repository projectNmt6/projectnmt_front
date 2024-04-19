import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { donationGivingResponse } from '../../../apis/api/DonationAPI';
import { useSearchParams } from 'react-router-dom';

function Donators({ donationPageId }) {
;
    const [ donationDate, setDonationDate ] = useState();
    const [ amount, setAmount] = useState();
    const [ anonymous, setAnonymous ] = useState();

    const [donationList, setDonationList] = useState([]);

    useEffect(() => {
        if (donationPageId) {
            donationGivingResponse(donationPageId)
                .then(response => {
                    setDonationList(response.data);
                })
                .catch(error => {
                    console.error("에러남:", error);
                });
        }
    }, [donationPageId]);
    


    return (
        <div>
            <h1>Donators Page2</h1>
            <div>
                {donationList.map((donation, index) => (
                    <div key={index}>
                        <p>Donator ID: {donation.donatorId}</p>
                        <p>Amount: {donation.amount}</p>
                        <p>Date: {donation.donationDate}</p>
                        <p>Anonymous: {donation.anonymous ? "Yes" : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Donators;
