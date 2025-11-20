import {logo_inline_w} from "../../constants/GlobalConst";

export const selectedIcon = {
  dashboard: "/assets/images/aside/gmd_menu_01_on@3x.png",
  media:'/assets/images/aside/gmd_menu_02_on@3x.png',
  adExchange:'/assets/images/aside/gmd_menu_03_on@3x.png',
  reports:'/assets/images/aside/gmd_menu_04_on@3x.png',
  account:'/assets/images/aside/gmd_menu_05_on@3x.png',
  platform:'/assets/images/aside/gmd_menu_06_on@3x.png'
}

export const menuList = [
  {
    name: "dashboard",
    header: "대시보드",
    include:["dashboard"],
    child: []
  },
  {
    name: "media",
    header: "지면관리",
    include:["media","mediaList","mediaListDetail"],
    child:[
      {
        name: "media",
        header: "지면 등록",
      },
      {
        name: "mediaList",
        header: "지면 리스트",
        detail: "mediaListDetail"
      },
    ]
  },
  // {
  //   name: "adExchange",
  //   header: "애드익스체인지 관리",
  //   include:["adExchange","adExchangeDetail"],
  //   child:[
  //     {
  //       name: "adExchange",
  //       header: "서비스 수신 연동",
  //       detail: "adExchangeDetail"
  //     }
  //   ]
  // },
  {
    name: "reports",
    header: "보고서",
    include:["reports","reportsMedia","reportsInventory","reportsAdExchange"],
    child:[
      {
        name: "reports",
        header: "기간별 보고서",
      },
      {
        name: "reportsMedia",
        header: "매체별 보고서",
      },
      {
        name: "reportsInventory",
        header: "지면별 보고서",
      },
      // {
      //   name: "reportsAdExchange",
      //   header: "외부 연동 수신 보고서",
      // },
    ]
  },
  {
    name: "account",
    header: "정산관리",
    include:["account","accountHistory","accountProfile","accountConfirm","accountData"],
    child:[
      {
        name: "account",
        header: "정산 정보",
      },
  //    {
  //      name: "accountHistory",
  //      header: "정산 이력",
  //    },
      {
        name: "accountProfile",
        header: "정산 프로필 관리",
      },
  //    {
  //      name: "accountConfirm",
  //      header: "정산 심사",
  //    },
  //    {
  //      name: "accountData",
  //      header: "데이터 관리",
  //    },
    ]
  },
  {
    name: "platform",
    header: "플랫폼 관리",
    include:["platform","platformUserDetail","platformHistory","platformHistoryDetail","platformAdExchange","platformAdExchangeDetail"],
    child:[
      {
        name: "platform",
        header: "사용자 관리",
        detail: "platformUserDetail"
      },
      //{
      //  name: "platformHistory",
      //  header: "광고 이력 관리",
      //  detail: "platformHistoryDetail"
      //},
      //{
      //  name: "platformAdExchange",
      //  header: "애드 익스체인지 이력 관리",
      //  detail: "platformAdExchangeDetail"
      //},
    ]
  },
]


export const narrowStyle = {
  li: {
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 15
  },
  icon: {
    backgroundImage: `-webkit-image-set(url(${logo_inline_w}) 1x, url(${logo_inline_w}) 2x,url(${logo_inline_w}) 3x)`,
    width: 45,
    backgroundPosition: 'center'
  },
  button: {
    transform: "rotate(180deg)"
  }
}
export const widenStyle = {
  li:{
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    backgroundImage: `url(${logo_inline_w})`,
    width: 148,
  },
}