/** @jsxImportSource @emotion/react */
import { useMutation } from 'react-query';
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteComment } from '../../apis/api/DonationAPI';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';

function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/comment/getcomment/${donationPageId}`)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/comment/upload", {
                commentText: comment,
                donationPageId,
            });
            alert("전송 완료");
            setCommentList([...commentList, { commentText: comment }]);
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCommentMutation = useMutation({
        mutationKey: "deleteCommentMutation",
        mutationFn: deleteComment,
        onSuccess: response => {
            alert("삭제완료")
            window.location.reload();
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