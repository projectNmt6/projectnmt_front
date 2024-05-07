import React, { useEffect, useState } from 'react';
import { getActionBoardList } from '../../../../apis/api/ChallengeApi';
import { useMutation, useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Masonry from 'react-masonry-css';
import { getPrincipalRequest } from '../../../../apis/api/principal';
function ActionBoard({challengePageId}) {

    const [actionList, setActionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId ] = useState();

    useEffect(() => {
        if (challengePageId) {
            setLoading(true);
            getActionBoardList(challengePageId)
                .then(response => {
                    const sortedActions = response.data.sort((a, b) => 
                        new Date(b.createDate) - new Date(a.createDate)  // 내림차순 정렬
                    );
                    setActionList(sortedActions);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("actionError", error);
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, [challengePageId]);

    console.log("actionList"+actionList.data)
    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId); // 예제로 userId 설정
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );
    function maskUserId(userName) {
        return userName.slice(0, 4) + '*'.repeat(userName.length - 4);
    }
    return (
        <div>
        <div css={s.actionBoardContainer}>
                    {actionList.map((action) => (
                        <div key={action.id} css={s.actionItem}>
                            <img src={action.imageURL} alt={`Action ${action.id}`} css={s.actionImage} />
                            <p>User: {maskUserId(action.userName)}</p>
                            <p>Content: {action.actionContent}</p>
                        </div>
                    ))}
                </div>       
        </div>

    );
}

export default ActionBoard;