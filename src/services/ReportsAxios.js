import {MediaAxios} from "../common/Axios";

/* 기간별 통계 리스트 조회 */
export async function selectStaticsAll(userId,params) {
  const URL = userId !== '' ? `/statistics/${userId}/all` :  `/statistics/all`
  //post
  let returnVal = null;
  await MediaAxios('POST', URL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 매체별 통계 리스트 조회 */
export async function selectStaticsMedia(params) {
  //post
  let returnVal = null;
  console.log(params)
  await MediaAxios('POST', `/statistics/media`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택매체지면별통계리스트조회 */
export async function selectStaticsInventoryByMedia(accountId, params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', `/statistics/${accountId}/media/inventory`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 매체(상세) 통계 리스트 조회 */
export async function selectStaticsMediaDetail(userId, params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', `/statistics/${userId}/media`, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}


/* 매체별 지면 리스트 조회 */
export async function selectStaticsInventory(userId,params) {
  //post
  let returnVal = null;
  const URL = userId ? `/statistics/${userId}/inventory` :  `/statistics/inventory`
  await MediaAxios('POST', URL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectStaticsInventoryDetail(userId,accountId, params) {
  //post
  let returnVal = null;
  const URL = userId ? `/statistics/${userId}/inventory/${accountId}` :  `/statistics/inventory/${accountId}`
  await MediaAxios('POST', URL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 지면별연동사수신통계리스트조회 */
export async function selectStaticsAdExchange(userId,params) {
  //post
  let returnVal = null;
  const URL = userId ? `/statistics/${userId}/ad-exchange` :  `/statistics/ad-exchange`
  await MediaAxios('POST', URL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectStaticsAdExchangeByInventory(userId, inventoryId, params) {
  //post
  let returnVal = null;
  const URL = userId ? `/statistics/${userId}/ad-exchange/${inventoryId}` :  `/statistics/ad-exchange/${inventoryId}`
  await MediaAxios('POST', URL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}