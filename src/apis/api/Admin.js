import instance from "../utils/instance"

export const getUserListRequest = async (params) => { 
    return await instance.get("/admin/user/list", {params});
}

export const getUserCountRequest = async (params) => { 
    return await instance.get("/admin/user/count", {params});
}
export const getTeamCountRequest = async (params) => { 
    return await instance.get("/admin/team/count", {params});
}
export const getStoryCountRequest = async (params) => { 
    return await instance.get("/admin/story/count", {params});
}
export const getUserInfoRequest = async (params) => { 
    return await instance.get("/admin/user",{params});
}
export const getUserCommentListRequest = async (params) => { 
    return await instance.get("/admin/comment",{params});
}
export const getTeamListRequest = async (params) => { 
    return await instance.get("/admin/teams", {params});
}
export const deleteCommentRequest = async (data) => { 
    return await instance.delete("/admin/comment/delete",{data});
}

export const postUserRoleRequest = async (data) => { 
    return await instance.post("/admin/user/role",data);
}

export const postMessageRequest = async (data) => { 
    console.log(data);
    return await instance.post("/admin/message",data);
}
export const deleteUsersRequest = async (data) => { 
    return await instance.delete("/admin/user/delete",{data});
}
export const deleteTeamListRequest = async (data) => { 
    return await instance.delete("/admin/team/delete",{data});
}
export const updateDonationShowRequest = async (data) => { 
    return await instance.put("/admin/donation/show",data);
}
export const adminSearchDonationRequest = async (params) => {
    return await instance.get("/admin/search",{params});
}

export const getAdminDonationListRequest = async (params) => {
    console.log(params);
    return await instance.get("/admin/donations", { params });
}

export const deleteDonationListRequest = async (data) => { 
    return await instance.delete("/admin/donation/delete",{data});
}
export const deleteChallengeListRequest = async (data) => { 
    return await instance.delete("/admin/challenge/delete",{data});
}