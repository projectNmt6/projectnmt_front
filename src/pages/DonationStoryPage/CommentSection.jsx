import { useMutation, useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';


function CommentSection({ donationPageId }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");

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
                donationPageId,
            });
            alert("전송 완료");
            setCommentList([...commentList, { commentText: comment }]);
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <div css={s.commentBox}>
            <div>
                {commentList.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.commentText}</p>
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