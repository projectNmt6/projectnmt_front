import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postJoinTeamRequest } from '../../apis/api/teamApi';
import { useSearchParams } from 'react-router-dom';

function TeamJoinPage(props) {
    const [ searchParams ] = useSearchParams();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const postJoinTeamMutation = useMutation({
        mutationKey: "postJoinTeamMutation",
        mutationFn: postJoinTeamRequest,
        onSuccess: response => {
            console.log(response);
        },
        onError: error => {}
    })  
    
    const handleJoinTeamOnClick = () => {
        postJoinTeamMutation.mutate({
            userId: principalData?.data.userId,
            teamId: searchParams.get("id"), 
        });
    }
    return (
        <div>
             
            <button onClick={handleJoinTeamOnClick}>팀에 등록하기</button>
        </div>
    );
}

export default TeamJoinPage;