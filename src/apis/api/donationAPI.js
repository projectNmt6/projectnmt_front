import instance from "../utils/instance"

export const registerDonationPage = async (data) => {
    return await instance.post("/main/write", data);
}


