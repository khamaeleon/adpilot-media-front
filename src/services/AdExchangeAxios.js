import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/media/inventory';
const AD_EXCHANGE_URL = '/ad-exchange'
const AD_EXCHANGE_TYPE_URL = '/exchangePlatformType'
const SLASH = '/'

export async function getAdExchangeList(props) {
  let params = '';
  const {productType, deviceType, calculationType, examinationStatus, searchKeywordType, keyword} = props;

  if(productType.value && productType.value !== 'ALL') {
    params += params !== '' ? '&' : '?';
    params += 'productType=' + productType.value;
  }
  if(deviceType.value && deviceType.value !== 'ALL') {
    params += params !== '' ? '&' : '?';
    params += 'deviceType=' + deviceType.value;
  }
  if(calculationType.value && calculationType.value !== 'ALL') {
    params += params !== '' ? '&' : '?';
    params += 'calculationType=' + calculationType.label;
  }
  if(1) {
    params += params !== '' ? '&' : '?';
    params += 'examinationStatus=APPROVED';
  }
  if(searchKeywordType.value && searchKeywordType.value !== 'ALL'&& keyword) {
    params += params !== '' ? '&' : '?';
    params += 'searchKeywordType=' + searchKeywordType.value;
  }
  if(keyword) {
    params += params !== '' ? '&' : '?';
    params += 'keyword=' + keyword;
  }

  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+AD_EXCHANGE_URL+params, null)
    .then((response) => {
      const {responseCode, data, message} = response;
      if(responseCode.statusCode === 200)
      {
        returnVal = data;
      }else{
        console.log(message);
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function getAdExchangeById(inventoryId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+AD_EXCHANGE_URL+SLASH+inventoryId, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function createAdExchange(inventoryId, exchangePlaforms) {
  let returnVal = null;
  const params = exchangePlaforms.map(exchange => { return {...exchange, exchangePlatformType: exchange.exchangePlatformType.value}})

  await AdminAxios('POST', ACTION_URL+AD_EXCHANGE_URL+SLASH+inventoryId, params)
    .then((response) => {
      const {responseCode, data, message} = response;
      returnVal = responseCode;
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updateAdExchange(inventoryId, exchangePlaforms) {
  let returnVal = null;
  const params = exchangePlaforms.map(exchange => { return {...exchange, exchangePlatformType: exchange.exchangePlatformType.value}})

  await AdminAxios('PUT', ACTION_URL+AD_EXCHANGE_URL+SLASH+inventoryId, params)
    .then((response) => {
      const {responseCode, data, message} = response;
      returnVal = responseCode;
    }).catch((e) => returnVal = false)
  return returnVal;
}
export async function exchangePlatformTypeList() {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+AD_EXCHANGE_URL+AD_EXCHANGE_TYPE_URL, null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
    }).catch((e) => returnVal = false)
  return returnVal;
}