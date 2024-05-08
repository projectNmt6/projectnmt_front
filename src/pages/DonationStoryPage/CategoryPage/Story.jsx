/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getDonationImageList, getDonationStoryRequest } from '../../../apis/api/DonationAPI';

function Story(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); 
    const [donationPage, setDonationPage] = useState({});

    const getDonationStoryQuery = useQuery(
        ["getDonationPageQuery", donationPageId], 
        async () => {
            const response = await getDonationStoryRequest({ page: donationPageId });
            return response.data; 
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log(data);
                setDonationPage(data);
            }
        }
    );


    const safeHTML = DOMPurify.sanitize(donationPage.storyContent);

    return (
        <div css={s.container}>
            Story
            <div>
                {donationPage.donationImages && donationPage.donationImages.map((image, index) => (
                    <img key={index} src={image.donationImageURL} alt={`Image ${index}`} />
                ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
        </div>
    );
    
}

export default Story;
