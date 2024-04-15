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

export const postUserRoleRequest = async (data) => { 
    return await instance.post("/admin/user/role",data);
}
export const postMessageRequest = async (data) => { 
    return await instance.post("/admin/message",data);
}