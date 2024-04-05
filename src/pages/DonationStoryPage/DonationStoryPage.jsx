import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getDonationListRequest, getDonationStoryRequest } from '../../apis/api/DonationAPI';

function DonationStoryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationPageId = queryParams.get('page'); // 쿼리 파라미터에서 'page' 값을 donationPageId로 사용
    const [donationPageList, setDonationPageList] = useState([]);
    const getDonationStoryQuery = useQuery(
        "getDonationPageQuery",
        async () => await getDonationStoryRequest({
    
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setDonationPageList(response.data.map(donationPage => ({
                    ...donationPage
                })));
            }
        }
    );

    // const { data: donationList} = useQuery(
    //     ['getDonationList', { donationPageId }], // 캐시 키에 파라미터 포함
    //     () => getDonationListRequest({ id: donationPageId }), // API 호출 시 donationPageId를 파라미터로 전달
    //     {
    //         enabled: !!donationPageId, // donationPageId 값이 있는 경우에만 쿼리를 실행
    //         onSuccess: (data) => {
    //             console.log(data); // 필요한 경우 데이터 확인
    //         },
    //     }
    // );

    return (
        <>
            <div>
                <h1>Donation Stories</h1>
                <p>Current Page: {donationPageId}</p>
            </div>
            <div>
            {donationPageList?.data && (
                <ul>
                    {donationPageList.data.map((donationPage) => (
                        <li key={donationPage.donationPageId}>
                            <h2>{donationPage.title}</h2>
                            <p>{donationPage.description}</p>
                        </li>
                     ))}
                </ul>
                )}
            </div>
        </>
    );
}

export default DonationStoryPage;