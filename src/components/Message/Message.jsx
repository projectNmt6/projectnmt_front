import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postMessageRequest } from '../../apis/api/Admin';

function Message({list, isTeam}) {
    const [ message, setMessage ] = useState();

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
        console.log(message);
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
            let userIds = [];
            console.log(list);
            for(let team of list) {
                if(team.checked) {
                    userIds = [...userIds, team.teamId];
                }
            }
            sendMessageMutation.mutate({
                message,
                userId: userIds,
                isTeam
            });
        }
    }
    return (
        <div>
            <p><textarea placeholder="공지 사항 입력" value={message} onChange={handleTextareaOnchange} ></textarea></p>
            <button onClick={handleMessageOnClick}>공지보내기</button>
        </div>
    );
}

export default Message;