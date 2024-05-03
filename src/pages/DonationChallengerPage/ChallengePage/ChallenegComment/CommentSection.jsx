import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { challengeCommentRequest, challengeCommentResponse, deleteChallengeComment } from '../../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "../ChallenegComment/style";
import { getUserInfoRequest } from '../../../../apis/api/Admin';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

function CommentSection({ challengePageId }) {

    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [userId, setUserId ] = useState();
    const [isExpanded, setIsExpanded] = useState(false);

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
            .then(response => {
                console.log(response.data); // 데이터 구조 확인
                setCommentList(response.data);
            })
            .catch(console.error);
    }, [challengePageId]);
    
    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        
            await mutation.mutateAsync({
                commentText: comment,
                challengePageId: challengePageId,
                userId: userId
            });
            setComment(""); // 성공 시 입력 필드 초기화
        
    };
    
    
    const mutation = useMutation(challengeCommentRequest, {
        onSuccess: () => {
            console.log("덧글 전송 완료");
            // 성공 후 코멘트 목록 새로고침
            challengeCommentResponse(challengePageId)
                .then(response => {
                    setCommentList(response.data);
                })
                .catch(console.error);
            setComment(""); // 성공 시 입력 필드 초기화
            // setIsExpanded(false); // 전송 후 박스 크기를 원래대로 되돌림
        },
        onError: (error) => {
            console.error("덧글 전송 실패:", error);
        }
    });
    
    
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
    useEffect(() => {
        const commentBox = document.querySelector('.commentBoxStyle');  // 댓글 박스 선택
        if (commentBox) {
            commentBox.style.height = `${Math.max(500, commentList.length * 100)}px`;  // 댓글 수에 따라 높이 조정
        }
    }, [commentList]); 
    const containerRef = useRef(null);  // 컨테이너 참조 생성

useEffect(() => {
    if (containerRef.current) {
        containerRef.current.style.height = `${Math.max(500, commentList.length * 100)}px`;  // 컨테이너 높이 조정
    }
}, [commentList]);  // 댓글 목록이 변경될 때마다 실행

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
                                            <TbTrashXFilled />
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
