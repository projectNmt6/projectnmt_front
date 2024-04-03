import instance from "../utils/instance"

export const getDonationListRequest = async (params) => { 
    return await instance.get("/main/donations", {params});
}