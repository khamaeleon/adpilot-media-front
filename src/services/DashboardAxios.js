import {AdminAxios, MediaAxios} from "../common/Axios";

const ACTION_URL = '/dashboard';
const PROCEEDS = '/proceeds'
const THIS_MONTH = '/this-month'
const LAST_30TH = '/last-30th'
const PROCEEDS_SHARE = '/proceeds-share'
const MAJOR_BY_PERIOD = '/major-by-period'
const SLASH = '/'

const role = localStorage

export async function dashboardProceeds(userId) {
  let returnVal = null;
  if (userId !== '') {
    await MediaAxios('GET', ACTION_URL+PROCEEDS+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  } else {
    await AdminAxios('GET', ACTION_URL+PROCEEDS, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  }
};


export async function dashboardThisMonth(userId) {
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('GET', ACTION_URL+THIS_MONTH+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  }  else {
    await AdminAxios('GET', ACTION_URL+THIS_MONTH, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  }

};

export async function dashboardLastMonth(userId) {
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('GET', ACTION_URL+LAST_30TH+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  } else {
    await AdminAxios('GET', ACTION_URL+LAST_30TH, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  }

}

export async function dashboardProceedShare(TYPE,userId) {
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('GET', ACTION_URL+PROCEEDS_SHARE+SLASH+TYPE+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  } else {
    await AdminAxios('GET', ACTION_URL+PROCEEDS_SHARE+SLASH+TYPE, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
    return returnVal;
  }

}

export async function dashboardPeriodStatus(TYPE,userId) {
  let returnVal = null;
  if(userId !== '') {
    await MediaAxios('GET', ACTION_URL+MAJOR_BY_PERIOD+SLASH+TYPE+SLASH+userId, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
  } else {
    await AdminAxios('GET', ACTION_URL+MAJOR_BY_PERIOD+SLASH+TYPE, null)
      .then((response) => {
        if(response?.responseCode.statusCode === '200'){
          returnVal = response.data
        }
        returnVal = response.data
      }).catch((e) => returnVal = false)
  }
  return returnVal;
}