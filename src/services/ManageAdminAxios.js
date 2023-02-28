import {Axios} from "../common/Axios";

const ACTION_URL = '/admin';
const SLASH = '/';

const RESIST_ADMIN = ACTION_URL + '';

export async function createAdmin(adminInfo) {
  let returnVal = null;
  await Axios('POST', RESIST_ADMIN, adminInfo)
    .then((response) => {
      if(response.responseCode.statusCode ==='201'){
        returnVal = response.responseCode.message
      }
      returnVal = response.responseCode.message
    }).catch((e) => returnVal = false)
  return returnVal;
};