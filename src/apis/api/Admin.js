import instance from "../utils/instance"

export const getUserListRequest = async () => { 
    return await instance.get("/admin/user");
}

export const adminSearchDonationRequest = async (params) => {
    return await instance.get("/admin/search",{params});
}

// export const updatePageShowRequest = async ({ id, donationPageShow }) => {
//     return await instance.patch("/admin/updatePageShow", {id, donationPageShow});
// };
export const updatePageShowRequest = async ( data ) => {
    return await instance.patch("/admin/updatePageShow",  data );
};