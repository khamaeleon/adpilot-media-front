import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/account/invoice';
const SLASH = '/';
const USER_ID = ACTION_URL + SLASH
const LIST = '/list'+ SLASH

export async function accountUserProfile(userId) {
  let returnVal = null;

  await MediaAxios('GET', USER_ID+userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function calculateProfileChange(data) {
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function accountHistoryTableData(userId) {
  let returnVal = null;
  await MediaAxios('GET', ACTION_URL + LIST + userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}




