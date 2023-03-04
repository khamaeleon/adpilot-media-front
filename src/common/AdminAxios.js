import axios from "axios";
import {ADMIN_SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/AuthAxios";

export const adminAxios = axios.create({
  baseURL: ADMIN_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 401 && status <= 500;
  },
});

adminAxios.interceptors.request.use(
  async (config) => {
    let token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqcy5oYW5AbWNvcnBvci5jb20iLCJpc3MiOiJNQVAtRFNQIiwiYXVkIjoiTUFQLVVTRVIiLCJyb2xlcyI6WyJTVVBFUl9BRE1JTiJdLCJpYXQiOjE2Nzc4MTg4NDUsImV4cCI6MTY3NzkyNjg0NX0.6hAvrZI8D8KHCoZb-A9f-j7v0ijK5m6gBZUnj39yX6w';
    // const accessToken = localStorage.getItem("accessToken");
    // if(accessToken !==''){
    //   token = accessToken
    // }
    config.headers.Authorization = `Bearer ${token}`;
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
    const { config, response: {status}} = error;

    const originalRequest = config;

    if(status === 401) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(adminAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        let refreshToken = localStorage.getItem("refreshToken");
        const { success, data } = await refresh(refreshToken);
        if(success){
          localStorage.setItem("accessToken" ,data.accessToken)
          onTokenRefreshed(data.accessToken);
        }else{
          refreshSubscribers = [];
          isTokenRefreshing = false;
          localStorage.removeItem("refreshToken")
          // go to login
          // location.replace('/login');
        }
      }

      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
