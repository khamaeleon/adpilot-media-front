/**
 * 유저 토큰정보
 * @type {{data: {accessToken: string, isTermsAgree: boolean, refreshToken: string}, success: boolean, message: string}}
 */
export const UserToken = {
  accessToken: '',
  refreshToken: '',
  isTermsAgree: false
}
export  const userInfo ={
  email: '',
  name:''
}
/**
 * login parameter Info
 * @type {{password: string, id: string}}
 */
export const loginParams= {
  userId: '',
  password: ''
}

export const loginAdminParams= {
  email: '',
  password: ''
}

export  const adminInfo ={
  email: '',
  name:''
}

export const findIdParams ={
  email: '',
  phone: ''
}

export const findIdResult = []

export const findPasswordParams ={
  phone: '',
  email: '',
  userId: ''
}
