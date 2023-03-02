import {Axios} from "../common/Axios";
import {responseFormatMessage} from "../common/StringUtils";
import {accountProfile} from "../pages/account_manage/entity";

const ACTION_URL = '/account/invoice';
const SLASH = '/';

const USER_ID = ACTION_URL + SLASH
const LIST = '/list'+ SLASH

export async function accountUserProfile(userId) {
  let returnVal = null;
  await Axios('GET', USER_ID+userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === '200'){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function calculateProfileAdd() {
  let returnVal = null;
  await Axios('POST', ACTION_URL, null)
    .then((response) => {
      console.log(response)
      // if(response.responseCode.statusCode === '200'){
      //   returnVal = response.data
      // } else {
      //   returnVal = false
      // }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function accountHistoryTableData(userId) {
  let returnVal = null;
  await Axios('GET', ACTION_URL + LIST + userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === '200'){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}




