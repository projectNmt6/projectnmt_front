/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { deleteCommentRequest, getUserCommentListRequest } from '../../../apis/api/Admin';

function CommentManagement({userId} ) {
    const [ commentList, setCommentList] = useState([]);
    const [ sortedCommentList, setSortedCommentList] = useState([]);
    const num = 10;
    const [ isDelete, setIsDelete ] = useState(false);
    const getCommentListQuery = useQuery(
        [ "getCommentListQuery", userId ],
        async () => {
            return await getUserCommentListRequest({
                userId: userId
            })
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setCommentList(() => response.data.map(comment => {
                    return {
                        ...comment,
                        checked: false
                    }
                }));
            },
        }
    );
    const   deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteCommentRequest,
        onSuccess: response => {
            getCommentListQuery.refetch();
            alert("삭제완료.");
        },
        onError: error => {}
    })
    const handleCheckOnChange = (e) => {
        const commentId = parseInt(e.target.value);
        setCommentList(() =>commentList.map(comment => {
            if (commentId === comment.donationCommentId) {
                return {
                    ...comment,
                    checked: e.target.checked
                }
            } else {
                return comment
            }
            }));
    }
    useEffect(() => {
        setSortedCommentList(commentList.sort(function (a, b) {
            return b.reportCount - a.reportCount;
        }))
    },[commentList])
    const handleDeleteButtonOnClick = () => {
        setIsDelete(() => true);
    }
    const handleDeleteautoButtonOnClick = () => {
        setCommentList(() =>commentList.map(comment => {
            if (comment.reportCount > num) {
                return {
                    ...comment,
                    checked: true
                }
            } else {
                return comment
            }
        }));
        setIsDelete(() => true);
    }
    useEffect(() => {
        if(isDelete) {
            const deleteComments = sortedCommentList.filter(comment => comment.checked === true).map(comment => comment.donationCommentId);
            deleteCommentMutation.mutate(deleteComments);
        }
        setIsDelete(() => false);
    },[sortedCommentList])
    return (
        <>
            <div css={s.buttonContainer}>
                <div css={s.textbox}>
                    댓글 관리
                </div>
                <button onClick={handleDeleteButtonOnClick} css={s.baseButton}>댓글 삭제</button>
                <button onClick={handleDeleteautoButtonOnClick} css={s.baseButton}> 댓글 자동 삭제</button>
            </div>
            <div css={s.tableLayout}>
            <table css={s.table}>
                        <thead >
                            <tr css={s.tableHeader} key={0}>
                                <th><input type="checkbox" /></th>
                                <th>신고 누적 횟수</th>
                                <th>내용</th>
                                <th>페이지 번호</th>
                                <th>페이지 타이틀</th>
                                <th>댓글번호</th>
                            </tr>
                        </thead>
            {
                <tbody>
                            {
                                sortedCommentList.map(
                                    comment => 
                                        <>
                                        <tr key={comment.donationCommentId}>
                                            <td><input type="checkbox" value={comment.donationCommentId} checked={comment.checked} onChange={handleCheckOnChange}/></td>
                                            <td>{comment.reportCount}</td>
                                            <td>{comment.commentText}</td>
                                            <td>{comment.donationPageId}</td>
                                            <td>{comment.storyTitle}</td>
                                            <td>{comment.donationCommentId}</td>
                                        </tr>
                                    </>
                                )
                            }
                        </tbody>
            }
            </table>
            </div>
        </>
    );
}

export default CommentManagement;