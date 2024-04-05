import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {Link, useLocation, useParams } from 'react-router-dom';
import { getDonationListRequest, getDonationStoryRequest } from '../../apis/api/DonationAPI';

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const[donationPage, setDonationPage] = useState({});
    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {setDonationPage(data);
            }
        }
    );

    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);

    console.log(donationPage);
    
    return (
        <>
            <div>
                <h1>Donation Stories</h1>
                <p>page:{donationPageId}</p>
            </div>
            <div>
                <Link to={"/main/donate"}>기부하기</Link>
            </div>
            <div>
                    <h2>{donationPage.storyTitle}</h2>
                    <img src={donationPage.mainImgUrl} alt="" />
                    <p>기부 시작일: {donationPage.createDate}</p>
                    <p>기부 종료일: {donationPage.endDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </div>
        </>
    
    )
}
export default DonationStoryPage;