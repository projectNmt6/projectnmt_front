import instance from "../utils/instance"

export const getMessageListRequest = async (params) => { 
    console.log(params);
    return await instance.get(`/account/message/${params.id}/${params.isTeam}`);
}


export const deleteAllMessageRequest = async (data) => { 
    return await instance.delete(`/account/message/delete/${data.id}/${data.isTeam}`);
}