import {Axios} from "../common/Axios";

const ACTION_URL = '/api/auth';
const SLASH = '/';

const LOGIN_URL = ACTION_URL + '/login';
const REFRESH_URL = ACTION_URL + '/refresh';

export async function login(loginInfo) {
  let returnVal = null;
  await Axios('POST', LOGIN_URL, loginInfo)
    .then((response) => {
      if(response.success){
        returnVal = response.data.accessToken;
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      returnVal = response;
    }).catch(returnVal = false)
  return returnVal;
};

export async function refresh(refreshToken) {
  const param ={
    refreshToken: refreshToken,
    deviceInfo: {
      deviceType: 'DEVICE_TYPE_PC'
    },
  }
  return await Axios('POST', REFRESH_URL, param)
};
