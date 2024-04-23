import React, { useEffect, useState } from 'react';
import { getActionBoardList } from '../../../apis/api/ChallengeApi';
import { useMutation } from 'react-query';
import { div } from '../../DonatorInfo/style';

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
        <h1>행동하기</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div>
            {actionList.map((action) => (
                <div key={action.id}>
                    <img src={action.imageURL} alt={`Action ${action.id}`} style={{ width: '200px', maxHeight: '200px' }} />
                    <p>UserId: {action.userId}</p>
                    <p>Content: {action.actionContent}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default ActionBoard;