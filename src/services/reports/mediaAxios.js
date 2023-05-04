import {AdminAxios} from "../../common/Axios";

/* 매체별 통계 리스트 조회 */
export async function selectStaticsMedia(params) {
  //post
  let returnVal = null;
  await AdminAxios('POST', `/media/statistics/media`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === 200){
        returnVal = response.data
      } else if (response?.responseCode.statusCode === 500){
        returnVal = {totalCount: 0 ,rows:[]}
        console.log(response?.responseCode.message)
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택매체지면별통계리스트조회 */
export async function selectStaticsInventoryByMedia(accountId, params) {
  //post
  let returnVal = null;
  await AdminAxios('POST', `/media/statistics/${accountId}/media/inventory`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === 200){
        returnVal = response.data
      } else if (response?.responseCode.statusCode === 500){
        returnVal = {totalCount: 0 ,rows:[]}
        console.log(response?.responseCode.message)
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 매체(상세) 통계 리스트 조회 */
export async function selectStaticsMediaDetail(userId, params) {
  //post
  let returnVal = null;
  await AdminAxios('POST', `/media/statistics/${userId}/media`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === 200){
        returnVal = response.data
      } else if (response?.responseCode.statusCode === 500){
        returnVal = {totalCount: 0 ,rows:[]}
        console.log(response?.responseCode.message)
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}