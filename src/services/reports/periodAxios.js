import {AdminAxios, MediaAxios} from "../../common/Axios";

const isInit = false;

// 매체 유저
export async function selectUserStaticsAll(userId, params) {
  let returnVal = null
  if(isInit){
    return {rows: [
        {historyDate: 20250805, revenueAmount : 10, requestCount: 10, responseCount: 10, exposureCount: 10, validClickCount: 10, costAmount: 10}
      ], totalCount: 1}
  }
  await MediaAxios('POST', `/statistics/${userId}/all`, params)
    .then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = {totalElements: 0 ,content:[]}
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

// 매체 어드민
export async function selectAdminStaticsAll(userId, params) {
  let returnVal = null
  if(isInit){
    return {rows: [
        {historyDate: 20250805, revenueAmount : 10, requestCount: 10, responseCount: 10, exposureCount: 10, validClickCount: 10, costAmount: 10}
      ], totalCount: 1}
  }

  if(userId !== undefined) {
    await AdminAxios('POST', `/media/statistics/${userId}/all`, params)
      .then(response => {
        const { data, statusCode } = response;
        if(statusCode === 200){
          returnVal = data;
        }else{
          returnVal = {totalElements: 0 ,content:[]}
        }
      }).catch((e) => returnVal = false)
  } else {
    await AdminAxios('POST', `/media/statistics/all`, params)
      .then(response => {
        const { data, statusCode } = response;
        if(statusCode === 200){
          returnVal = data;
        }else{
          returnVal = {totalElements: 0 ,content:[]}
        }
      }).catch((e) => returnVal = false)

  }

  return returnVal;
}
