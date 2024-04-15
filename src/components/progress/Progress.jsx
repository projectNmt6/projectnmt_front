import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getDonationStoryRequest, getProgressAmount } from '../../apis/api/donationAPI';
import { useQuery } from 'react-query';

function Progress({donationPageId}) {
    const [goalAmount, setGoalAmount] = useState([]);
    const [currentAmount, setCurrentAmount] = useState([]);
    const [ storyTitle , setStoryTitle ] = useState([]);
    const [ endDate , setEndDate ]= useState([]);
    
    const getamountQuery = useQuery(
        "getamountQuery",
        async () => {
            return await getProgressAmount({donationPageId});
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
        <div>
          <div css={s.progressbar}>
                <div css={s.progress} style={{ width: `${progressPercent}%` }}>
                {`${progressPercent.toFixed(2)}%`}
                </div> 
            </div>    
        </div>
    );
}

export default Progress;