import { atom } from "recoil";

export const selectedWritePageState = atom({
    key: "selectedWritePageState",
    default: {
        donationPageId: 0, 
        teamId: null, 
        mainCategoryId: null, 
        donationCategoryId: null, 
        donationName: title,
        createDate: null, 
        endDate: null, 
        storyTitle: null, 
        storyContent: null,
        mainImgUrl: null, 
        donationTagId: null, 
        donationPageShow: null 
    }

});