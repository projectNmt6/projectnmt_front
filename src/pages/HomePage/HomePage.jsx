/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { getAllAmount, getProgressAmount } from "../../apis/api/donationAPI";


function HomePage(props) {
    const [ totalamount , setTotalamount ] = useState(0);
    const [currentAmount, setCurrentAmount] = useState([]);
    const [goalAmount, setGoalAmount] = useState([]);
    const [ storyTitle , setStoryTitle ] = useState([]);
    const [ endDate , setEndDate ]= useState([]);
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

    const getamountQuery = useQuery(
        "getamountQuery",
        async () => {
            const response = await getProgressAmount({});
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                setGoalAmount(data.data.goalAmount);
                setCurrentAmount(data.data.addAmount);
                setStoryTitle(data.data.storyTitle);
                setEndDate(data.data.endDate);
            },
        }
    )
    useEffect(() => {
        if (getamountQuery.isSuccess) {
          setCurrentAmount(getamountQuery.data.currentAmount);
          setGoalAmount(getamountQuery.data.goalAmount);
        }
      }, [getamountQuery.data]);

    const progressPercent = (currentAmount / goalAmount) * 100;
    
    return (
        <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <div>{formattedDate} 날짜 기준 </div>
            <div>총 기부금:{totalamount}</div>
        </div>
        <div css={s.progressbar}>
            <div css={s.progress} style={{ width: `${progressPercent}%` }}>
            {`${progressPercent.toFixed(2)}%`}
            </div> 
        </div>
        </>
    );
}

export default HomePage;