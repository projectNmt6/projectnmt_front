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