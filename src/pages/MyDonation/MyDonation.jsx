/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import * as s from "./style";
import { Link } from "react-router-dom";
import { getDonatorList } from "../../apis/api/DonatorApi";

function MyDonation(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    
    const donationyearoptions = [
        { value: 0, label: "전체" },
        { value: 1, label: "2024" },
        { value: 2, label: "2023" },
        { value: 3, label: "2022" }
    ]
    const donationsoptions = [
        { value:0, label:"전체" },
        { value:1, label:"기부내역" },
        { value:2, label:"챌린지내역" }
    ]

    const [ selectedYear, setSelectedYear ] = useState(donationyearoptions[0]);
    const [ selectedList, setSelectedList ] = useState(donationsoptions[0]);
    const [ donatorList , setDonatorList ] = useState([]);

    const handleYearChange = (selectedOption) => {
        setSelectedYear(() => selectedOption);        
    };

    const handleListChange = (selectedOption) => {
        setSelectedList(() => selectedOption);
    };

    const getDonatorListQuery = useQuery(
        ["getDonatorListQuery", selectedList, selectedYear],
        async () => {
            const response = await getDonatorList({
                userId:principalData.data.userId,
                donationDate:selectedYear.value,
                mainCategoryId:selectedList.value
            });
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setDonatorList(() => data)
            },
            enabled: !!principalData?.data
        }
    )

    return (
    <div>
        <div css={s.div}>
            <Select 
                css={s.box}
                options={donationyearoptions}
                value={selectedYear}
                onChange={handleYearChange}
            />
            <Select
                css={s.box}
                options={donationsoptions}
                value={selectedList}
                onChange={handleListChange}
            />
        </div>
        <table css={s.div1}>
            {donatorList.length === 0 ? (
                <td css={s.td3}>기부내역이 없습니다.</td>
            ) : (
                donatorList.map((donator, index) => (
                    <th css={s.table} key={index}>
                        <td css={s.td}>{donator.donationDate}</td>
                        <td css={s.td1}><Link css={s.link} to={`/donation?page=${donator.donationPageId}`}>{donator.storyTitle}</Link></td>
                        <td css={s.td2}>{donator.amount}원</td>
                    </th>
                ))
            )}
        </table>
    </div>
    );
}


export default MyDonation;