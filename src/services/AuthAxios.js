import {NonUserAxios} from "../common/Axios";

const ACTION_URL = 'sign/in';
const SLASH = '/';

const LOGIN_USER = ACTION_URL + '/media';
const LOGIN_ADMIN = ACTION_URL + '/admin';
const REFRESH_URL = ACTION_URL + '/refresh';

/**
 * 유저 로그인 API
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function login(loginInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGIN_USER, loginInfo)
    .then((response) => {
      if(response.responseCode.statusCode===200){
        returnVal = true
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.setItem("refreshToken", response.data.token.refreshToken);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("role", response.data.role);
      }else{
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
      if(response.responseCode.statusCode===200){
        returnVal = true
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.setItem("refreshToken", response.data.token.refreshToken);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("role", response.data.role);
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function refresh(refreshToken) {
  const param ={
    refreshToken: refreshToken,
    deviceInfo: {
      deviceType: 'DEVICE_TYPE_PC'
    },
  }
  return await NonUserAxios('POST', REFRESH_URL, param)
};
