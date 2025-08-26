import {AdminAxios} from "../../common/Axios";

const isInit = false;
/* 매체별 통계 리스트 조회 */
export async function selectStaticsMedia(params) {
  //post
  let returnVal = null;
  if(isInit){
    return {rows: [
        {historyDate: 20250805, revenueAmount : 10, requestCount: 10, responseCount: 10, exposureCount: 10, validClickCount: 10, costAmount: 10}
      ], totalCount: 1}
  }
  await AdminAxios('POST', `/media/statistics/media`, params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = {totalElements: 0 ,content:[]}
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택매체지면별통계리스트조회 */
export async function selectStaticsInventoryByMedia(accountId, params) {
  //post
  let returnVal = null;
  if(isInit){
    return {rows: [
        {historyDate: 20250805, revenueAmount : 10, requestCount: 10, responseCount: 10, exposureCount: 10, validClickCount: 10, costAmount: 10}
      ], totalCount: 1}
  }
  await AdminAxios('POST', `/media/statistics/${accountId}/media/inventory`, params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = {totalElements: 0 ,content:[]}
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 매체(상세) 통계 리스트 조회 */
export async function selectStaticsMediaDetail(userId, params) {
  //post
  let returnVal = null;
  if(isInit){
    return {rows: [
        {historyDate: 20250805, revenueAmount : 10, requestCount: 10, responseCount: 10, exposureCount: 10, validClickCount: 10, costAmount: 10}
      ], totalCount: 1}
  }
  await AdminAxios('POST', `/media/statistics/${userId}/media`, params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = {totalCount: 0 ,content:[]}
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}