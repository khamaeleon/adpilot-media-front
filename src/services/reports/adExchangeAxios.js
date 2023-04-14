import {AdminAxios, MediaAxios} from "../../common/Axios";

/* 지면별연동사수신통계리스트조회 */
export async function selectStaticsAdExchange(userId,params) {
  //post
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('POST', `/statistics/${userId}/ad-exchange`, params)
      .then((response) => {
        if(response?.responseCode.statusCode === 200){
          returnVal = response.data
        } else if (response?.responseCode.statusCode === 500){
          returnVal = {totalCount: 0 ,rows:[]}
          console.log(response?.responseCode.message)
        }
      }).catch((e) => returnVal = false)
    return returnVal;
  } else {
    await AdminAxios('POST', `/media/statistics/ad-exchange`, params)
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
}

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectStaticsAdExchangeByInventory(userId,inventoryId, params) {
  //post
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('POST', `/statistics/${userId}/ad-exchange/${inventoryId}`, params)
      .then((response) => {
        if(response?.responseCode.statusCode === 200){
          returnVal = response.data
        } else if (response?.responseCode.statusCode === 500){
          returnVal = {totalCount: 0 ,rows:[]}
          console.log(response?.responseCode.message)
        }
      }).catch((e) => returnVal = false)
    return returnVal;
  } else {
    await AdminAxios('POST', `/media/statistics/ad-exchange/${inventoryId}`, params)
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
}