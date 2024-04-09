import instance from "../utils/instance";

export const getDonationListRequest = async (params) => {
  try {
    return await instance.get("/main/donations", { params });
  } catch (error) {
    console.error("Error in getDonationListRequest:", error);
    throw error; // 에러를 다시 throw하여 호출 측에서도 처리할 수 있게 합니다.
  }
}

export const getDonationTagRequest = async (params) => {
  try {
    return await instance.get("/main/donationtag", { params });
  } catch (error) {
    console.error("Error in getDonationTagRequest:", error);
    throw error;
  }
}

export const registerDonationPage = async (data) => {
  try {
    return await instance.post("/main/write", data);
  } catch (error) {
    console.error("Error in registerDonationPage:", error);
    throw error;
  }
}

export const getDonationStoryRequest = async (params) => {
  try {
    return await instance.get("/main/donation", { params });
  } catch (error) {
    console.error("Error in getDonationStoryRequest:", error);
    throw error;
  }
}

export const registerReviewPage = async (data) => {
  try {
    return await instance.post("/main/review", data);
  } catch (error) {
    console.error("Error in registerReviewPage:", error);
    throw error;
  }
}

export const getAllDonationTag = async () => {
  try {
    return await instance.get("/main/storytypes")
  } catch (error) {
    console.error("Error in getAllDonationTag:", error);
    throw error;
  }
}

export const updatePageRequest = async (data) => {
  try {
    return await instance.put(`main/donation/update/${data.donationPageId}`, data);
  } catch (error) {
    console.error("Error in updatePageRequest:", error);
    throw error;
  }
}

export const searchDonationRequest = async (params) => {
  try {
    return await instance.get("/main/search", { params });
  } catch (error) {
    console.error("Error in searchDonationRequest:", error);
    throw error;
  }
}

export const getDonationPageRequest = async (pageId) => {
  try {
    return await instance.get(`/main/donation/${pageId}`);
  } catch (error) {
    console.error("Error in getDonationPageRequest:", error);
    throw error;
  }
}

export const submitDonationData = async (data) => {
  try {
    return await instance.post("/main/test", data);
  } catch (error) {
    console.error("Error in submitDonationData:", error);
    throw error;
  }
}

export const deleteDonationPage = async (data) => {
    try {
      // axios.delete의 두 번째 인자로 config 객체를 전달합니다.
      // 이 객체 내에 data 속성을 추가하여 요청 본문(body) 데이터를 포함시킵니다.
      return await instance.delete(`/main/donation/${data.donationPageId}`, { data });
    } catch (error) {
      console.error("Error in deleteDonationPage:", error);
      throw error;
    }
  };
  