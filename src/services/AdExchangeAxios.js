import {Axios} from "../common/Axios";

const ACTION_URL = '/inventory';
const ADEXCHANGE_URL = '/ad-exchange'
const SLASH = '/'

export async function getInventory() {
  let returnVal = null;
  await Axios('GET', ACTION_URL+ADEXCHANGE_URL, null)
    .then((response) => {
      console.log(response)
      if(response.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function getInventoryById(inventoryId) {
  let returnVal = null;
  await Axios('GET', ACTION_URL+ADEXCHANGE_URL+SLASH+inventoryId, null)
    .then((response) => {
      console.log(response)
      if(response.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;

}