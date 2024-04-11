import { useMutation, useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { commentReqest, deleteComment } from '../../apis/api/DonationAPI';

import {Link, useLocation, useParams } from 'react-router-dom';

function CommentSection() {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const donationCommentId = queryParams.get('page');
    useEffect(() => {
        axios.get("http://localhost:8080/comment/getcomment")
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, []);

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/comment/upload", {
                commentText: comment,
                donationCommentId,
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
    })
    
    const handleCommentDeleteButton = () => {
        deleteCommentMutation.mutate({
            donationCommentId: donationCommentId
        });
    }
    

    return (
        <>
        <div css={s.commentBox}>
            <div>
                {commentList.map((comment, index) => (
                    <div key={index}>
                    <p>{comment.commentText}
                    <button onClick={handleCommentDeleteButton}>덧글 삭제</button>
                    </p>
                </div>
                ))}
            </div>
        </div>

        <div>           
            
            <input 
                type="text" 
                value={comment}
                onChange={handleCommentChange}
                />
            <button onClick={handleCommentSubmit}>덧글 입력</button>
           
        </div>
    </>

    );
}

export default CommentSection