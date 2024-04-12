/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { getAllAmount } from "../../apis/api/donationAPI";

function HomePage(props) {
    const [ totalamount , setTotalamount ] = useState(0);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const getAmountQuery = useQuery(
        "getAmountQuery",
        async () => {
            const response = await getAllAmount({});
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setTotalamount(data.data.totalAmount);
            },
        }
    );
    return (
        <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <div>{formattedDate} 날짜 기준 </div>
            <div>총 기부금: {totalamount}</div>
        </div>
        </>
    );
}

export default HomePage;