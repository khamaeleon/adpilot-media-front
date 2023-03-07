/* 기본값 */


/* 검색 */
import moment from "moment/moment";

export const defaultCondition = {
  pageSize: 1,
  currentPage:1,
  searchStartDate: moment().add(-8, 'd'),
  searchEndDate: moment(),
  productType: [{id:1,value:'BANNER',label:'배너'}, {id:2,value:'POP_UNDER',label:'팝 언더'}],
  eventType: [{id:1,value:'SAW_THE_PRODUCT',label:'본상품'}, {id:2,value:"CART_THE_PRODUCT",label:"장바구니"}, {id:3,value:'DOMAIN_MATCHING',label:'리턴매칭'}],
  isAdExchange: [{id:1,value:"true",label:"연동"},{id:1,value:'false',label:"미연동"}],
  deviceType: [{key:"1",value:'pc',"label":'PC'}, {key:"2",value:'mobile',label: "모바일"}],
  agentType:  ["PC 웹","PC 어플리케이션","모바일 웹","모바일 어플리케이션"],
  sortType: ['BY_DATE','BY_SITE_NAME','BY_INVENTORY_NAME']
}
/* 결과 */
export const reportsStaticsAllColumn = [
  {
    name: 'historyDate',
    header: '통계일'
  },
  {
    name: 'requestCount',
    header: '요청수',
  },
  {
    name: 'responseCount',
    header: '응답수',
  },
  {
    name: 'exposureCount',
    header: '노출수',
  },
  {
    name: 'clickCount',
    header: '클릭수',
  },
  {
    name: 'costAmount',
    header: '비용',
  },
  {
    name: 'proceedsAmount',
    header: '수익금',
  },
  {
    name: 'validClickCount',
    header: '총 클릭 수'
  }
]
export const reportsStaticsAll = {
  "totalCount" : 59,
  "totalPages" : 6,
  "currentPage" : 1,
  "rows" : [
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.07",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.08",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.09",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.10",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.11",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.12",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.13",
      "validClickCount": 1000
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "historyDate": "2023.03.14",
      "validClickCount": 1000
    }
  ]
}
export const reportsMediaColumns = [
  {
    name: 'id',
    header: 'ID'
  },
  {
    name: 'userId',
    header: '아이디'
  },
  {
    name: 'request',
    header: '요청수',
  },
  {
    name: 'require',
    header: '응답수',
  },
  {
    name: 'impression',
    header: '노출수',
  },
  {
    name: 'totalClicks',
    header: '총클릭수',
  },
  {
    name: 'clicks',
    header: '클릭수',
  },
  {
    name: 'clickRate',
    header: '클릭율',
  },
  {
    name: 'expense',
    header: '비용',
  },
  {
    name: 'proceed',
    header: '수익금',
  },
  {
    name: 'cpc',
    header: 'CPC',
  },
  {
    name: 'ecpm',
    header: 'eCPM',
  }
]
export const reportsMedia = [
  {
    id: 0,
    userId: '아이디',
    request : 22,
    require : "",
    impression : "",
    totalClicks : "",
    clicks : "",
    clickRate : "",
    expense : "",
    proceed : "",
    cpc : "",
    ecpm : "",
  }
]
export const reportsPagesColumns = [
  {
    name: 'id',
    header: 'ID'
  },
  {
    name: 'pageName',
    header: '지면명'
  },
  {
    name: 'pageNumber',
    header: '지면번호'
  },
  {
    name: 'request',
    header: '요청수',
  },
  {
    name: 'require',
    header: '응답수',
  },
  {
    name: 'impression',
    header: '노출수',
  },
  {
    name: 'totalClicks',
    header: '총클릭수',
  },
  {
    name: 'clicks',
    header: '클릭수',
  },
  {
    name: 'clickRate',
    header: '클릭율',
  },
  {
    name: 'expense',
    header: '비용',
  },
  {
    name: 'proceed',
    header: '수익금',
  },
  {
    name: 'cpc',
    header: 'CPC',
  },
  {
    name: 'ecpm',
    header: 'eCPM',
  }
]
export const reportsPages = [
  {
    id: 0,
    pageName: '지면명',
    pageNumber: '123123',
    request : 22,
    require : "",
    impression : "",
    totalClicks : "",
    clicks : "",
    clickRate : "",
    expense : "",
    proceed : "",
    cpc : "",
    ecpm : "",
  }
]
export const reportsAdExchangeColumns = [
  {
    name: 'id',
    header: 'ID'
  },
  {
    name: 'pageName',
    header: '지면명'
  },
  {
    name: 'pageNumber',
    header: '지면번호'
  },
  {
    name: 'exchangeNumber',
    header: '연동사'
  },
  {
    name: 'request',
    header: '요청수',
  },
  {
    name: 'impression',
    header: '노출수(점유율)',
  },
  {
    name: 'clicks',
    header: '클릭수',
  },
  {
    name: 'clickRate',
    header: '클릭율',
  },
  {
    name: 'expense',
    header: '비용(CPC)',
  },
  {
    name: 'proceed',
    header: '수익금',
  },
  {
    name: 'request2',
    header: '요청수',
  },
  {
    name: 'impression2',
    header: '노출수(점유율)',
  },
  {
    name: 'clicks2',
    header: '노출수',
  },
  {
    name: 'clickRate2',
    header: '클릭율',
  },
]
export const reportsAdExchange = [
  {
    id: 0,
    pageName: '지면명',
    pageNumber: '123123',
    exchangeNumber: 2,
    request : 22,
    impression : "",
    clicks : "",
    clickRate : "",
    expense : "",
    proceed : "",
    request2 : 22,
    impression2 : "",
    clicks2 : "",
    clickRate2 : "",
  }
]