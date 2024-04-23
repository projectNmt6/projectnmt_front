import instance from "../utils/instance";

export const getActionBoardList = async (challengePageId) => {
    return await instance.get(`/challenge/action-board/${challengePageId}`);
}

export const PostActionBoard = async (data) => {
    return await instance.post("/challenge/action-board/upload", data);
}



