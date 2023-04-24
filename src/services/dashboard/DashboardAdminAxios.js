import {AdminAxios} from "../../common/Axios";

const ADMIN_URL = '/media/dashboard'
const REVENUE = '/revenue'
const THIS_MONTH = '/this-month'
const LAST_30TH = '/last-30th'
const REVENUE_SHARE = '/revenue-share'
const MAJOR_BY_PERIOD = '/major-by-period'
const SLASH = '/'

export async function dashboardRevenue() {
  let returnVal = null;
  await AdminAxios('GET', ADMIN_URL+REVENUE, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};


export async function dashboardThisMonth() {
  let returnVal = null;
  await AdminAxios('GET', ADMIN_URL+THIS_MONTH, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function dashboardLastMonth() {
  let returnVal = null;
  await AdminAxios('GET', ADMIN_URL+LAST_30TH, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function dashboardRevenueShare(TYPE) {
  let returnVal = null;
  await AdminAxios('GET', ADMIN_URL+REVENUE_SHARE+SLASH+TYPE, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function dashboardPeriodStatus(TYPE) {
  let returnVal = null;
  await AdminAxios('GET', ADMIN_URL+MAJOR_BY_PERIOD+SLASH+TYPE, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}