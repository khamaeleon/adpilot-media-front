import axios from "axios";
import { MEDIA_SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/AuthAxios";
import {tokenResultAtom} from "../pages/login/entity";
import store from "../store";

export const mediaAxios = axios.create({
  baseURL: MEDIA_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 403 && status <= 500;
  },
});
mediaAxios.interceptors.request.use(
  async (config) => {
    let token=''
    const tokenAtom =store.get(tokenResultAtom)
    console.log(tokenAtom.accessToken)
    config.headers.Authorization = `Bearer ${tokenAtom.accessToken}`;
    return config;
  },
  async (error) => {
    return Promise.reject(error)
  }
)

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

mediaAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response: {status}} = error;
    const originalRequest = config;

    if(status === 403) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(mediaAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        await refresh().then(response =>{
          console.log(response)
          if(response){
            refresh().then(response => {
              if (response) {
                store.set(tokenResultAtom, {
                  id: response.id,
                  role: response.role,
                  name: response.name,
                  accessToken: response.token.accessToken,
                  refreshToken: response.token.refreshToken
                })
                onTokenRefreshed(response.token.accessToken);
              } else {
                refreshSubscribers = [];
                isTokenRefreshing = false;
                // eslint-disable-next-line no-restricted-globals
                location.replace('/')
              }
            })
          }
        })
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
