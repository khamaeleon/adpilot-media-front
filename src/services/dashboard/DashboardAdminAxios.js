import {AdminAxios} from "../../common/Axios";

const ADMIN_URL = '/media/dashboard'
const REVENUE = '/revenue'
const THIS_MONTH = '/this-month'
const LAST_30TH = '/last-30th'
const REVENUE_SHARE = '/revenue-share'
const MAJOR_BY_PERIOD = '/major-by-period'
const SLASH = '/'

export async function dashboardRevenue(userId) {
  let returnVal = null;
  let id = userId !== '' ? SLASH+userId : ''
  await AdminAxios('GET', ADMIN_URL+REVENUE+id, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};


export async function dashboardThisMonth(userId) {
  let returnVal = null;
  let id = userId !== '' ? SLASH+userId : ''
  await AdminAxios('GET', ADMIN_URL+THIS_MONTH+id, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function dashboardLastMonth(userId) {
  let returnVal = null;
  let id = userId !== '' ? SLASH+userId : ''
  await AdminAxios('GET', ADMIN_URL+LAST_30TH+id, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function dashboardRevenueShare(TYPE, userId) {
  let returnVal = null;
  let id = userId !== '' ? SLASH+userId : ''
  await AdminAxios('GET', ADMIN_URL+REVENUE_SHARE+SLASH+TYPE+id, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function dashboardPeriodStatus(TYPE, userId) {
  let returnVal = null;
  let id = userId !== '' ? SLASH+userId : ''
  await AdminAxios('GET', ADMIN_URL+MAJOR_BY_PERIOD+SLASH+TYPE+id, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}