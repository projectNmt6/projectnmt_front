import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getTeamInfoRequest } from "../../apis/api/teamApi";
import { useState } from "react";

function TeamInfoPage(props) {
    const [ teamInfo, setTeamInfo ] = useState();
    const [ searchParams ] = useSearchParams();
    const teamId = searchParams.get("id");
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const getTeamInfoQuery = useQuery(
        [ "getTeamListQuery" ],
        async () => {
            return await getTeamInfoRequest({
                teamId: teamId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setTeamInfo(() => response.data);
            },
        }
    );
    return (
        <div>
            <>  
                
                <img src={teamInfo?.teamLogoImgUrl} alt="" />
                {teamInfo?.teamMembers.filter(teamMember => teamMember.userId === principalData.data.userId)[0].teamRoleId === 1
                ? <Link to={`/team/management?id=${teamId}`}  state={{ teamInfo }} >관리하기</Link>
                :null}
                <div>{teamInfo?.teamName}</div>
                <div>{teamInfo?.teamInfoText}</div>
            </>
        </div>
    );
}

export default TeamInfoPage;