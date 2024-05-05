import { useMutation, useQuery, useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { commentResponse, deleteComment, donationCommentPost, commentReportRequest, donationCommentePost } from '../../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPrincipalRequest } from "../../../apis/api/principal";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";


function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();

    const [userId, setUserId ] = useState();
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        commentResponse(donationPageId)
        .then(response => setCommentList(response.data))
        .catch(console.error);
    }, [donationPageId]);

    const { data: principalData } = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Authentication data fetched", response.data);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    const postCommentMutation = useMutation(donationCommentePost, {
        onSuccess: () => {
            console.log("Comment posted successfully");
            alert("등록완료.");
            setComment("");
            queryClient.invalidateQueries(["commentListQuery"]);
        },
        onError: (error) => {
            console.error("Failed to post comment:", error);
            alert("등록 실패");
        }
    });

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        postCommentMutation.mutate({
            commentText: comment,
            donationPageId,
            userId: principalData?.data.userId
        });
    };

    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: () => {
            alert("삭제 완료");
            queryClient.invalidateQueries(["commentListQuery"]);
        },
        onError: (error) => {
            console.error("Failed to delete comment:", error);
            alert("삭제 실패");
        }
    });

    const handleCommentDeleteButton = (donationCommentId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (typeof donationCommentId === 'undefined') {
            console.error('댓글 ID가 정의되지 않았습니다.');
            return;
        }
        console.log("Deleting ID:", userId); // 로그로 ID 확인
        deleteCommentMutation.mutate({ donationCommentId, userId });
    };

    return (
        <>
        <div css={s.commentBoxStyle}>
            <div css={s.inputboxStyle}>
                <textarea css={s.textareaStyle}
                    placeholder='따뜻한 댓글을 남겨주세요'
                    value={comment}
                    onChange={handleCommentChange}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => setIsExpanded(false)}
                />
                <button css={s.button5} onClick={handleCommentSubmit}>입력</button>
            </div>
            <div>
                {commentList.map((comment, index) => (
                    <div key={index} css={s.commentContainer}>
                        <div css={s.profileAndTextContainer}>
                            <div css={s.profileSection}>
                                <img src={comment.profileImg} css={s.profileIMG} />
                            </div>
                            <div css={s.textAndActionsContainer}>
                                <div css={s.textSection}>
                                    <div>{comment.name}</div>
                                    <p>{comment.commentText}</p>
                                </div>
                                <div css={s.actionsContainer}>
                                    <IoMdHeartEmpty /> <IoMdHeart />
                                    <button onClick={() => handleCommentDeleteButton(comment.challengeCommentId)}>
                                        {/* <TbTrashXFilled /> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}


export default CommentSection;