import instance from "../utils/instance"

export const getUserListRequest = async () => { 
    return await instance.get("/admin/user/list");
}
export const getUserInfoRequest = async (params) => { 
    return await instance.get("/admin/user",{params});
}
export const getUserCommentListRequest = async (params) => { 
    return await instance.get("/admin/comment",{params});
}
export const getTeamListRequest = async () => { 
    return await instance.get("/admin/teams");
}
export const deleteCommentRequest = async (data) => { 
    return await instance.delete("/admin/comment/delete",{data});
}

export const postUserRoleRequest = async (data) => { 
    return await instance.post("/admin/user/role",data);
}

export const postMessageRequest = async (data) => { 
    return await instance.post("/admin/message",data);
}
export const deleteUsersRequest = async (data) => { 
    return await instance.delete("/admin/user/delete",{data});
}
export const deleteTeamListRequest = async (data) => { 
    return await instance.delete("/admin/team/delete",{data});
}
export const updateDonationShowRequest = async (data) => { 
    console.log(data);
    return await instance.put("/admin/donation/show",data);
}
export const adminSearchDonationRequest = async (params) => {
    return await instance.get("/admin/search",{params});
}
export const updatePageShowRequest = async ( data ) => {
    return await instance.patch("/admin/updatePageShow",  data );
};
