import {Axios} from "../common/Axios";

const ACTION_URL = '/admin';
const SLASH = '/';

const RESIST_ADMIN = ACTION_URL + '';
const UPDATE_ADMIN = ACTION_URL + '';
const LIST_ADMIN = ACTION_URL + '/list';

/**
 * 어드민 계정 등록
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function createAdmin(adminInfo) {
  let returnVal = null;
  await Axios('POST', RESIST_ADMIN, adminInfo)
    .then((response) => {
      if(response.responseCode.statusCode ===201){
        returnVal = true
      }else{
        returnVal = null
      }

    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 어드민 계정 수정
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function updateAdmin(adminInfo) {
  let returnVal = null;
  await Axios('PUT', UPDATE_ADMIN, adminInfo)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selListAdmin(adminInfo) {
  let returnVal = null;
  await Axios('POST', LIST_ADMIN, adminInfo)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data.rows
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


