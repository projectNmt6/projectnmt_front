import instance from "../utils/instance"

export const getMessageListRequest = async (params) => { 
    return await instance.get("/account/message", {params});
}