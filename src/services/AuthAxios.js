import {Axios} from "../common/Axios";
import {responseFormatBoolean, responseFormatData, responseFormatMessage} from "../common/StringUtils";



const ACTION_URL = '/api/auth';
const SLASH = '/';

const LOGIN_URL = ACTION_URL + '/login';
const SOCIAL_URL ='/api/oauth/login';

const LOGOUT_URL = ACTION_URL + '/logout';
const SIGNOUT_URL = ACTION_URL + '/sign-out';
const REFRESH_URL = ACTION_URL + '/refresh';
const SIGNUP_URL = ACTION_URL + '/sign-up';
const ADDITIONAL_AUTH_URL = ACTION_URL + '/additional-authentication';
const VERIFY_ID_URL = ACTION_URL + '/verify-id';
const FIND_ID_URL = ACTION_URL + '/find-id';
const PASSWORD_RESET_URL = ACTION_URL + '/reset-password';
const CONFIRM_PASSWORD_RESET_URL = PASSWORD_RESET_URL + '/confirm';
const ROOM_NUMBER_VERIFY = ACTION_URL + '/room-number'+SLASH+'verify';

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

export async function socialLogin(loginInfo) {
  let returnVal = null;
  await Axios('POST', SOCIAL_URL+'/'+loginInfo.socialType, loginInfo).then((response) => {
      if (response.success) {
        returnVal = response.data.accessToken;
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", response.data.refreshToken);
      } else {
        if (response.message) console.log({message: response.message})
      }
      returnVal = response
    })
  return returnVal;
};


export async function logout(props) {
  let returnVal = null;
  await Axios('POST', LOGOUT_URL, props)
    .then((response) => {
      returnVal = responseFormatBoolean(response);
    })
  if (returnVal) {
    localStorage.removeItem("refreshToken")
  };
  return returnVal;
};

export async function signOut(props) {
  let returnVal = null;
  await Axios('POST', SIGNOUT_URL, props)
    .then((response) => {
      if (response.success) {
        returnVal = responseFormatBoolean(response);
        localStorage.removeItem("refreshToken")
      } else {
        returnVal = response.message
      }
    })
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

export async function signUp(props) {
  return responseFormatMessage(await Axios('POST', SIGNUP_URL, props))
};

export async function additionalAuth(props) {
  return responseFormatMessage(await Axios('POST', ADDITIONAL_AUTH_URL, props));
};
export async function verifyId(username) {
  return responseFormatMessage(await Axios('POST', VERIFY_ID_URL, username));
};

export async function selectFindId(props) {
  return await Axios('POST', FIND_ID_URL, props)
};

export async function confirmResetPassword(confirmPasswordInfo) {
  return await Axios('POST', CONFIRM_PASSWORD_RESET_URL, confirmPasswordInfo)
};

export async function resetPassword(resetPasswordInfo) {
  return responseFormatBoolean(await Axios('POST', PASSWORD_RESET_URL, resetPasswordInfo))
};

export async function verifyRoomNumber(props) {
  return responseFormatBoolean(await Axios('POST', ROOM_NUMBER_VERIFY, props))
};
