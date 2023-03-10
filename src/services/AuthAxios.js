import {NonUserAxios} from "../common/Axios";

const ACTION_URL = 'sign/in';
const SLASH = '/';

const LOGIN_USER = ACTION_URL + '/media';
const LOGIN_ADMIN = ACTION_URL + '/admin';
const ADMIN_REFRESH_URL = '/refresh-token/admin';
const USER_REFRESH_URL = '/refresh-token/media';

/**
 * 유저 로그인 API
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function login(loginInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGIN_USER, loginInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
        localStorage.setItem("accessToken", returnVal.data.token.accessToken);
        localStorage.setItem("role", returnVal.data.role);
        localStorage.setItem("id", returnVal.data.id);
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 관리자 로그인
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function loginAdmin(loginInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGIN_ADMIN, loginInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
        localStorage.setItem("accessToken", returnVal.data.token.accessToken);
        localStorage.setItem("role", returnVal.data.role);
        localStorage.setItem("id", returnVal.data.email);
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = null)
  return returnVal;
};

/**
 * 어드민 리프레쉬 토큰 api
 * @returns {Promise<null>}
 */
export async function refreshAdmin() {
  const param = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  await NonUserAxios('POST', ADMIN_REFRESH_URL, param).then((response) => {
    console.log(response)
    returnVal = response.data
    if (returnVal.responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("id")
      localStorage.removeItem("role")
      localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
      localStorage.setItem("accessToken", returnVal.data.token.accessToken);
      localStorage.setItem("role", returnVal.data.role);
      localStorage.setItem("id", returnVal.data.email);
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = null)
  return returnVal;
}

/**
 * 사용자 리프레쉬 토큰 api
 * @returns {Promise<*|null>}
 */
export async function refresh() {
  const param = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  return await NonUserAxios('POST', USER_REFRESH_URL, param).then((response) => {
    returnVal = response.data
    if (returnVal.responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("role")
      localStorage.removeItem("id")
      localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
      localStorage.setItem("accessToken", returnVal.data.token.accessToken);
      localStorage.setItem("role", returnVal.data.role);
      localStorage.setItem("role", returnVal.data.id);
      returnVal = true
    } else {
      returnVal = false
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}
