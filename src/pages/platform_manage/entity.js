import {LinkRef} from "../../components/table";
import {Link} from "react-router-dom";


export const mediaType = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "MEDIA", label: "직매체"},
  {id: "3", value: "AGENCY", label: "대행사"},
]
export const selectAccountUseInfo = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "IN_USE", label: "사용중"},
  {id: "3", value: "UNUSED", label: "미사용"},
]

export const searchAccountInfo = {
  selectMediaType: {id: "1", value: "ALL", label: "전체"},
  selectAdminType: {id: "1", value: "ALL", label: "전체"},
  selectSearchName: '',
  selectSearchAdminName: '',
  selectAccountUseYn: {id: "1", value: "ALL", label: "전체"}
}

/**
 * 어드민 관리 검색 파라미터
 * @type {{searchText: string, pageSize: number, currentPage: number}}
 */
export const searchAdminParams ={
  pageSize:1000,
  currentPage:1,
  searchText:''
}

/**
 * 어드민 등록 form
 * @type {{activeYn: string, password: string, phoneNumber: string, name: string, confirmPassword: string, email: string}}
 */
export const adminInfo = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  activeYn: 'Y'
}

export const columnAdminData =[
  {
    name: 'email',
    header: '아이디',
    render: (props) => {
      return (
        <Link to={'/board/platform2/detail'} state={{id: props.data.email}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'name',
    header: '담당자명',
  },
  {
    name: 'phoneNumber',
    header: '연락처',
  },
  {
    name: 'createdAt',
    header: '생성 일시',
  },
  {
    name: 'status',
    header: '사용 여부',
    render: ({value}) => {
      return (
        <>{value ==='NORMAL' ? "사용중" : "중지"}</>
      )
    }
  },
]

export const columnAdminSetting = {
  default: {
    textAlign: "center",
    value: {
      width: 90,
    }
  },
  setColumns: [
    {
      target: 0,
      value: {
        width: 300,
      },
    },
    {
      target: 1,
      value: {
        width: 100,
      },
    },
    {
      target: 2,
      value: {
        width: 200,
      },
    },
    {
      target: 3,
      value: {
        width: 200,
      },
    },
    {
      target: 4,
      value: {
        width: 100,
      }
    }
  ]
}


export const columnHistoryData = [
  {
    name: 'inventoryName',
    header: '지면명',
  },
  {
    name: 'mediaId',
    header: '지면코드',
  },
  {
    name: 'publication',
    header: '게재상태',
  },
  {
    name: 'eventConfig',
    header: '이벤트 설정',
  },
  {
    name: 'calculationConfig',
    header: '정산 설정',
  },
  {
    name: 'noExposedConfig',
    header: '대체광고',
  },
  {
    name: 'updateDate',
    header: '변경일시',
  },
  {
    name: 'userName',
    header: '변경자',
  }
]

export const columnHistorySetting = {
  default: {
    textAlign: "center",
    value: {
      width: 90,
    }
  },
  setColumns: [
    {
      target: 0,
      function: LinkRef("/board/platform3/detail"),
      value: {
        width: 300,
      },
    },
    {
      target: 1,
      value: {
        width: 100,
      },
    },
    {
      target: 2,
      value: {
        width: 100,
      },
    },
    {
      target: 3,
      value: {
        width: 500,
      },
    },
    {
      target: 5,
      value: {
        width: 100,
      },
    },
    {
      target: 7,
      value: {
        width: 100,
      },
    }
  ]
}

export const historyListInfo = [
  {
    inventoryName: '네이트 날개배너',
    mediaId: 'cho',
    publication: 'ON',
    eventConfig: '본상품 ON- 110% \n 장바구니 OFF-120% \n리턴매칭 ON-200%',
    calculationConfig: 'CPC-120',
    noExposedConfig: 'SCRIPT',
    updateDate: '20220101',
    userName: '조규홍'
  },
  {
    inventoryName: '디스패치 날개배너',
    mediaId: '213213',
    publication: 'ON',
    eventConfig: '본상품 ON- 110% \n 장바구니 OFF-120% \n리턴매칭 ON-200%',
    calculationConfig: 'CPC-120',
    noExposedConfig: 'SCRIPT',
    updateDate: '20220101',
    userName: '한란민'
  }
]

export const mediaSearchTypeByHistory = [
  {id: "1", value: "all", label: "전체"},
  {id: "4", value: "inventoryName", label: "지면명"},
  {id: "3", value: "mediaId", label: "아이디"},
  {id: "5", value: "inventoryCode", label: "지면코드"},
  {id: "3", value: "accountId", label: "변경자"}
]


export const searchHistoryParams = {
  eventType: true,
  eventTypeValue: true,
  calculationType: true,
  noExposedConfigType: true,
  searchStartDay: '2023-01-01',
  searchEndDay: '2023-01-01',
  searchType: {id: "4", value: "inventoryName", label: "지면명"},
  searchValue: ''
}

export const historyDetailInfo = {
  inventoryName: '네이트 중아',
  accountId: 'nate',
  inventoryCode: '213123',
  beforeUpdateDate: '2023-01-01',
  beforeUpdateName: '한란민',
  lastUpdateDate: '2023-01-01',
  lastUpdateName: '조규홍',
  beforeEventTypeConfig: [{eventType: '본상품', eventTypeValue: 100}],
  lastEventTypeConfig: [
    {
      eventType: '리턴매칭',
      eventTypeValue: 200
    },
    {
      eventType: '장바구니',
      eventTypeValue: 300
    },
  ],
  beforeCalculationConfig:{
    contractStartDate: '2023-01-01',
    calculationType: 'CPC',
    calculationTypeValue: 120,
    calculationEtc: ''
  },
  lastCalculationConfig:{
    contractStartDate: '2023-01-01',
    calculationType: 'RS',
    calculationTypeValue: 20,
    calculationEtc: '매체사 요청으로 인한 변경'
  },
  beforeNoExposedConfig:{
    noExposedConfigType: '대체이미지',
    noExposedConfigTypeValue:''
  },
  lastNoExposedConfig:{
    noExposedConfigType: 'URL',
    noExposedConfigTypeValue: 'https://nate.com'
  }
}

export const searchAdExChangeParams = {
  adExchangeConfig: true,
  paramsConfig: true,
  rankingConfig: true,
  searchStartDay: '2023-01-01',
  searchEndDay: '2023-01-01',
  searchType: {id: "4", value: "inventoryName", label: "지면명"},
  searchValue: ''
}

export const columnAdExChangeData = [
  {
    name: 'inventoryName',
    header: '지면명',
  },
  {
    name: 'inventoryCode',
    header: '지면코드',
  },
  {
    name: 'adExchangeConfig',
    header: '연동 설정',
  },
  {
    name: 'paramsConfig',
    header: 'KEY/VALUE 설정',
  },
  {
    name: 'rankingConfig',
    header: '송출 순서 설정',
  },
  {
    name: 'updateDate',
    header: '변경일시',
  },
  {
    name: 'userName',
    header: '변경자',
  }
]

export const adExChangeListInfo = [
  {
    inventoryName: '네이트 날개배너',
    inventoryCode: 'c123123ho',
    adExchangeConfig: 'ON',
    paramsConfig:  'key=zoneId \n value=23123',
    rankingConfig: 'YES',
    updateDate: '20220101',
    userName: '조규홍'
  },
  {
    inventoryName: '네이트 날개배너',
    inventoryCode: 'c12321823ho',
    adExchangeConfig: 'ON',
    paramsConfig: 'ke=:mediaKeyId \n value=23123',
    rankingConfig: 'YES',
    updateDate: '20220101',
    userName: '한란민'
  }
]

export const columnAdExChangeSetting = {
  default: {
    textAlign: "center"
  },
  setColumns: [
    {
      target: 0,
      function: LinkRef("/board/platform4/detail"),
      value: {
        width: 300,
      },
    },
    {
      target: 1,
      value: {
        width: 100,
      },
    },
    {
      target: 2,
      value: {
        width: 100,
      },
    },
    {
      target: 3,
      value: {
        width: 500,
      },
    },
    {
      target: 4,
      value: {
        width: 100,
      },
    },
    {
      target: 5,
      value: {
        width: 100,
      },
    }
  ]
}


export const adExChangeDetailInfo = {
  inventoryName: '네이트 중아',
  accountId: 'nate',
  inventoryCode: '213123',
  beforeUpdateDate: '2023-01-01',
  beforeUpdateName: '한란민',
  lastUpdateDate: '2023-01-01',
  lastUpdateName: '조규홍',
  adExChangeConfig: [
    {
      adExChangeName: '크리테오',
      beforePublication:false,
      lastPublication:true
    },
    {
      adExChangeName: '와이더플래닛',
      beforePublication:false,
      lastPublication:false
    },
  ],
 ParamsConfig: [
    {
      adExChangeName: '크리테오',
      beforeKey:'123123',
      beforeValue:'213213',
      lastKey:'123123',
      lastValue:'213213'
    },
    {
      adExChangeName: '와이더플래닛',
      beforeKey:'mediaKey',
      beforeValue:'213213',
      lastKey:'sdfsdf',
      lastValue:'2132sdfadf13'
    },
  ],
  rankingConfig: [
    {
      adExChangeName: '크리테오',
      beforeRankingValue:1,
      lastRankingValue:2,
    },
    {
      adExChangeName: '와이더플래닛',
      beforeRankingValue:2,
      lastRankingValue:3,
    },
    {
      adExChangeName: '아이엠',
      beforeRankingValue:3,
      lastRankingValue:1,
    }
  ]
}

