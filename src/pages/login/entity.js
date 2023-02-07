/**
 * 유저 토큰정보
 * @type {{data: {accessToken: string, isTermsAgree: boolean, refreshToken: string}, success: boolean, message: string}}
 */
export const UserToken = {
  data: {
    accessToken:'',
    refreshToken:'',
    isTermsAgree:false
  },
  success:false,
  message:''
}

export const loginParam = {
  id:'',
  password:''
}

