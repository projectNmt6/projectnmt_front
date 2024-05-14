import instance from "../utils/instance";

export const postLike = async (data) => {
    console.log(data);
    return await instance.post("/like/post", data);
}

export const getLike = async (params) => {
    return await instance.get("/like/get",{params});
}
export const getBestComment = async () => {
    return await instance.get("/like/bestcomment");
}