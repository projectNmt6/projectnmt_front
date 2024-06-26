import instance from "../utils/instance";

export const getDonationListRequest = async (params) => {
    return await instance.get("/main/donations", { params });
}

export const getDonationTagRequest = async (params) => {
    return await instance.get("/main/donationtag", { params });
}

export const registerDonationPage = async (data) => {
    return await instance.post("/main/write", data);
}

export const registerChallengePage = async (data) => {
    return await instance.post("/main/challenge/write", data);
}

export const getDonationStoryRequest = async (params) => {
    return await instance.get("/main/donation", { params });
}

export const getChallengePageRequest = async (page) => {
    return await instance.get(`/main/challenge/${page}`);
}
export const getChallengePage = async (params) => {
    return await instance.get(`/main/challenge`,{params});
}

export const getDonationNewsRequest = async (page) => {
    return await instance.get(`/main/donation/news/${page}`);
};



export const getChallengeList = async (params) => {
    return await instance.get("/main/challenges", {params});
}


export const registerNewsPage = async (data) => { 
    return await instance.post(`/main/donation/news/${data.donationPageId}`, data);
}

export const updatePageRequest = async (data) => {
    return await instance.put(`main/donation/update/${data.donationPageId}`, data);
}

export const updateDonationPageResponse = async (data) => {
    return await instance.get(`/main/donation/update/${data.donationPageId}`, data)
}
export const updateDonationNewsPageResponse = async (data) => {
    return await instance.get(`/main/donation/news/update/${data.donationPageId}`, data)
}
export const updateNewsRequest = async (data) => {
    return await instance.put(`/main/donation/news/update/${data.donationPageId}`, data);
}
export const updateChallengeNewsRequest = async (data) => {
    return await instance.put(`/main/challenge/news/update/${data.challengePageId}`, data);
}

export const updateChallengeRequest = async (data) => {
    return await instance.put(`/main/challenge/update/${data.challengePageId}`, data);
}

export const getUpdateChallengePageRequest = async (data) => {
    return await instance.get(`/main/challenge/update/${data.challengePageId}`, data);
}

export const searchDonationRequest = async (params) => {
    return await instance.get("/main/search", { params });
}
export const searchChallengeRequest = async (params) => {
    return await instance.get("/main/challenge/search", { params });
}

export const getDonationPageRequest = async (pageId) => {
    return await instance.get(`/main/donation/${pageId}`);
}

export const submitDonationData = async (data) => {
    console.log(data);
    return await instance.post("/main/test", data); 
}

export const deleteDonationPage = async (data) => {   
      return await instance.delete(`/main/donation/${data.donationPageId}`, { data });   
  };

export const deleteChallengePage = async (data) => {
    return await instance.delete(`/main/challenge/${data.challengePageId}`, {data})
}

export const donationCommentePost = async (data) => {
    return await instance.post(`/comment/upload/`, data);
}

export const challengeCommentRequest = async (data) => {
    return await instance.post(`/comment/challenge/upload`, data);
}

export const commentResponse = async (donationPageId) => {
    return await instance.get(`/comment/getcomment/${donationPageId}`);
}

export const challengeCommentResponse = async (challengePageId) => {
    return await instance.get(`/comment/challenge/get/${challengePageId}`)
}

export const donationGivingResponse = async (donationPageId) => {
    return await instance.get(`/main/donators/${donationPageId}`)
}
  export const commentRequest = async (data) => {
    return await instance.post("/comment/upload", data);
}

export const commentReportRequest = async (data) => {
    return await instance.post("/comment/report", data);
}

export const deleteComment = async (data) => {   

    return await instance.delete(`/comment/delete/${data.donationCommentId}`); 
};

export const deleteChallengeComment = async (data) => {
    const {challengeCommentId } = data;
    return await instance.delete(`/comment/challenge/delete/${challengeCommentId}`)
}

export const getNowFundingRequest = async (data) => {
    return await instance.get("/main/donation/fundings/now", data);
}

export const getEndFundingRequest = async (data) => {
    return await instance.get("/main/donation/fundings/end", data);
}

export const getAllAmount = async (params) => {
    return await instance.get("/main/amount", {params});
}
export const getProgressAmount = async (params) => {
    return await instance.get("/main/progress", {params});
}
