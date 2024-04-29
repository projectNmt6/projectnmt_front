/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { challengeCommentRequest, commentRequest, commentResponse, deleteComment, donationCommentePost } from '../../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getTeamInfoRequest } from "../../../apis/api/teamApi";
import { getPrincipalRequest } from "../../../apis/api/principal";

function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [userId, setUserId ] = useState();

    useEffect(() => {
        commentResponse(donationPageId)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);

    const handleCommentChange = (e) => setComment(e.target.value);

    const mutation = useMutation(donationCommentePost, {
        onSuccess: () => {
            console.log("덧글 전송 완료");
        },
        onError: (error) => {
            console.error("덧글 전송 실패:", error);
        }
    });
    
    const principalQuery = useQuery(
        ["principalQuery"], 
        getPrincipalRequest,
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log("Auth", response.data);
                setUserId(response.data.userId);
            },
            onError: (error) => {
                console.error("Authentication error", error);
            }
        }
    );

    const handleCommentSubmit = async () => {
        try {
            await mutation.mutateAsync({
                commentText: comment,
                donationPageId: donationPageId,
                userId: userId
            });
            setComment(""); // 성공 시 입력 필드 초기화
        } catch (error) {
            console.error("덧글 전송 실패:", error);
            // 에러 처리
        }
    };
   

    const deleteCommentMutation = useMutation(
        deleteComment, {
        onSuccess: () => {
            alert("삭제 완료");
            window.location.reload(); // 삭제 후 새로고침
        },
        onError: (error) => {
            console.error("삭제 실패:", error);
            // 에러 처리
        }
    });

    const handleCommentDeleteButton = (donationCommentId) => {
        console.log("Deleting comment with ID:", donationCommentId);
        deleteCommentMutation.mutate({ donationCommentId });
    };
    
    return (
        <>
            <div css={s.commentBoxStyle}>
                <div>
                    <input
                        css={s.inputboxStyle}
                        type="text"
                        placeholder='  따뜻한 댓글을 남겨주세요.'
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                <button css={s.button5} onClick={handleCommentSubmit}>등록</button>
                <div>
                    {commentList.map((comment, index) => (
                        <div key={index}>
                            <p>{comment.commentText}
                                <button css={s.button5} onClick={() => handleCommentDeleteButton(comment.donationCommentId)}>
                                    댓글 삭제 <TbTrashXFilled /></button>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CommentSection;