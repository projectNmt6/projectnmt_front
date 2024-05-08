/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postMessageRequest } from '../../apis/api/Admin';

function Message({list, isTeam ,text}) {
    const [ message, setMessage ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const sendMessageMutation = useMutation({
        mutationKey: "sendMessageMutation",
        mutationFn: postMessageRequest,
        onSuccess: response => {
            console.log(response);
            alert("전송완료.");
        },
        onError: error => {}
    })
    const handleTextareaOnchange = (e) => {
        setMessage(() => e.target.value);
    }
    const handleMessageOnClick = (e) => {
        if(isTeam === 0) {
            let userIds = [];
            for(let user of list) {
                if(user.checked) {
                    userIds = [...userIds, user.userId];
                }
            }
            sendMessageMutation.mutate({
                message,
                userId: userIds,
                isTeam
            });
        } else {
            let teamIds = [];
            console.log(list);
            for(let team of list) {
                if(team.checked) {
                    teamIds = [...teamIds, team.teamId];
                }
            }
            sendMessageMutation.mutate({
                message,
                userId: teamIds,
                isTeam
            });
        }
        setShowModal(() => false);
        setMessage(() => "");
    }
    return (
        <>
        {
            showModal ? <div css={s.layout}>
                <div css={s.messageBox}>
                    <button onClick={() => setShowModal(false)} css={s.messageBoxButton}>x</button>
                    <p><textarea placeholder="메세지 입력" value={message} onChange={handleTextareaOnchange} css={s.messageTextArea}></textarea></p>
                    <button onClick={handleMessageOnClick} css={s.messageSubmitButton}>메세지 보내기</button>
                </div>
            </div>
            : <button onClick={() => setShowModal(true)} >{text} </button>
        }
        </>
    );
}

export default Message;