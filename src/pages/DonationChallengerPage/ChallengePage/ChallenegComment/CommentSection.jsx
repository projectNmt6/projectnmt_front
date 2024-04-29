// CommentSection.jsx

import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { challengeCommentRequest, challengeCommentResponse, deleteChallengeComment } from '../../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function CommentSection({ challengePageId }) {

    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [userId, setUserId ] = useState();

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

    useEffect(() => {
        challengeCommentResponse(challengePageId)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [challengePageId]);

    const handleCommentChange = (e) => setComment(e.target.value);

    const mutation = useMutation(challengeCommentRequest, {
        onSuccess: () => {
            console.log("덧글 전송 완료");
        },
        onError: (error) => {
            console.error("덧글 전송 실패:", error);
        }
    });


    
    const handleCommentSubmit = async () => {
        try {
            await mutation.mutateAsync({
                commentText: comment,
                challengePageId: challengePageId,
                userId: userId
            });
            setComment(""); // 성공 시 입력 필드 초기화
        } catch (error) {
            console.error("덧글 전송 실패:", error);
            // 에러 처리
        }
    };

    
    const handleCommentDeleteButton = (challengeCommentId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (typeof challengeCommentId === 'undefined') {
            console.error('댓글 ID가 정의되지 않았습니다.');
            return;
        }
        console.log("Deleting ID:", userId); // 로그로 ID 확인
        deleteCommentMutation.mutate({ challengeCommentId, userId });
    };
    

    const deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteChallengeComment,
        onSuccess: response => {
            alert("삭제완료")
            window.location.reload();
        },
        onError: response => {
            alert("삭제할 권한이 없습니다.")
        }
    });

    return (
        <>
            <div css={s.commentBoxStyle}>
                <div>
                    <input css={s.inputboxStyle}
                        type="text"
                        placeholder='따뜻한 댓글을 남겨주세요'
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                    <button css={s.button5}  onClick={handleCommentSubmit}>덧글 입력</button>
                <div>
                {commentList.map((comment, index) => (
                <div key={index}>
                    <p>{comment.commentText}
                        <button onClick={() => handleCommentDeleteButton(comment.challengeCommentId)}>
                            덧글 삭제 <TbTrashXFilled />
                        </button>
                    </p>
                </div>
            ))}
                </div>
            </div>
        </>
    );
}

export default CommentSection;