import React, { useEffect, useState } from 'react';
import { getActionBoardList } from '../../../../apis/api/ChallengeApi';
import { useMutation } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Masonry from 'react-masonry-css';
function ActionBoard({challengePageId}) {
    const [actionList, setActionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (challengePageId) {
            setLoading(true);
            getActionBoardList(challengePageId)
            .then(response => {
                setActionList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("actionError", error);
                setError('Failed to fetch data');
                setLoading(false);
            });
        }
    }, [challengePageId]);

    
    return (
        <div>
        <div css={s.actionBoardContainer}>
                    {actionList.map((action) => (
                        <div key={action.id} css={s.actionItem}>
                            <img src={action.imageURL} alt={`Action ${action.id}`} css={s.actionImage} />
                            <p>UserId: {action.userId}</p>
                            <p>Content: {action.actionContent}</p>
                        </div>
                    ))}
                </div>       
        </div>

    );
}

export default ActionBoard;