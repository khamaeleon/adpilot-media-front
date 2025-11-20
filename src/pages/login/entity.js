import {atom} from "jotai";

export  const userInfo ={
  email: '',
  name:'',
  id:''
}
/**
 * login parameter Info
 * @type {{password: string, id: string}}
 */
export const loginParams= {
  username: '',
  password: ''
}

export const loginAdminParams= {
  email: 'system@oaple.co.kr',
  password: 'm@VLdu622x8R'
}

export const adminInfo = {
  email: '',
  name:'',
  convertedUser: "",
  id: '',
  accountProfile: ''
}

export const tokenResultAtom = atom({
  accessToken: '',
  refreshToken: '',
  id:'',
  role:'',
  name:'',
  username:'',
  serverName:''
})

export const findIdParams ={
  email: '',
  phone: ''
}

export const findIdResult = []

export const findPasswordParams ={
  phone: '',
  email: '',
  username: ''
}
