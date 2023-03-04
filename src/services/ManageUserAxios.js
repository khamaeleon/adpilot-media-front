import {AdminAxios} from "../common/Axios";
import {responseFormatMessage} from "../common/StringUtils";

const ACTION_URL = '/user';
const USER_MANAGE_URL ='/media/user'
const SLASH = '/';

const USER_LIST = USER_MANAGE_URL+'/list'
const USER_KEYWORD_SEARCH = ACTION_URL + '/find/by-media'
const USER_INFO = USER_MANAGE_URL+'/uuid'
const TERMS_INFO = '/policy/latest-terms'
const SIGNUP_URL = ACTION_URL + '/sign-up'
const VALID_USERID = ACTION_URL + '/verify/user-id'
const FIND_USERID = ACTION_URL + '/find/my-id'
const CHANGE_PASSWORD = ACTION_URL + '/find/my-password'

/**
 * 사용자 리스트 가져오기 api
 * @param userParams
 * @returns {Promise<null>}
 */
export async function selUserList(userParams) {
  let returnVal = null;
  await AdminAxios('POST', USER_LIST, userParams)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 단건 조회 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selUserInfo(userId) {
  let returnVal = null;
  await AdminAxios('GET', USER_INFO + '/' + userId)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 사용자 정보 수정
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function updateUser(userInfo) {
  let returnVal = null;
  await AdminAxios('PUT', USER_MANAGE_URL, userInfo)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 최신 약관 정보 가져오기 api
 * @returns {Promise<null>}
 */
export async function selPolicyLatestTerms() {
  let returnVal = null;
  await AdminAxios('GET', TERMS_INFO, null)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = response.responseCode.message
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 회원 가입 api
 * @param userInfo
 * @returns {Promise<*>}
 */
export async function signUp(userInfo) {
  return responseFormatMessage(await AdminAxios('POST', SIGNUP_URL, userInfo))
}

/**
 * 아이디 중복 검사 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selValidUserId(userId) {
  let returnVal = null;
  await AdminAxios('POST', VALID_USERID, userId)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = response.responseCode.message
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 아이디 찾기 API
 * @param userId
 * @returns {Promise<null>}
 */
export async function selFindUserId(userInfo) {
  let returnVal = null;
  await AdminAxios('POST', FIND_USERID, userInfo)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = response.responseCode.message
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 비밀번호 변경
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function selChangePassword(userInfo) {
  let returnVal = null;
  await AdminAxios('POST', CHANGE_PASSWORD, userInfo)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 매체 검색 api
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selKeywordUser(keyword) {
  let returnVal = null;
  await AdminAxios('GET', USER_KEYWORD_SEARCH + '?keyword=' + keyword, null)
  .then((response) => {
    if(response.responseCode.statusCode ===200){
      returnVal = response.data
    }else{
      returnVal = response.responseCode.message
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}


