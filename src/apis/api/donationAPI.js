import instance from "../utils/instance"

export const getDonationListRequest = async (params) => { 
    return await instance.get("/main/donations", {params});
}
export const getDonationTagRequest = async (params) => {
    return await instance.get("/main/donationtag",{params});
}
export const registerDonationPage = async (data) => {
    return await instance.post("/main/write", data);
}
export const getDonationStoryRequest = async (params) => {
    return await instance.get(`/main/donation`,{params});
}

export const registerReviewPage = async (data) => {
    return await instance.post("/main/review", data);
}

export const getAllDonationTag = async () => {
    return await instance.get("/main/storytypes")
}
