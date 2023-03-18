import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/admin';

const RESIST_ADMIN = ACTION_URL
const UPDATE_ADMIN = ACTION_URL
const LIST_ADMIN = ACTION_URL + '/list';
const INFO_ADMIN = ACTION_URL

/**
 * 어드민 계정 등록
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function createAdmin(adminInfo) {
  let returnVal = null;
  await AdminAxios('POST', RESIST_ADMIN, adminInfo)
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
  await AdminAxios('PUT', UPDATE_ADMIN, adminInfo)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 어드민 관리 리스트 조회
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function selListAdmin(adminInfo) {
  let returnVal = null;
  await AdminAxios('POST', LIST_ADMIN, adminInfo)
    .then((response) => {
      console.log(response)
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 어드민 단건 조회
 * @param adminId
 * @returns {Promise<null>}
 */
export async function selAdminInfo(adminId) {
  let returnVal = null;
  await AdminAxios('GET', INFO_ADMIN+'/' +adminId)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


