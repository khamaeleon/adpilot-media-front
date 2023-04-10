import {AdminAxios, MediaAxios} from "../../common/Axios";
/* 기간별 통계 리스트 조회 */
export async function selectStaticsAll(userId, params) {
  const URL = `/media/statistics/all`
  //post
  let returnVal = null;
  if (userId !== '') {
    await MediaAxios('POST', `/statistics/${userId}/all`, params)
      .then((response) => {
        if(response?.responseCode.statusCode === 200){
          returnVal = response.data
        } else if (response?.responseCode.statusCode === 500){
          returnVal = {totalCount: 0 ,rows:[]}
          console.log(response?.responseCode.message)
        }
      }).catch((e) => returnVal = false)
    return returnVal;
  }else {
    await AdminAxios('POST', URL, JSON.stringify(params))
      .then((response) => {
        const {responseCode, data, message} = response;
        if(responseCode.statusCode === 200){
          returnVal = data;
        }else if(responseCode.statusCode !== 401 && responseCode.statusCode <= 500){
          returnVal = {message:"서버에러",rows:[]}
          console.log("something wrong...")
        }
      }).catch((e) => returnVal = false)
    return returnVal;
  }

}
