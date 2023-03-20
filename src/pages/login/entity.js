export  const userInfo ={
  email: '',
  name:''
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
  email: '',
  password: ''
}

export  const adminInfo ={
  email: '',
  name:'',
  convertedUser: localStorage.getItem('username') ? localStorage.getItem('username') : "",
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
