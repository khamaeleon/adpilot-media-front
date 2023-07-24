import axios from "axios";
import {ADMIN_SERVER} from "../constants/GlobalConst";
import {refreshAdmin} from "../services/auth/AuthAxios";
import {tokenResultAtom} from "../pages/login/entity";
import store from "../store";

export const adminAxios = axios.create({
  baseURL: ADMIN_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 403 && status !== 401 && status <= 500;
  },
});
adminAxios.interceptors.request.use(
  async (config) => {
    let token = ''
    const tokenAtom = store.get(tokenResultAtom)
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

adminAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const {config, response: {status}} = error;
    const originalRequest = config;

    if (status === 403 || status === 401) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(adminAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        await refreshAdmin().then(response => {
          if(!response) {
            refreshSubscribers = [];
            isTokenRefreshing = false;
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
            onTokenRefreshed(data.token.accessToken);
          } else if (responseCode.statusCode === 401 || responseCode.statusCode === 403) {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            // eslint-disable-next-line no-restricted-globals
            location.replace('/')
          } else {
            return Promise.reject(error)
          }
        })
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
