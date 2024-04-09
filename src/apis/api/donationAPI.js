import instance from "../utils/instance";

export const getDonationListRequest = async (params) => {
  try {
    return await instance.get("/main/donations", { params });
  } catch (error) {
    console.error("Error in getDonationListRequest:", error);
    throw error;
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
    return await instance.get("/main/search", { params });
}

export const getDonationPageRequest = async (pageId) => {
    return await instance.get(`/main/donation/${pageId}`);

}

export const submitDonationData = async (data) => {
    return await instance.post("/main/test", data);
 
}

export const deleteDonationPage = async (data) => {
   
      return await instance.delete(`/main/donation/${data.donationPageId}`, { data });
   
  };
  