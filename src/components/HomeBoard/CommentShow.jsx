import { useMutation, useQuery, useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { commentResponse } from '../../apis/api/DonationAPI';


function CommentShow({ donationPageId, isDonation }) {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();

    useEffect(() => {
        commentResponse(donationPageId)
            .then(response => setCommentList(response.data))
            .catch(console.error);
    }, [donationPageId]);

    // const { data: principalData } = useQuery(
    //     ["principalQuery"], 
    //     getPrincipalRequest,
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: (response) => {
    //             console.log("Authentication data fetched", response.data);
    //         },
    //         onError: (error) => {
    //             console.error("Authentication error", error);
    //         }
    //     }
    // );

    // const postCommentMutation = useMutation(donationCommentePost, {
    //     onSuccess: () => {
    //         console.log("Comment posted successfully");
    //         alert("등록완료.");
    //         setComment("");
    //         queryClient.invalidateQueries(["commentListQuery"]);
    //     },
    //     onError: (error) => {
    //         console.error("Failed to post comment:", error);
    //         alert("등록 실패");
    //     }
    // });

    // const handleCommentChange = (e) => setComment(e.target.value);

    // const handleCommentSubmit = async () => {
    //     postCommentMutation.mutate({
    //         commentText: comment,
    //         donationPageId,
    //         userId: principalData?.data.userId
    //     });
    // };

    // const deleteCommentMutation = useMutation(deleteComment, {
    //     onSuccess: () => {
    //         alert("삭제 완료");
    //         queryClient.invalidateQueries(["commentListQuery"]);
    //     },
    //     onError: (error) => {
    //         console.error("Failed to delete comment:", error);
    //         alert("삭제 실패");
    //     }
    // });

    // const handleCommentDeleteButton = (donationCommentId) => {
    //     deleteCommentMutation.mutate({ donationCommentId });
    // };
    

    return (
        <>
        <div css={s.commentBox}>
            {commentList.map((comment, index) => (
                <div key={index}>
                    <p>{comment.commentText}</p>
                </div>
            ))}
        </div>
    </>
    );
}


export default CommentShow;