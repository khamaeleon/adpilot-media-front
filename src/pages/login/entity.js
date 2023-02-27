/**
 * 유저 토큰정보
 * @type {{data: {accessToken: string, isTermsAgree: boolean, refreshToken: string}, success: boolean, message: string}}
 */
export const UserToken = {
  accessToken: '',
  refreshToken: '',
  isTermsAgree: false
}
/**
 * login parameter Info
 * @type {{password: string, id: string}}
 */
export const loginParams= {
  memberId: '',
  password: ''
}

export const findIdParams ={
  managerPhone: '',
  managerEmail: ''
}

export const findIdResult = {
  managerId: ['Gildong2344',"Gildong1234","Gildong1234"]
}

export const findPasswordParams ={
  managerPhone: '',
  managerEmail: '',
  memberId: ''
}
