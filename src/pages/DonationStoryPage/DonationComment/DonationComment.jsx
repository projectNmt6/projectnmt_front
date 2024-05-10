import { useMutation, useQuery, useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { commentResponse, deleteComment, donationCommentPost, commentReportRequest, donationCommentePost } from '../../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPrincipalRequest } from "../../../apis/api/principal";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import LikeButton from '../../../components/LikeButton/LikeButton';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DeleteModal from './DeleteModal';

import { AiFillAlert } from "react-icons/ai";
function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const [userId, setUserId] = useState();
    const [startIdx, setStartIdx] = useState(0);
    const [count, setCount] = useState(10);
    const commentContainerRef = useRef(null);
    const textareaRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState(null);
    const [isCommentOwner, setIsCommentOwner] = useState(false);

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
        commentResponse(donationPageId, startIdx, count) // 시작 인덱스와 덧글 수 전달
            .then(response => {
                console.log("chcomment"+response.data); // 데이터 구조 확인
                setCommentList(prevCommentList => [...prevCommentList, ...response.data]);
            })
            .catch(console.error);
    }, [donationPageId, startIdx, count]);

    const handleCommentChange = (event) => {
        const newComment = event.target.value;
        if (newComment.length <= 500) {
            setComment(newComment);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await donationCommentePost(
                { commentText: comment, 
                    donationPageId, userId });
            setComment("");
            setIsExpanded(false); // 전송 후 확대 상태 해제
            setStartIdx(0); // 다시 처음부터 불러오기
            const response = await commentResponse(donationPageId, startIdx, count);
            setCommentList(response.data);
        } catch (error) {
            console.error("덧글 전송 실패:", error);
        }
    };

    const postCommentMutation = useMutation(donationCommentePost, {
        onSuccess: (data) => {
            setCommentList(oldComments => [...oldComments, data]); // 새 댓글을 기존 댓글 목록에 추가
            setComment("");
            queryClient.invalidateQueries(["commentListQuery"]);
        },
        onError: (error) => {
            console.error("Failed to post comment:", error);
            alert("등록 실패");
        }
    });

    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: () => {
            // 성공적으로 삭제된 후, commentList에서 해당 댓글을 제거
            setCommentList(currentComments =>
                currentComments.filter(comment => comment.donationCommentId !== currentCommentId)
            );
            setIsModalOpen(false); // 모달 닫기
            alert("삭제 완료");
        },
        onError: (error) => {
            console.error("Failed to delete comment:", error);
            alert("삭제 실패");
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

    const openDeleteModal = (commentId, isOwner) => {
        setCurrentCommentId(commentId);   // 현재 처리할 댓글 ID 설정
        setIsCommentOwner(isOwner);       // 댓글 작성자 여부 설정
        setIsModalOpen(true);             // 모달 창 열기
    };


    
    const postCommentReportMutation = useMutation({
        mutationKey: "postCommentReportMutation",
        mutationFn: commentReportRequest,
        onSuccess: response => {
            alert("신고완료")
        },
        onError: error => {
            alert(error.response.data)
        }
    });

    const reportCommentMutation = useMutation(
        commentReportRequest, // 신고 API 요청 함수
        {
            onSuccess: () => {
                alert("신고 완료");
                setIsModalOpen(false);
            },
            onError: (error) => {
                console.error("Failed to report comment:", error);
                alert("신고 실패");
            }
        }
    );

    // DeleteModal에 신고 기능 전달
    const handleCommentReport = (donationCommentId) => {
        reportCommentMutation.mutate({ donationCommentId });
    };

    return (
        <>
            <div css={s.commentBoxStyle}>
                <div css={s.inputboxStyle}>
                    <form onSubmit={handleCommentSubmit}>
                        <div css={s.commentContainer} ref={commentContainerRef}>
                            <textarea
                                ref={textareaRef}
                                css={isExpanded ? s.textareaFocusStyle : s.textareaNormalStyle}
                                placeholder="댓글을 입력하세요"
                                value={comment}
                                onChange={handleCommentChange}
                                onFocus={handleFocus}
                            />

                            {(isExpanded || comment.trim().length > 0) && (
                                <div css={s.commentControls}>
                                    <span css={s.lengthStryle} >{comment.length}/500</span>
                                    <button css={s.commentSubmitButton} type="submit">등록</button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div>
                    {commentList.map((comment, index) => (
                        <div key={index} css={s.commentContainer2}>
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
                                        <LikeButton commentId={comment.donationCommentId} />
                                        <button css={s.transparentButtonStyle}
                                            onClick={() => openDeleteModal(comment.donationCommentId, userId === comment.userId)}>
                                            <HiOutlineDotsHorizontal />
                                        </button>



                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>
                    </div>
                    {isModalOpen && (
                <DeleteModal
                    onClose={() => setIsModalOpen(false)}
                    onConfirmDelete={() => deleteCommentMutation.mutate({ donationCommentId: currentCommentId })}
                    onConfirmReport={() => handleCommentReport(currentCommentId)} // 신고 처리 수정
                    isCommentOwner={isCommentOwner}
                />
            )}
                </div>
            </div>
        </>
    );
}


export default CommentSection;