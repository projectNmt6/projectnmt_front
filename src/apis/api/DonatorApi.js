import instance from "../utils/instance";

export const submitDonationData = async (data) => {
    return await instance.post("/main/test", data);
}
export const submitDonatorEditData = async (data) => {
    return await instance.put("/account/mypage/edit", data)
}
export const getDonatorList = async (params) => { 
    return await instance.get("/account/mypage/donation", {params});
}
export const getDonators = async (params) => { 
    return await instance.get("/donator", {params});
}
export const getDonatorsByPageId = async (params) => { 
    return await instance.get(`/list/${params.pageId}`);
}
export const passwordEditData = async (data) => {
    return await instance.put("/account/mypage/edit/password", data)
}
