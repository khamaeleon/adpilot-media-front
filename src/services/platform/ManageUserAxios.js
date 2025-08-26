import {phoneNumFormat, responseFormatMessage} from "../../common/StringUtils";
import {AdminAxios, MediaAxios} from "../../common/Axios";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import React from "react";

const isInit = false;

const ACTION_URL = '/user';
const USER_MANAGE_URL = '/media/user'
const SLASH = '/';

const USER_LIST = USER_MANAGE_URL + '/list'
const USER_KEYWORD_SEARCH = USER_MANAGE_URL + '/find/by-media'
const USER_INFO = USER_MANAGE_URL + '/uuid'
const MY_INFO = ACTION_URL + '/uuid'
const BY_USER_INFO = ACTION_URL + '/username'

const TERMS_INFO = '/policy/latest-terms'
const SIGNUP_URL = ACTION_URL + '/sign-up'
const VALID_USERID = ACTION_URL + '/verify/username'
const FIND_USERID = ACTION_URL + '/find/my-id'
const CHANGE_PASSWORD = ACTION_URL + '/find/my-password'

/**
 * 사용자 리스트 가져오기 api
 * @param userParams
 * @returns {Promise<null>}
 */
export async function selUserList(userParams) {
  let returnVal = null;
  if (isInit) {
    return {
      rows: [
        {
          siteName: 'imbc',
          mediaType: '직매체',
          username: 'imbc_master',
          managerName1: '김용태',
          managerPhone1: '010-2530-8548',
          createdAt: '20250805',
          status: 'Y'}
      ],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1
    };
  }
  await AdminAxios('POST', USER_LIST, userParams)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 어드민 사용자 단건 조회 api
 * @param username
 * @returns {Promise<null>}
 */
export async function selUserInfo(username) {
  let returnVal = null;
  await AdminAxios('GET', USER_INFO + SLASH + username)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 내 정보 조회 api
 * @param username
 * @returns {Promise<null>}
 */
export async function selMyInfo(username) {
  let returnVal = null;
  if(isInit){
    return {
      email: 'ytkim@gmail.com',
      role: 'ADMIN',
      name: '김용태',
      token: {
        accessToken: '3298dsfh8ds9hfsdfs',
        refreshToken: '3298dsfh8ds9hfsdfs'
      }
    };
  }
  await MediaAxios('GET', MY_INFO + SLASH + username)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 사용자 정보 수정
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function updateUser(userInfo) {
  let returnVal = null;
  await AdminAxios('PUT', USER_MANAGE_URL, userInfo)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = true;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 내 정보 수정
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function updateMyInfo(userInfo) {
  let returnVal = null;
  await MediaAxios('PUT', ACTION_URL, userInfo)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = true;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 최신 약관 정보 가져오기 api
 * @returns {Promise<null>}
 */
export async function selPolicyLatestTerms() {
  let returnVal = null;
  await MediaAxios('GET', TERMS_INFO, null)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 회원 가입 api
 * @param userInfo
 * @returns {Promise<*>}
 */
export async function signUp(userInfo) {
  const request = {
    ...userInfo,
    isAgreedByServiceTerms: userInfo.isAgreedByServiceTerms ? 'Y' : 'N',
    isAgreedByPrivacyTerms: userInfo.isAgreedByPrivacyTerms ? 'Y' : 'N',
    isAgreedByOperationTerms: userInfo.isAgreedByOperationTerms ? 'Y' : 'N'
  };

  return responseFormatMessage(await MediaAxios('POST', SIGNUP_URL, request))
}

/**
 * 아이디 중복 검사 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selValidUserId(username) {
  let returnVal = null;
  await MediaAxios('GET', VALID_USERID + SLASH + username, null)
  .then((response) => {
    const { data, statusCode, message } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = message;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 아이디 찾기 API
 * @param userId
 * @returns {Promise<null>}
 */
export async function selFindUserId(userInfo) {
  let returnVal = null;
  await MediaAxios('POST', FIND_USERID, userInfo)
  .then((response) => {
    const { data, statusCode, message } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = message;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 비밀번호 변경
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function selChangePassword(userInfo) {
  let returnVal = null;
  await MediaAxios('POST', CHANGE_PASSWORD, userInfo)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = true;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 매체 검색 api
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selKeywordUser(keyword) {
  let returnVal = null;
  await AdminAxios('GET', USER_KEYWORD_SEARCH + '?keyword=' + keyword, null)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = null)
  return returnVal;
}

/**
 * 사용자 정보 가져오기 by userId
 * @param userId
 * @returns {Promise<null>}
 */
export async function selUserByUserId(username) {
  let returnVal = null;
  await MediaAxios('GET', BY_USER_INFO + SLASH + username, null)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode === 200){
      returnVal = data;
    }else{
      returnVal = false;
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}



