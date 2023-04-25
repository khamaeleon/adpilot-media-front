export const defaultEnumerates = {
  calculationAllType: {
    CPC: 'CPC',
    CPM: 'CPM',
    RS: 'RS',
    GT: 'GT'
  },
  productTypeInfo: {
    BANNER:'배너',
    POP_UNDER: '팝언더'
  },
  deviceTypeInfo: {
    PC:'PC',
    MOBILE: '모바일',
    RESPONSIVE_WEB: '반응형웹'
  },
  eventTypeInfo: {
    SAW_THE_PRODUCT:"카트추천",
    CART_THE_PRODUCT:"상품추천",
    DOMAIN_MATCHING:"유저매칭",
    USER_OPTIMIZATION:"유저최적화"
  },
  searchMediaTypeInfo: {
    SITE_NAME: '매체명',
    INVENTORY_NAME: '지면명',
    INVENTORY_ID: '지면코드'
  },
  agentTypeInfo: {
    WEB: 'PC 웹',
    WEB_APP: 'PC 어플리케이션',
    MOBILE_WEB: '모바일 웹',
    MOBILE_NATIVE_APP: '모바일 어플리케이션'
  },
  inventoryTypeInfo:{
    BANNER_BASIC:'일반 배너',
    BANNER_FLOATING:'플로팅 배너',
    BANNER_TOAST:'토스트 배너',
    POP_UNDER_DIRECT:'다이렉트 커버',
    POP_UNDER:'팝언더'
  },
  mediaAcceptYn: {
    on: '게제중',
    off: '중지'
  },
  adExchangeYn: {
    IN_COMING: '수신',
    OUT_COMING: '송출'
  },
  deleteIMG: (str) => {
    if(str !== undefined && typeof str === "string"){
      return str.replace('IMG','').replace('_','x')
    }
  }
}

Object.freeze(defaultEnumerates)