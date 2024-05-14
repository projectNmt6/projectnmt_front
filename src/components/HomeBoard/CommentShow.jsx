import { useMutation, useQuery, useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { commentResponse } from '../../apis/api/DonationAPI';
import { getBestComment } from '../../apis/api/Like';

function CommentShow() {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const donationPageId = 97;
    const getBestCommentQuery = useQuery(
        ["getBestCommentQuery"],
        async () => {
            const response = await getBestComment();
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
              console.log(data);
              
                setCommentList(data);
            }, 
            onError: error => {
                console.log(error);

            }
        }
    );



    return (
        <>
        <div css={s.commentBox}>
            {commentList.map((index) => (
                <div key={index}>
                    <p>{index}</p>
                </div>
            ))}
        </div>
    </>
    );
}


export default CommentShow;