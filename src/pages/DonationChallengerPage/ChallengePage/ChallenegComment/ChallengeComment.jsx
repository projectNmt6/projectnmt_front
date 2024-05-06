import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getPrincipalRequest } from '../../../../apis/api/principal';
import { challengeCommentRequest, challengeCommentResponse, deleteChallengeComment } from '../../../../apis/api/DonationAPI';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { getUserInfoRequest } from '../../../../apis/api/Admin';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

function ChallengeComment({ challengePageId }) {

    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [userId, setUserId] = useState();
    const [startIdx, setStartIdx] = useState(0); // 시작 인덱스
    const [count, setCount] = useState(10); // 한 번에 표시할 덧글 수
    const commentContainerRef = useRef(null);
    const textareaRef = useRef(null);

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
        challengeCommentResponse(challengePageId, startIdx, count) // 시작 인덱스와 덧글 수 전달
            .then(response => {
                console.log(response.data); // 데이터 구조 확인
                setCommentList(prevCommentList => [...prevCommentList, ...response.data]);
            })
            .catch(console.error);
    }, [challengePageId, startIdx, count]);

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            await challengeCommentRequest({ commentText: comment, challengePageId, userId });
            setComment("");
            setIsExpanded(false); // 전송 후 확대 상태 해제
            setStartIdx(0); // 다시 처음부터 불러오기
            const response = await challengeCommentResponse(challengePageId, startIdx, count);
            setCommentList(response.data);
        } catch (error) {
            console.error("덧글 전송 실패:", error);
        }
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


    const [isExpanded, setIsExpanded] = useState(false); // 확대 상태 관리
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentContainerRef.current && !commentContainerRef.current.contains(event.target)) {
                // 댓글 입력 중에는 확대된 상태를 유지합니다.
                if (!comment.trim()) {
                    setIsExpanded(false); // 댓글 입력 값이 없을 때만 확대 상태 해제
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [comment]);

    const handleFocus = () => {
        setIsExpanded(true); // textarea 클릭 시 확대 상태 설정
    };

    const handleLoadMoreComments = () => {
        setStartIdx(prevStartIdx => prevStartIdx + count); // 시작 인덱스를 현재 시작 인덱스에서 덧글 수만큼 증가시킴
    };
    return (
        <>
            <div css={s.commentBoxStyle}>

                <div css={s.inputboxStyle}>
                    <form onSubmit={handleCommentSubmit}>
                        <div ref={commentContainerRef}>
                            <textarea
                                ref={textareaRef}
                                css={isExpanded ? s.textareaFocusStyle : s.textareaNormalStyle}
                                placeholder="댓글을 입력하세요"
                                value={comment}
                                onChange={handleCommentChange}
                                onFocus={handleFocus}
                            />
                            {(isExpanded || comment.trim().length > 0) && (
                                <button css={s.commentSubmitButton} type="submit">등록</button>
                            )}
                        </div>
                    </form>
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
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {commentList.length >= 10 && ( // 덧글이 10개 이상일 때만 '더보기' 버튼을 표시
                    <button onClick={handleLoadMoreComments}>더보기</button>
                )}
            </div>
        </>
    );
}

export default ChallengeComment;
