import {ADMIN_SERVER} from "../constants/GlobalConst.js";
import {nonUserAxios} from "./NonUserAxios";
import {mediaAxios} from "./MediaAxios";
import {adminAxios} from "./AdminAxios";
import store from "../store";
import {tokenResultAtom} from "../pages/login/entity";
import {refreshAdmin} from "../services/auth/AuthAxios";

export async function AxiosImage(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken
  const tokenAtom =store.get(tokenResultAtom)
  const response = fetch(ADMIN_SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${tokenAtom.accessToken}`,
    },
    body: formData
  }).then(response =>response.json())
    .then(data => {
      if(data.responseCode.statusCode === 200){
        return data.data.path
      } else if(data.responseCode.statusCode === 401 || data.responseCode.statusCode === 403){
        refreshAdmin().then(response => {
          if(!response) {
            // eslint-disable-next-line no-restricted-globals
            location.replace('/')
          }
          const {data, responseCode} = response
          if (responseCode.statusCode === 200) {
            store.set(tokenResultAtom, {
              id: data.email,
              role: data.role,
              name: data.name,
              accessToken: data.token.accessToken,
              refreshToken: data.token.refreshToken,
              serverName: ADMIN_SERVER
            })
            AxiosImage(type, uri, formData)
          }
        })
      }
    })
    .catch((e) => {return false})
  return response
}

export async function AxiosFile(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken
  const accessToken =""
  return fetch(ADMIN_SERVER + uri, {
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

export async function NonUserAxios(type, uri, param) {
  switch(type){
    case 'GET' : return nonUserAxios.get(uri);
    case 'POST' : return nonUserAxios.post(uri, param);
    case 'PUT' : return nonUserAxios.put(uri, param);
    case 'DELETE' : return nonUserAxios.delete(uri, {data:param});
    default : return null;
  }
}

export async function MediaAxios(type, uri, param) {
  switch(type){
    case 'GET' : return mediaAxios.get(uri);
    case 'POST' : return mediaAxios.post(uri, param);
    case 'PUT' : return mediaAxios.put(uri, param);
    case 'DELETE' : return mediaAxios.delete(uri, {data:param});
    default : return null;
  }
}

export async function AdminAxios(type, uri, param,formData) {
  switch(type){
    case 'GET' : return adminAxios.get(uri);
    case 'POST' : return adminAxios.post(uri, param);
    case 'PUT' : return adminAxios.put(uri, param);
    case 'DELETE' : return adminAxios.delete(uri, {data:param});
    default : return null;
  }
}

