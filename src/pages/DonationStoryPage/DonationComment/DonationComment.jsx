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

function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const [userId, setUserId] = useState();
    const [startIdx, setStartIdx] = useState(0);
    const [count, setCount] = useState(10);
    const commentContainerRef = useRef(null);
    const textareaRef = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

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

    const [totalComments, setTotalComments] = useState(0);  // 총 댓글 수를 상태로 관리합니다.

    useEffect(() => {
        commentResponse(donationPageId, startIdx, count) // 시작 인덱스와 덧글 수 전달
            .then(response => {
                console.log(response.data); // 데이터 구조 확인
                setCommentList(prevCommentList => [...prevCommentList, ...response.data]);
            })
            .catch(console.error);
    }, [donationPageId, startIdx, count]);


    const handleLoadMoreComments = () => {
        if (loadingMore || commentList.length >= totalComments) return; // 추가적인 댓글이 없을 때는 더 이상 가져오지 않음
        setLoadingMore(true);
        commentResponse(donationPageId, startIdx, count)
            .then(response => {
                setCommentList(prevComments => [...prevComments, ...response.data]);
                setStartIdx(prevIdx => prevIdx + response.data.length);
                setLoadingMore(false);
            })
            .catch(error => {
                console.error("Error loading more comments:", error);
                setLoadingMore(false);
            });
    };


    const handleCommentChange = (event) => {
        const newComment = event.target.value;
        if (newComment.length <= 500) {
            setComment(newComment);
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            await donationCommentePost({ commentText: comment, donationPageId, userId });
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
        alert("삭제 완료");
        setCommentList(currentComments => currentComments.filter(comment => comment.donationCommentId !== deletingCommentId));
        setIsModalOpen(false); // 모달 닫기
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


    const openDeleteModal = (commentId) => {
        setDeletingCommentId(commentId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        console.log("Deleting comment ID:", deletingCommentId);
        // 여기에 실제 삭제 로직을 구현
        deleteCommentMutation.mutate({ donationCommentId: deletingCommentId, userId });
        closeModal();
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
                                    <span >{comment.length}/500</span>
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
                                        onClick={() => openDeleteModal(comment.donationCommentId)}>
                                            <HiOutlineDotsHorizontal />
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>
                    </div>

                    {isModalOpen && <DeleteModal onClose={closeModal} onConfirm={handleDelete} />}

                </div>
            </div>
        </>
    );
}


export default CommentSection;