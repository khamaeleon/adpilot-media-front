import axios from "axios";
import {SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/AuthAxios";


export const customAxios = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 401 && status <= 500;
  },
});
const User = {
  accessToken :'',
  refreshToken:''
}


customAxios.interceptors.request.use(
  async (config) => {
    let token ='';
    // if(store.getState().auth.length !== 0){
    //   token = store.getState().auth.accessToken
    //
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

customAxios.interceptors.response.use(
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
          resolve(customAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        let refreshToken = localStorage.getItem("refreshToken");
        const { success, data } = await refresh(refreshToken);
        if(success){
          //accessToken 리덕스에다가 넣기
          // store.dispatch(setLogin(data));
          //set

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
