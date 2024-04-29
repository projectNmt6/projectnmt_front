import instance from "../utils/instance";

export const getActionBoardList = async (challengePageId) => {
    return await instance.get(`/challenge/action-board/${challengePageId}`);
}

export const PostActionBoard = async (data) => {
    return await instance.post("/challenge/action-board/upload", data);
}

export const countActionBoard = async (challengePageId) => {
    return await instance.get(`/challenge/action-board/count/${challengePageId}`);
    
}
export const PostChallengeNews = async (data) => {
    return await instance.post(`main/challenge/news/${data.challengePageId}`, data);
}

export const getChallengeNewsRequest = async (page) => {
    return await instance.get(`/main/challenge/news/${page}`);
};


