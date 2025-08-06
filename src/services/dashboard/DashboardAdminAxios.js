import {AdminAxios} from "../../common/Axios";

const isInit = true;

const ADMIN_URL = '/media/dashboard'
const REVENUE = '/revenue'
const THIS_MONTH = '/this-month'
const LAST_30TH = '/last-30th'
const REVENUE_SHARE = '/revenue-share'
const MAJOR_BY_PERIOD = '/major-by-period'
const SLASH = '/'

export async function dashboardRevenue(userId) {
  let returnVal = null;
  if (isInit) {
    return {
      todayAmount: 50000,
      yesterdayAmount: 100000,
      last7daysAmount: 24000,
      thisMonthAmount: 124000,
    };
  }
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
  if (isInit) {
    return {
      todayAmount: 50000,
      yesterdayAmount: 100000,
      last7daysAmount: 24000,
      thisMonthAmount: 124000,
    };
  }
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
  if (isInit) {
    return {
      revenueAmount: 175350,
      requestCount: 53040,
      exposureCount: 10000,
      validClickCount: 8785
    };
  }
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
  if(isInit){
    return [
      {
        selectedTypeName: "PC",
        shareByPer: 65
      },
      {
        selectedTypeName: "모바일",
        shareByPer: 25
      },
      {
        selectedTypeName: "네이티브",
        shareByPer: 10
      }
    ]
  }
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
  if(isInit){
    return [
        { date: 20250801, count: 100},
        { date: 20250802, count: 630},
        { date: 20250803, count: 10},
        { date: 20250804, count: 8},
        { date: 20250805, count: 300},
        { date: 20250806, count: 60},
        { date: 20250807, count: 1000}
    ];
  }
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