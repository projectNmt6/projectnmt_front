import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteAllMessageRequest, getMessageListRequest } from '../../apis/api/Message';
import { useSearchParams } from 'react-router-dom';

function MessagePage({isTeam, adminId}) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ messageList, setMessageList ] = useState([]);
    const [ searchParams ] = useSearchParams();
    const messageListQuery = useQuery(["messageListQuery"],  async () => {
        return await getMessageListRequest({
            id: adminId === 1 ? 0 : !!searchParams.get("id") ? searchParams.get("id") : principalData?.data.userId,
            isTeam
        })
    }, {
        retry: 0,
        enabled: !!principalData?.data, 
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response);
            setMessageList(() => response.data);
        }
    });
    const deleteMessageMutation = useMutation({
        mutationKey: "deleteNessageMutation",
        mutationFn: deleteAllMessageRequest,
        onSuccess: response => {
            alert("삭제완료.");
            window.location.reload();   
        },
        onError: error => {}
    })  
    const deleteAllMessage = () => {
        if(isTeam === 0) {
            deleteMessageMutation.mutate({"id":principalData.data.userId, isTeam})
        }
    }
    return (
        <div css={s.div}>{
            messageList.length > 0 ?
            <>
                <div css={s.div6}>
                    60일이 지난 메세지는 자동 삭제됩니다!!
                </div>
                {messageList.map(message => (
                    <div css={s.div1} key={message.messageId}>
                        <img css={s.img}src={message.teamLogoUrl} alt="" />
                        <div css={s.div5}>
                        <div css={s.div2}>{message.date}</div>
                        <div css={s.div3}>{message.teamName}</div>
                        <div css={s.div4}>{message.message}</div>
                        </div> 
                    </div>
                ))}
                <button css={s.button} onClick={deleteAllMessage}>전체 메세지 삭제</button>
            </>
            : <div css={s.div7}>
                새로운 알림이 없습니다.
                중요한 알림을 한꺼번에 모아서 확인할 수 있어요.
            </div>
        }
        </div>
    );
}

export default MessagePage;