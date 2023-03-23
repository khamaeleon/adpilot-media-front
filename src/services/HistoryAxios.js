import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/media/revision';

const INVENTORY_LIST =ACTION_URL+'/inventory'
const AD_EX_INVENTORY_LIST =ACTION_URL+'/ad-exchange'

export async function selHistoryList(searchParams) {
  let returnVal = null;
  await AdminAxios('POST', INVENTORY_LIST, searchParams)
    .then((response) => {
      const {responseCode,data} =response
      if (responseCode.statusCode === 200) {
        returnVal = data.rows
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selHistoryInfo(revId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+revId+'/inventory', null)
    .then((response) => {
      const {responseCode,data} =response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selAdExChangeHistoryList(searchParams) {
  let returnVal = null;
  await AdminAxios('POST', AD_EX_INVENTORY_LIST, searchParams)
    .then((response) => {
      const {responseCode,data} =response
      if (responseCode.statusCode === 200) {
        returnVal = data.rows
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selAdExChangeHistoryInfo(revId) {
  let returnVal = null;
  await AdminAxios('GET', AD_EX_INVENTORY_LIST+'/'+revId, null)
    .then((response) => {
      const {responseCode,data} =response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

