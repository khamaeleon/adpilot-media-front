/* 기본값 */


/* 검색 */
import moment from "moment/moment";

export const defaultCondition = {
  pageSize: 10,
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

export const reportsStaticsAtom = {
  pageSize: 10,
  currentPage:1,
  searchStartDate: moment().add(-8, 'd'),
  searchEndDate: moment(),
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType:  [],
  sortType: null
}

export const reportsMediaAtom = {
  pageSize: 10,
  currentPage:1,
  searchStartDate: moment().add(-8, 'd'),
  searchEndDate: moment(),
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType:  [],
  sortType: null
}

export const reportsInventoryAtom = {
  pageSize: 10,
  currentPage:1,
  searchStartDate: moment().add(-8, 'd'),
  searchEndDate: moment(),
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType:  [],
  sortType: null
}

export const reportsAdExchangeAtom = {
  pageSize: 10,
  currentPage:1,
  searchStartDate: moment().add(-8, 'd'),
  searchEndDate: moment(),
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType:  [],
  sortType: null
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
  "totalPages" : 1,
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
export const reportsStaticsMediaColumn = [
  {
    name: 'accountId',
    header: '지면 아이디',
  },
  {
    name: 'siteName',
    header: '지면 명'
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
]

export const reportsStaticsMedia = {
  "totalCount" : 59,
  "totalPages" : 1,
  "currentPage" : 1,
  "rows" : [
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "8727222f4-98d8-8f4-15f5c4e50c80",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "878932487238",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "878987234538",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "872348987238",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "87898723238",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "878987234238",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "878987232348",
      "siteName": "컴퍼니"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "accountId" : "878987234238",
      "siteName": "컴퍼니"
    }
  ]
}

export const reportsStaticsInventoryByMediaColumn = [
  {
    name: 'inventoryId',
    header: '지면아이디',
  },
  {
    name: 'inventoryName',
    header: '지면명',
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
]

export const reportsStaticsInventoryByMedia = {
  "totalCount" : 59,
  "totalPages" : 1,
  "currentPage" : 1,
  "rows" : [
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "inventoryId" : "15f5c4e50c80",
      "inventoryName": "지면이름"
    },
    {
      "requestCount": 95331000,
      "responseCount": 83516000,
      "exposureCount": 5673000,
      "clickCount": 1865000,
      "costAmount": 9000,
      "proceedsAmount": 9000,
      "inventoryId" : "15f5c4e50c80",
      "inventoryName": "지면이름"
    },
  ]
}
export const reportsStaticsInventoryColumn = [
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

export const reportsStaticsInventory = {
  "totalCount" : 59,
  "totalPages" : 1,
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
export const reportsStaticsAdExchangeColumn = [
  {name: "inventoryName", header: "지면명"},
  {name: "inventoryId", header: "지면번호"},
  {name: "exchangePlatformType", header: "연동사"},
  {name: "countByExchangePlatform", header: "연동사수"},
  {name: "requestCount", header: "요청수", group:"defaultData"},
  {name: "exposureCount", header: "노출수", group:"defaultData"},
  {name: "clickCount", header: "클릭수", group:"defaultData"},
  {name: "requestCountOfPlatform", header: "요청수", group:"platformData"},
  {name: "exposureCountOfPlatform", header: "노출수", group:"platformData"},
  {name: "clickCountOfPlatform", header: "클릭수", group:"platformData"},
  {name: "proceedsAmountOfPlatform", header: "수익금", group:"platformData"},
]

export const reportsStaticsAdExchange = {
  "totalCount" : 59,
  "totalPages" : 1,
  "currentPage" : 1,
  "rows" : [
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": "CRITEO",
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
    {
      "inventoryId": "asdfadsfasddfasdfafasf",
      "inventoryName": "지면이름 0",
      "exchangePlatformType": null,
      "countByExchangePlatform": 2,
      "requestCountOfPlatform": 1200,
      "exposureCountOfPlatform": 9000,
      "clickCountOfPlatform": 89,
      "proceedsAmountOfPlatform": 1000,
      "requestCount": 1000,
      "exposureCount": 1000,
      "clickCount": 100
    },
  ]
}