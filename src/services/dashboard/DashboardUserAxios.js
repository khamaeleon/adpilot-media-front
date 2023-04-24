import {MediaAxios} from "../../common/Axios";

const ACTION_URL = '/dashboard';
const REVENUE = '/revenue'
const THIS_MONTH = '/this-month'
const LAST_30TH = '/last-30th'
const REVENUE_SHARE = '/revenue-share'
const MAJOR_BY_PERIOD = '/major-by-period'
const SLASH = '/'

export async function dashboardUserRevenue(userId) {
  let returnVal = null;
  if(userId != ''){
    await MediaAxios('GET', ACTION_URL+REVENUE+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
    }).catch((e) => returnVal = false)
  }
  return returnVal;
};


export async function dashboardUserThisMonth(userId) {
  let returnVal = null;
  if(userId != '') {
    await MediaAxios('GET', ACTION_URL + THIS_MONTH + SLASH + userId, null)
    .then((response) => {
      if (response?.responseCode.statusCode === '200') {
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  }
  return returnVal;
};

export async function dashboardUserLastMonth(userId) {
  let returnVal = null;
  if(userId != '') {
    await MediaAxios('GET', ACTION_URL + LAST_30TH + SLASH + userId, null)
    .then((response) => {
      if (response?.responseCode.statusCode === '200') {
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  }
  return returnVal;
}

export async function dashboardUserRevenueShare(TYPE,userId) {
  let returnVal = null;
  if(userId != '') {
    await MediaAxios('GET',
        ACTION_URL + REVENUE_SHARE + SLASH + TYPE + SLASH + userId, null)
    .then((response) => {
      if (response?.responseCode.statusCode === '200') {
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  }
  return returnVal;
}

export async function dashboardUserPeriodStatus(TYPE,userId) {
  let returnVal = null;
  if(userId != '') {
    await MediaAxios('GET',
        ACTION_URL + MAJOR_BY_PERIOD + SLASH + TYPE + SLASH + userId, null)
    .then((response) => {
      if (response?.responseCode.statusCode === '200') {
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  }
  return returnVal;
}