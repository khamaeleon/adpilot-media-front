import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/inventory';
const CONVERT_PUBLISH_URL = ACTION_URL + '/{inventoryId}/publish/{publish}';
const CONVERT_EXAMINATION_URL = ACTION_URL + '/{inventoryId}/examination/{examinationStatus}';
const SLASH = '/';

/**
 * 인벤토리 리스트 조회 api
 * @returns {Promise<null>}
 */
export async function selInventoryList(params) {
  let returnVal = null;
  let modelParam = '?';
  if(params.pageSize){
    modelParam += 'pageSize='+params.pageSize
  }
  if(params.currentPage){
    modelParam += '&currentPage='+params.currentPage
  }

  await MediaAxios('GET', ACTION_URL + modelParam, null)
  .then((response) => {
    if(response?.responseCode.statusCode === '200'){
      returnVal = response.data
    }
    returnVal = response.data
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 인벤토리 상세 조회 api
 * @returns {Promise<null>}
 */
export async function selInventory(inventoryId) {
  let returnVal = null;
  await MediaAxios('GET', ACTION_URL + SLASH + inventoryId, null)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 인벤토리 등록 api
 * @returns {Promise<null>}
 */
export async function createInventory(params) {
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL, params)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};
/**
 * 인벤토리 수정 api
 * @returns {Promise<null>}
 */
export async function updateInventory(inventoryId, params) {
  let returnVal = null;
  console.log(inventoryId, params)
  await MediaAxios('PUT', ACTION_URL + SLASH + inventoryId, params)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};

/** 인벤토리 게재 여부 수정 api
 * @returns {Promise<null>}
 */
export async function convertInventoryPublish(inventoryId, publish) {
  let returnVal = null;
  await MediaAxios('PUT',
      CONVERT_PUBLISH_URL.replace('{inventoryId}', inventoryId).replace('{publish}', publish),
      null)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};
/** 인벤토리 심사 상태 수정 api
 * @returns {Promise<null>}
 */
export async function convertInventoryExamination(inventoryId, examinationStatus) {
  let returnVal = null;
  await MediaAxios('PUT',
      CONVERT_EXAMINATION_URL.replace('{inventoryId}', inventoryId).replace('{examinationStatus}', examinationStatus),
      null)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};

