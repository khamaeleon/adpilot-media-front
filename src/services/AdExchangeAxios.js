import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/inventory';
const AD_EXCHANGE_URL = '/ad-exchange'
const SLASH = '/'

export async function getAdExchangeList(props) {
  let param = '';
  // if(props.jobTypeDataList.length !== 0 ){
  //   param += param !== '' ? '&' : '?'
  //   param += 'jobTypeSeqList=' + props.jobTypeDataList.map(item => item.jobTypeSeq).join(',');
  // }

  // if(props.recordOffSet){
  //   param += param !== '' ? '&' : '?'
  //   param += 'start_at='+props.start ;
  // }
  let returnVal = null;
  await MediaAxios('GET', ACTION_URL+AD_EXCHANGE_URL+param, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function getAdExchangeById(inventoryId) {
  let returnVal = null;
  await MediaAxios('GET', ACTION_URL+AD_EXCHANGE_URL+SLASH+inventoryId, null)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function createAdExchange(id,params) {
  console.log('POST: create => data: ',params)
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+AD_EXCHANGE_URL+SLASH+id, params)
    .then((response) => {
      if(response.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updateAdExchange(params) {
  console.log('PUT: update => data: ',params)
  const exchangeParams = []
  params.inventoryExchanges.map((item) => {
    exchangeParams.push({
      "id": item.id,
      "exchange_platform_type": item.exchangePlatformType,
      "exchange_service_type": item.exchangeServiceType,
      "params": item.params,
      "publish": item.publish,
      "sort_number": parseInt(item.sortNumber)
    })
    console.log(exchangeParams)
  })
  let returnVal = null;
  await MediaAxios('PUT', ACTION_URL+AD_EXCHANGE_URL+SLASH+params.inventoryId, exchangeParams)
    .then((response) => {
      if(response.responseCode.statusCode === '200'){
        returnVal = response
      }
      returnVal = response
    }).catch((e) => returnVal = false)
  return returnVal;
}