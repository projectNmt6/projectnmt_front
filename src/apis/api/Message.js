import instance from "../utils/instance"

export const getMessageListRequest = async (params) => { 
    return await instance.get(`/account/message/${params.id}/${params.isTeam}`);
}

export const postMessageRequest = async (data) => { 
    return await instance.post("/account/message",data);
}

export const deleteAllMessageRequest = async (data) => { 
    return await instance.delete(`/account/message/delete/${data.id}/${data.isTeam}`);
}
export const deleteMessageRequest = async (data) => { 
    return await instance.delete(`/account/message/delete`, data);
}