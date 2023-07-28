import {AdminAxios, MediaAxios} from "../../common/Axios";

// 매체 유저
export async function selectUserStaticsAll(userId, params) {
  let returnVal = null
  await MediaAxios('POST', `/statistics/${userId}/all`, params)
    .then(response => {
      if(response?.responseCode.statusCode === 200){
        returnVal = response.data
      } else if (response?.responseCode.statusCode === 500 || response?.responseCode.statusCode === 400){
        returnVal = {totalCount: 0 ,rows:[]}
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

// 매체 어드민
export async function selectAdminStaticsAll(userId, params) {
  let returnVal = null
  if(userId !== undefined) {
    await AdminAxios('POST', `/media/statistics/${userId}/all`, params)
      .then(response => {
        if(response?.responseCode.statusCode === 200){
          returnVal = response.data
        } else if (response?.responseCode.statusCode === 500 || response?.responseCode.statusCode === 400){
          returnVal = {totalCount: 0 ,rows:[]}
        }
      }).catch((e) => returnVal = false)
  } else {
    await AdminAxios('POST', `/media/statistics/all`, params)
      .then(response => {
        if(response?.responseCode.statusCode === 200){
          returnVal = response.data
        } else if (response?.responseCode.statusCode === 500 || response?.responseCode.statusCode === 400){
          returnVal = {totalCount: 0 ,rows:[]}
        }
      }).catch((e) => returnVal = false)

  }

  return returnVal;
}
