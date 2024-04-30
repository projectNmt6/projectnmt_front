import { useMutation, useQuery, useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { commentReportRequest, commentRequest, commentResponse, deleteComment, getCommentListRequest } from '../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { AiFillAlert } from "react-icons/ai";
import { Link, useLocation, useParams } from 'react-router-dom';
import LikeButton from '../../components/LikeButton/LikeButton';
import { logDOM } from '@testing-library/react';

function CommentSection({ donationPageId, isDonation }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();

    const principalData = queryClient.getQueryData("principalQuery");
    const commentListQuery = useQuery(["commentListQuery"],
        async () => {
            return await commentResponse(donationPageId)
        }
        , {
            retry: 3,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setCommentList(() => response.data);
            }
        });
    const handleCommentChange = (e) => setComment(e.target.value);

    const postCommentMutation = useMutation({
        mutationKey: "postCommentMutation",
        mutationFn: commentRequest,
        onSuccess: response => {
            console.log(response);
            alert("등록완료.");
        },
        onError: error => {}
    }) 
    const handleCommentSubmit = async () => {
        postCommentMutation.mutate({
            commentText: comment,
            donationPageId,
            userId: principalData.data.userId
        });
    };

    const deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteComment,
        onSuccess: response => {
            alert("삭제완료")
            window.location.reload();
        }
    });
    const postCommentReportMutation = useMutation({
        mutationKey: "postCommentReportMutation",
        mutationFn: commentReportRequest,
        onSuccess: response => {
            alert("신고완료")
        }
    });

    const handleCommentDeleteButton = (donationCommentId) => {
        deleteCommentMutation.mutate({ donationCommentId });
    };
    const handleCommentReportPostButton = (donationCommentId) => {
        postCommentReportMutation.mutate({
            donationCommentId,
            userId: principalData.data.userId,
            isDonation: 1,
            donationPageId
        });
    };
    return (
        <>
            <div css={s.commentBox}>
                <div>
                    <input css={s.inputboxStyle}
                        type="text"
                        placeholder='따뜻한 댓글을 남겨주세요'
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                <button css={s.button5} onClick={handleCommentSubmit}>댓글 입력</button>
                <div css={s.div1}>
                    {commentList.map((comment, index) => (
                        <div css={s.div2} key={index}>
                            <div css={s.div4}>{comment.commentText}
                                <LikeButton commentId={comment.donationCommentId} donationPageId={donationPageId}/>
                                {comment.userId === principalData?.data.userId ? (
                                    <button css={s.button6} onClick={() => handleCommentDeleteButton(comment.donationCommentId)}>
                                        삭제 <TbTrashXFilled />
                                    </button>
                                ) : (
                                    <button css={s.button7} onClick={() => handleCommentReportPostButton(comment.donationCommentId)}>
                                        신고 <AiFillAlert />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


export default CommentSection;