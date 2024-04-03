import instance from "../utils/instance"

export const registerDonationPage = async (data) => {
    return await instance.post("/main/write", data);
}




/**
 * [Post 요청]
 * post(주소, 데이터(객체 => JSON), {
 *              headers: {}
 * })
 * 
 * [Get 요청]
 * get(주소, 
 *          {headers:{}, 
 *           params: {
 *              key: value          
 *            } 
 * })
 * 
 * [Delete 요청] 
 * delete(주소, {
 *      headers: {
 *          
 *      },
 *       data: {
 *          key: value 
 *          }  
 * })
 * 
 */