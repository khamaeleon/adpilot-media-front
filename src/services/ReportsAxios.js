import {MediaAxios, AdminAxios} from "../common/Axios";
import {useAtom, useAtomValue} from "jotai";
import {tokenResultAtom} from "../pages/login/entity";
import {UserInfo} from "../pages/layout";


/* 기간별 통계 리스트 조회 */
export async function selectStaticsAll(userId,params) {
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


/* 매체별 통계 리스트 조회 */
export async function selectStaticsMedia(params) {
  //post
  let returnVal = null;
  console.log(params)
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


/* 매체별 지면 리스트 조회 */
export async function selectStaticsInventory(userId,params) {
  //post
  let returnVal = null;
  const URL = `/media/statistics/inventory`
  if (userId !== '') {
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

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectStaticsInventoryDetail(userId, accountId, params) {
  //post
  let returnVal = null;
  if(userId !== '') {
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
