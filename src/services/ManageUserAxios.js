import {Axios} from "../common/Axios";
import {responseFormatMessage} from "../common/StringUtils";

const ACTION_URL = '/user';
const SLASH = '/';

const USER_LIST = ACTION_URL + '/userList'
const TERMS_INFO = '/policy/latest-terms'
const SIGNUP_URL = ACTION_URL +'/sign-up'
const VALID_USERID = ACTION_URL +'/verify/user-id'


export async function selUserList() {
  let returnVal = null;
  await Axios('POST', USER_LIST, null)
    .then((response) => {
      if(response.success){
        returnVal = response.data
      }
      returnVal = response
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 최신 약관 정보 가져오기 api
 * @returns {Promise<null>}
 */
export async function selPolicyLatestTerms() {
  let returnVal = null;
  await Axios('GET', TERMS_INFO, null)
    .then((response) => {
      console.log(response.responseCode.statusCode)
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
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
  return responseFormatMessage(await Axios('POST', SIGNUP_URL, userInfo))
}

/**
 * 아이디 중복 검사 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selValidUserId(userId) {
  let returnVal = null;
  await Axios('POST', VALID_USERID, userId)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = response.responseCode.message
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}



