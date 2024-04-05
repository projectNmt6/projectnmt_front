import instance from "../utils/instance";

export const submitDonationData = async (data) => {
    return await instance.post("/main/test", data);
}