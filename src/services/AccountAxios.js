import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/account';
const SLASH = '/';
const INVOICE = '/invoice';
const STATUS = '/status';
const RECORD = '/record';

const STATUS_URL = INVOICE + STATUS + SLASH ;
const RECORD_URL = INVOICE + RECORD + SLASH ;
const PROFILE_URL = ACTION_URL + INVOICE + SLASH;
const LIST = '/list'

/** 매체 정산 프로필 API
 * 사용자 조회
 * @param userId
 * @returns {Promise<null>}
 */

export async function accountUserProfile(userId) {
  let returnVal = null;

  await MediaAxios('GET', PROFILE_URL + userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
/** 매체 정산 프로필 API
 * 정산 프로필 등록
 * @param userId
 * @returns {Promise<null>}
 */
export async function accountInsertInvoiceProfile(data) {
  let returnVal = null;

  await MediaAxios('POST', PROFILE_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/** 매체 정산 이력 API
 * 정산 수익 현황
 * @param userId
 * @returns {Promise<null>}
 */
export async function accountRevenueStatus(userId) {
  let returnVal = null;

  await MediaAxios('GET', STATUS_URL + userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}



export async function accountHistoryTableData() {
  let returnVal = null;

  await MediaAxios('GET', INVOICE + LIST , null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/** 매체 정산 이력 API
 * 정산 사용자 이력 조회
 * @param userId
 * @returns {Promise<null>}
 */
export async function accountRevenueUserList(userId) {
  let returnVal = null;

  await MediaAxios('GET', INVOICE + LIST + SLASH + userId)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = true
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 정산 이력 추가
 * @param
 * @returns {Promise<null>}
 */
export async function accountCreateInvoiceRecord(data) {
  let returnVal = null;

  await MediaAxios('POST', RECORD_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}



