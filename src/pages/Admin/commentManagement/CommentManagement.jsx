import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getUserCommentListRequest } from '../../../apis/api/Admin';

function CommentManagement({userId}) {
    const [ commentList, setCommentList] = useState([]);
    const getCommentListQuery = useQuery(
        [ "getCommentListQuery" ],
        async () => {
            return await getUserCommentListRequest({
                userId: userId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setCommentList(() => response.data);
            },
        }
    );

    return (
        <div>
            댓글 관리
        </div>
    );
}

export default CommentManagement;