import instance from "../utils/instance"

export const registerTeam = async (data) => {
    return await instance.post("/team/register", data);
}
export const updateTeamRequest = async (data) => {
    return await instance.put("/team/update", data);
}
export const getTeamListRequest = async (params) => {
    return await instance.get("/account/teams", {params});
}
export const getParticipationRequest = async (params) => {
    return await instance.get("/account/mypage/participate", {params});
}
export const getTeamInfoRequest = async (params) => {
    return await instance.get("/team/info", {params});
}
export const getTeamMemberInfoRequest = async (params) => {
    return await instance.get(`/team/member?${params}`);
}
export const getDonationListByTeamIdRequest = async (params) => { 
    return await instance.get("/team/donations", {params});
}
export const getChallengeListByTeamIdRequest = async (params) => { 
    return await instance.get("/team/challenges", {params});
}

export const updatePageShowRequest = async ( data ) => {
    return await instance.put("/team/updatePageShow",  data );
};
export const getTeamMemberInfoRequest2 = async (params) => {
    return await instance.get('/team/member', { params });
}
export const postJoinTeamRequest = async (data) => {
    return await instance.post('/team/join', data);
}

/**
 * 
 * post 요청(주소, 데이터(객체=>Json화), {headers:{}, config})
 * get  요청(주소, {headers:{}, params:{key: value}}) --객체를 params안에 넣어서 제공하는 편
 * delete요청(주소,{headers:{}, data: {key: value}}) --객체를 data안에 넣어서 제공하는 편
 */