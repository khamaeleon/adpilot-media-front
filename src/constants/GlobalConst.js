
// API 서버URL
export const AUTH_SERVER = process.env.REACT_APP_API_AUTH_URL
export const ADMIN_SERVER = process.env.REACT_APP_API_ADMIN_URL
export const MEDIA_SERVER = process.env.REACT_APP_API_MEDIA_URL


//로고
export const logo = process.env.REACT_APP_LOGO_PATH + '/logo.png';
export const logo_inline = process.env.REACT_APP_LOGO_PATH + '/logo_inline.png';
export const logo_inline_w = process.env.REACT_APP_LOGO_PATH + '/logo_inline_w.png';

export const loginAdminParams= {
  email: process.env.REACT_APP_SYSTEM_ACCOUNT,
  password: process.env.REACT_APP_SYSTEM_PW
}
export const defaultImage = "https://static.trycatch.co.kr/assets/img/new-no-images.png";
