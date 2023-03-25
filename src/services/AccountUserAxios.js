import {MediaAxios, AxiosImage} from "../common/Axios";

const SLASH = '/';
const MEDIA = '/media';
const INVOICE = MEDIA + '/invoice';

const STATUS_URL = INVOICE + '/status' + SLASH ;
const LIST_URL = INVOICE + '/list' + SLASH;
const MONTHLY_URL = INVOICE + '/monthly-list' + SLASH;
const PROFILE_URL = MEDIA + '/user-invoice' + SLASH;

/**
 * 프로필 조회
 * @param username
 * @returns {Promise<null>}
 */

export async function userAccountProfile(username) {
  let returnVal = null;

  await MediaAxios('GET', PROFILE_URL + username, null)
    .then((response) => {
      const {data, responseCode} = response
      if(responseCode.statusCode === 200){
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 정산 수익 현황
 * @param username
 * @returns {Promise<null>}
 */
export async function userAccountRevenueStatus(username) {
  let returnVal = null;
  await MediaAxios('GET', STATUS_URL + username, null)
    .then((response) => {
      const {data, responseCode} = response
      if(responseCode.statusCode === 200){
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)

  return returnVal;
}

/**
 * 정산 이력 조회
 * @param accountHistoryTableParams
 * @returns {Promise<null>}
 */
export async function userAccountHistoryTableData(username, params) {
  let returnVal = null;
  await MediaAxios('POST', LIST_URL + username , params)
    .then((response) => {
      const {data, responseCode} = response
      if(responseCode.statusCode === 200){
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}


/**
 * 월별 정산 이력
 * @param username
 * @returns {Promise<null>}
 */
export async function userAccountMonthlyListTableData(username) {
  let returnVal = null;
  await MediaAxios('GET', MONTHLY_URL + username, null)
    .then((response) => {
      const {data, responseCode} = response
      if(responseCode.statusCode === 200){
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}



