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
  username: 'nate9988',
  password: 'P@ssw0rd!@#4'
}

export const loginAdminParams= {
  email: 'js.han@mcorpor.com',
  password: 'TestPassword!@34'
}

export const adminInfo ={
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
