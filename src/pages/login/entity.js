import {useAtom} from "jotai";
import {TokenResult} from "./index";
import {atom} from "jotai/index";

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

export  const adminInfo ={
  email: '',
  name:'',
  convertedUser: localStorage.getItem('mediaUsername') ? localStorage.getItem('mediaUsername') : "",
}

export const tokenResultAtom = atom({
  accessToken:'',
  refreshToken:'',
  id:'',
  role:'',
  name:'',
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
  userId: ''
}
