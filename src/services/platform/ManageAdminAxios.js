import {AdminAxios} from "../../common/Axios";

const isInit = true;

const ACTION_URL = '/admin';
const UPDATE_ADMIN = ACTION_URL
const INFO_ADMIN = 'admin-user/me'

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
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


