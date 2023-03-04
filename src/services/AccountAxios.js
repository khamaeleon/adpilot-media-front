import {MediaAxios} from "../common/Axios";
import {responseFormatMessage} from "../common/StringUtils";
import {accountProfile} from "../pages/account_manage/entity";

const ACTION_URL = '/account';
const SLASH = '/';
const INVOICE = '/invoice';
const STATUS = '/status';
const RECORD = '/record';

const STATUS_URL = INVOICE + STATUS + SLASH ;
const RECORD_URL = INVOICE + RECORD + SLASH ;
const PROFILE_URL = ACTION_URL + INVOICE + SLASH;
const LIST = '/list'

export async function accountRevenueStatus(userId) {
  let returnVal = null;

  await MediaAxios('GET', STATUS_URL + userId, null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function accountCreateRecord(data) {
  let returnVal = null;
  await MediaAxios('POST', RECORD_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function accountUserProfile(userId) {
  let returnVal = null;

  await MediaAxios('GET', PROFILE_URL + userId, null)
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
  await MediaAxios('POST', PROFILE_URL, data)
    .then((response) => {
      if(response.responseCode.statusCode === 201){
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function accountHistoryTableData() {
  let returnVal = null;
  await MediaAxios('GET', INVOICE + LIST , null)
    .then((response) => {
      if(response.responseCode.statusCode === 200){
        returnVal = response.data
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}




