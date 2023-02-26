import {LinkRef} from "../../components/table";

export const reportsAccountColumns = [
  {
    name: 'period',
    header: '연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'request',
    header: '요청수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'require',
    header: '응답수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'impression',
    header: '노출수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'clicks',
    header: '클릭수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'clickRate',
    header: '클릭율',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'expense',
    header: '비용',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'proceed',
    header: '수익금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'payAgent',
    header: '정산 상태',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'carryOver',
    header: '이월금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  }
]

export const reportsAccountSetting = {
  default: {
    textAlign: "center",

  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    },
    {
      target: 1,
      value: {}
    }
  ]
}

export const reportsAccount = [
  {
    period : "2023.02",
    request : 100,
    require : "21",
    impression : "345",
    clicks : "5",
    clickRate : "80",
    expense : "40",
    proceed : "45",
    payAgent : "123",
    carryOver : "324",
  }
]

export const searchAccountHistoryParams = {
  calculationPropose: true,
  carryPropose: true,
  confirm: true,
  confirmCancel: true,
  paymentComplete: true,
  paymentHold: true,
  revenueIncrease: true,
  revenueDecrease: true,
  searchStartDay: '2023-01-01',
  searchEndDay: '2023-01-01',
  searchType: {id: "4", value: "inventoryName", label: "지면명"},
  searchValue: ''
}

export const accountHistoryListInfo =[
  {
    period : "2023.02",
    proposeState:'정산 신청',
    mediaName:'중앙일보',
    mediaId:'Center245',
    requestId:'Center245',
    amount:'1,000,000원',
    updateDate:'2022.01.01',
    etc:'영업 담당자 협의 완료',
  },
  {
    period : "2023.01",
    proposeState:'반려',
    mediaName:'중앙일보2',
    mediaId:'Center245',
    requestId:'Center245',
    amount:'1,000,000원',
    updateDate:'2022.01.01',
    etc:'영업 담당자 협의 완료',
  }
]

export const mediaSearchTypeByHistory =[
  {id: "1", value: "all", label: "전체"},
  {id: "4", value: "inventoryName", label: "지면명"},
  {id: "3", value: "mediaId", label: "아이디"},
  {id: "5", value: "inventoryCode", label: "지면코드"},
  {id: "3", value: "accountId", label: "변경자"}
]

export const accountHistoryData = [
  {
    name: 'period',
    header: '정산연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'proposeState',
    header: '신청 상태',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'mediaName',
    header: '매체명',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'mediaId',
    header: '매체 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestId',
    header: '신청 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'amount',
    header: '신청 금액',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'updateDate',
    header: '상태 변경일',
    maxWidth: 180,
    resizeable: false,
    defaultFlex: 2
  },
  {
    name: 'etc',
    header: '비고',
    maxWidth: 447,
    resizeable: false,
    defaultFlex: 3
  }
]

export const accountHistorySetting = {
  default: {
    textAlign: "center",
  },
  setColumns: [
    {
      target: 0,
      function: LinkRef("/board/platform3/detail"),
      value: {
      },
    },
    {
      target: 1,
      value: {
      },
    },
    {
      target: 2,
      value: {
      },
    },
    {
      target: 3,
      value: {
      },
    },
    {
      target: 4,
      value: {
      },
    },
    {
      target: 5,
      value: {
      },
    },
    {
      target: 6,
      value: {
      },
    },
    {
      target: 6,
      value: {
      },
    }
  ]
}