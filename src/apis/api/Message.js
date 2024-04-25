import instance from "../utils/instance"

export const getMessageListRequest = async (params) => { 
    return await instance.get("/account/message", {params});
}


export const deleteAllMessageRequest = async (data) => { 
    console.log(data);
    return await instance.delete(`/account/message/delete/${data.id}/${data.isTeam}`);
}