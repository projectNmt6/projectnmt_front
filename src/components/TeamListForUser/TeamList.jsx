import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getTeamListRequest } from '../../apis/api/teamApi';
import { Link } from 'react-router-dom';

function TeamList(props) {
    const [ temaList, setTeamList ] = useState([]);
    const queryClient = useQueryClient();
    
    const principalData = queryClient.getQueryData("principalQuery");
    const getTeamListQuery = useQuery(
        [ "getTeamListQuery", principalData?.data ],
        async () => {
            return await getTeamListRequest({
                userId: principalData?.data.userId
            })
        },
        {
            refetchOnWindowFocus: false,
            enabled: principalData?.data !== undefined,
            onSuccess: response => {
                setTeamList(() => response?.data);
            },
        }
    );  
    return (
        <div>
            {temaList.map(team => {
                return <>
                    <div key={team.teamId}>
                        <div>{team.teamName}</div>
                        <Link to={`/team/info?id=${team.teamId}`}>
                            <img src={team.teamLogoImgUrl} alt=""/>
                        </Link>
                    </div>
                </>
                })} 
            <Link to={"/team/write"}> 팀 만들기</Link>
        </div>  
                           
    );
}

export default TeamList;