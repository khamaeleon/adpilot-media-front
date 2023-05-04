import {AdminAxios, AxiosImage} from "../../common/Axios";

const SLASH = '/';
const MEDIA = '/media';
const INVOICE = MEDIA + '/invoice';

const STATUS_URL = INVOICE + '/status' + SLASH  ;
const RECORD_URL = INVOICE + '/record' ;
const LIST_URL = INVOICE + '/list' ;
const MONTHLY_URL = INVOICE + '/monthly-list' + SLASH ;
const UPLOAD_URL = INVOICE + '/upload' + SLASH;
const PROFILE_URL = MEDIA + '/user-invoice' + SLASH;

/**
 * 매체 계정 전환 프로필 조회
 * @param username
 * @returns {Promise<null>}
 */

export async function accountUserProfile(username) {
  let returnVal = null;

  await AdminAxios('GET', PROFILE_URL + username, null)
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
 * 정산 프로필 등록
 * @param
 * @returns {Promise<null>}
 */
export async function accountInsertInvoiceProfile(data) {
  let returnVal = null;

  await AdminAxios('POST', PROFILE_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
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
export async function accountRevenueStatus(username) {
  let returnVal = null;
  await AdminAxios('GET', STATUS_URL + username, null)
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
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = false
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
      if(response.responseCode.statusCode === 200){
        returnVal = true
      } else {
        returnVal = false
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

  await AdminAxios('GET', MONTHLY_URL + username, null)
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
 * 통장 사본 및 사업자 등록증 등록
 * @param resourceType
 * @returns {Promise<false>}
 */
export async function accountFileUpload(username,data,resourceType) {
  let returnVal = null;

  await AxiosImage('POST', UPLOAD_URL + username + SLASH + resourceType, data)
    .then(response =>response.json())
    .then(data => {
      if(data.responseCode.statusCode === 200){
        returnVal = data.data.path
      } else {
        returnVal = false
      }
      })
    .catch((e) => returnVal = false)
  return returnVal;
}


