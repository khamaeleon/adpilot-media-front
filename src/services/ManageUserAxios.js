import {Axios} from "../common/Axios";

const ACTION_URL = '/api/auth';
const SLASH = '/';

const USER_LIST = ACTION_URL + '/userList';

export async function selUserList() {
  let returnVal = null;
  await Axios('POST', USER_LIST, null)
    .then((response) => {
      if(response.success){
        returnVal = response.data
      }
      returnVal = response
    }).catch((e) => returnVal = false)
  return returnVal;
};