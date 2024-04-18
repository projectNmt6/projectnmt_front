import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMessageListRequest } from '../../apis/api/Message';

function MessagePage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ messageList, setMessageList ] = useState([]);
    const messageListQuery = useQuery(["messageListQuery"],  async () => {
        return await getMessageListRequest({
            userId: principalData?.data.userId
        })
    }, {
        retry: 0,
        enabled: !!principalData?.data, 
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setMessageList(() => response.data);
        }
    });
    const deleteAllMessage = () => {
        
    }
    return (
        <div>
            <div>
                메세지 리스트
            </div>
            {messageList.map(message => {
                return <>
                    <div key={message.messageId}>
                        <img src={message.teamLogoUrl} alt="" />
                        <div>{message.teamName}</div>
                        <div>{message.message}</div>
                        <div>{message.date}</div>
                    </div>
                </>
            })}
            <div>
                60일이 지난 메세지는 자동 삭제됩니다.
            </div>
            <button onClick={deleteAllMessage}>전체 메세지 삭제</button>
        </div>
    );
}

export default MessagePage;