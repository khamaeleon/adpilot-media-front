import {AdminAxios} from "../../common/Axios";

const isInit = false;

const ACTION_URL = '/admin';
const UPDATE_ADMIN = ACTION_URL
const INFO_ADMIN = 'admin-user/me'
const ADMIN_LIST = ACTION_URL + '/list'
const CREATE_ADMIN = ACTION_URL


/**
 * 사용자 리스트 가져오기 api
 * @param userParams
 * @returns {Promise<null>}
 */
export async function selAdminList(userParams) {
  let returnVal = null;

  await AdminAxios('POST', ADMIN_LIST, userParams)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}
export async function createAdmin(userParams) {
  let returnVal = null;

  await AdminAxios('POST', CREATE_ADMIN, userParams)
  .then((response) => {
    const { message, statusCode } = response;
    if(statusCode === 200){
      returnVal = true;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}
/**
 * 어드민 계정 수정
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function updateAdmin(adminInfo) {
  let returnVal = null;
  await AdminAxios('PUT', UPDATE_ADMIN, adminInfo)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 어드민 단건 조회
 * @returns {Promise<null>}
 */
export async function selAdminInfo() {
  let returnVal = null;
  if(isInit){
    return {
      email: 'ytkim@gmail.com',
      name: '김용태',
      phoneNumber : '0102530854',
      activeYn: 'Y'
    };
  }
  await AdminAxios('GET', INFO_ADMIN)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


