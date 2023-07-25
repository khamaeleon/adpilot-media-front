import {NonUserAxios} from "../../common/Axios";

const ACTION_URL = '/sign';

const LOGIN_USER = ACTION_URL + '/in/media';
const LOGIN_ADMIN = ACTION_URL + '/in/admin';
const LOGOUT_USER = ACTION_URL + '/out/media';
const LOGOUT_ADMIN = ACTION_URL + '/out/admin';
const ADMIN_REFRESH_URL = '/admin/refresh-token/1';
const USER_REFRESH_URL = '/media/refresh-token/1';

/**
 * 유저 로그인 API
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function login(loginInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGIN_USER, loginInfo)
    .then((response) => {
      const {data,responseCode} =response.data
      returnVal = data
      if (responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", data.token.refreshToken);
      } else {
        if (responseCode.code === 'C007') {
          returnVal = responseCode.code
        } else {
          returnVal = false
        }
      }
    }).catch((e) => returnVal = false)
  return returnVal
}

/**
 * 사용자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutUser(userInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGOUT_USER, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
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
      const {data,responseCode} =response.data
      returnVal = data
      if (responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", data.token.refreshToken);
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal
}

/**
 * 관리자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutAdmin(userInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGOUT_ADMIN, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal
}


/**
 * 어드민 리프레쉬 토큰 api
 * @returns {Promise<null>}
 */
export async function refreshAdmin() {
  const param = {
    accessToken: '',
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  await NonUserAxios('POST', ADMIN_REFRESH_URL, param).then((response) => {
    returnVal = response.data.data
    const {data,responseCode} =response.data
    returnVal = response.data
    if (responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.setItem("refreshToken", data.token.refreshToken);
    } else if (responseCode.statusCode === 401 || responseCode.statusCode === 403) {
      // eslint-disable-next-line no-restricted-globals
      location.replace('/')
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 리프레쉬 토큰 api
 * @returns {Promise<*|null>}
 */
export async function refresh() {
  const param = {
    accessToken: '',
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  await NonUserAxios('POST', USER_REFRESH_URL, param).then((responseUser) => {
    const {data,responseCode} =responseUser.data
    returnVal = responseUser.data
    if (responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.setItem("refreshToken", data.token.refreshToken);
    } else if (responseCode.statusCode === 401 || responseCode.statusCode === 403) {
      // eslint-disable-next-line no-restricted-globals
      location.replace('/')
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}
