import {AdminAxios, AxiosImage} from "../../common/Axios";

const SLASH = '/';
const MEDIA = '/media';
const INVOICE = MEDIA + '/invoice';

const STATUS_URL = INVOICE + '/status'  ;
const RECORD_URL = INVOICE + '/record' ;
const LIST_URL = INVOICE + '/list' ;
const MONTHLY_URL = INVOICE + '/monthly-list' ;
const UPLOAD_URL = INVOICE + '/upload';
const PROFILE_URL = MEDIA + '/user-invoice';

/**
 * 매체 계정 전환 프로필 조회
 * @param username
 * @returns {Promise<null>}
 */

export async function accountUserProfile(username) {
  let returnVal = null;
  const userType = username !== '' ? PROFILE_URL + SLASH + username : PROFILE_URL
  await AdminAxios('GET', userType, null)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
/**
 * 정산 프로필 등록
 * @param
 * @returns {Promise<null>}
 */
export async function accountInsertInvoiceProfile(data) {
  let returnVal = null;

  await AdminAxios('POST', PROFILE_URL, data)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200){
        returnVal = true;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 정산 수익 현황
 * @param username
 * @returns {Promise<null>}
 */
export async function accountRevenueStatus(username) {
  const userType = username !== '' ? STATUS_URL + SLASH + username : STATUS_URL
  let returnVal = null;
  await AdminAxios('GET', userType, null)
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
export async function accountHistoryTableData(username, params) {
  let returnVal = null;
  let userType = username !== '' ? LIST_URL + SLASH + username : LIST_URL;
  await AdminAxios('POST', userType , params)
    .then((response) => {
      const {data, responseCode} = response
      if(responseCode.statusCode === 200){
        returnVal = data
      } else if(responseCode.statusCode === 500){
        returnVal = []
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 정산 이력 추가
 * @param accountCreateInvoice
 * @returns {Promise<false>}
 */
export async function accountCreateInvoiceRecord(params) {
  let returnVal = null;
  await AdminAxios('POST', RECORD_URL, params)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200){
        returnVal = true;
      } else {
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 정산 이력 수정 (정산 심사에서 상태값 변경)
 * @param accountUpdateInvoiceStatus
 * @returns {Promise<false>}
 */
export async function accountUpdateInvoiceRecord(params) {
  let returnVal = null;
  await AdminAxios('PUT', RECORD_URL, params)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200){
        returnVal = true;
      } else {
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 월별 정산 이력
 * @param username
 * @returns {Promise<null>}
 */
export async function accountMonthlyListTableData(username) {
  let returnVal = null;
  let userType = username !== '' ? MONTHLY_URL + SLASH + username : MONTHLY_URL;
  await AdminAxios('GET', userType, null)
    .then((response) => {
      console.log(response)
      const {data, statusCode} = response
      if(statusCode === 200){
        returnVal = data
      } else if(statusCode === 500){
        returnVal = []
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 통장 사본 및 사업자 등록증 등록
 * @param resourceType
 * @returns {Promise<void>}
 */
export async function accountFileUpload(username, data, resourceType) {
  let returnVal = null;

  await AxiosImage('POST', UPLOAD_URL + SLASH + username + SLASH + resourceType, data)
  .then(response => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    } else {
      returnVal = false;
    }
  })
  .catch((e) => returnVal = false)
  return returnVal;
}


