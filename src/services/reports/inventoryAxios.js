import {AdminAxios, MediaAxios} from "../../common/Axios";

export async function selectUserStaticsInventory(userId,params) {
  //post
  let returnVal = null;
  const URL = `/media/statistics/inventory`
  await MediaAxios('POST', `/statistics/${userId}/inventory`, params)
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

/* 매체별 지면 리스트 조회 */
export async function selectAdminStaticsInventory(userId,params) {
  //post
  let returnVal = null;
  const URL = `/media/statistics/inventory`
  if (userId !== undefined) {
    await AdminAxios('POST', `/media/statistics/${userId}/inventory`, params)
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
    await AdminAxios('POST', URL, params)
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

export async function selectUserStaticsInventoryDetail(userId, accountId, params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', `/statistics/${userId}/inventory/${accountId}`, params)
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


/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectAdminStaticsInventoryDetail(userId, accountId, params) {
  //post
  let returnVal = null;
  if(userId !== '') {
    await AdminAxios('POST', `/media/statistics/${userId}/inventory/${accountId}`, params)
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
    await AdminAxios('POST', `/media/statistics/inventory/${accountId}`, params)
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