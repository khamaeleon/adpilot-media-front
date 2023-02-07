import {SERVER} from "../constants/GlobalConst.js";
import {customAxios} from "./CustomAxios";

export async function Axios(type, uri, param) {
  switch(type){
    case 'GET' : return customAxios.get(uri);
    case 'POST' : return customAxios.post(uri, param);
    case 'PUT' : return customAxios.put(uri, param);
    case 'DELETE' : return customAxios.delete(uri, {data:param});
    default : return null;
  }
}

export async function AxiosImage(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken

  const accessToken="";
  return fetch(SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${accessToken}`,
    },
    validateStatus: function (status) {
      return status <= 500;
    },
    body: formData
  })
}

export async function AxiosFile(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken
  const accessToken =""
  return fetch(SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${accessToken}`,
    },
    validateStatus: function (status) {
      return status <= 500;
    },
    body: formData
  })
}
