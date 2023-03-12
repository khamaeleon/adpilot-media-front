import {dateFormat, decimalFormat} from "../../common/StringUtils";
import {getToDay} from "../../common/DateUtils";

export const accountInfoRevenue = { // 정산 수익 현황
  "userId" : "nate9988",
  "revenueAmount" : 0,
  "revenueBalance" : 0,
  "totalCarryOver" : 0,
  "invoiceRequestAmount" : 0,
  "examinedCompletedAmount" : 0,
  "paymentCompletedAmount" : 0
}

export const accountProfile = { // 매체 계정 프로필 조회
  "userId" : "nate9988",
  "managerName" : "manger",
  "managerEmail" : "manager@mcorpor.com",
  "managerPhone" : "010-1234-5678",
  "bankAccountNumber" : "1111",
  "bankType" : "123",
  "accountHolder" : "hcson",
  "passbookCopy" : "/test/",
  "grossCalculate" : 1.0,
  "businessName" : "mco",
  "businessNumber" : "123455",
  "businessLicenseCopy" : "copy",
  "business" : "컴퓨터",
  "businessType" : "좋아!",
  "ceoName" : "hcson",
  "address" : "seoul",
  "taxYn" : true,
  "mediaType" : "AGENCY"
}

export const accountCreateInvoice = { // 정산 이력 추가
  "userId" : "nate9988",
  "invoiceStatus" : "INVOICE_REQUEST",
  "requesterId" : "hcson",
  "requestAmount" : 0,
  "etc" : ""
}

export const accountUpdateInvoiceStatus = { // 정산 이력 수정
  "userId" : "nate9988",
  "invoiceId" : 1,
  "invoiceStatus" : "REJECT"
}

export const accountInfoColumns = [
  {
    name: 'statsMonth',
    header: '연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestCount',
    header: '요청수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'responseCount',
    header: '응답수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'mediaExposureCount',
    header: '노출수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickCount',
    header: '클릭수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickRate',
    header: '클릭률',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'pct'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'costAmount',
    header: '비용',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'revenue',
    header: '수익금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'completedPaymentAmount',
    header: '지급 완료',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'totalCarryOverAmount',
    header: '이월금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  }
]

export const accountInfoSetting = {
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

export const accountInfoList = [
  {
    "statsMonth" : '2023-1',
    "userId" : '',
    "requestCount" : 0,
    "responseCount" : 0,
    "mediaExposure_count" : 0,
    "clickCount" : 0,
    "clickRate": 0,
    "costAmount" : 0,
    "revenue" : 0,
    "requestAmount" : 0,
    "totalCarryOverAmount" : 0,
    "scheduledPaymentAmount" : 0,
    "completedPaymentAmount" : 0
  }
]

export const searchAccountParams = {// 정산 이력 조회
  startAt: dateFormat(getToDay(), 'YYYY-MM'),
  endAt: dateFormat(getToDay(), 'YYYY-MM'),
  statusList: ['INVOICE_REQUEST', 'CARRY_OVER_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE'],
  searchType: 'DEFAULT',
  search: ''
}

export const searchAccountChecked = {
  ALL : true,
  INVOICE_REQUEST : true,
  CARRY_OVER_REQUEST : true,
  EXAMINED_COMPLETED : true,
  REJECT : true,
  PAYMENT_COMPLETED : true,
  WITHHELD_PAYMENT : true,
  REVENUE_INCREASE : true,
  REVENUE_DECREASE : true,
}

export const searchAccountType = [
  {id: "1", value: "DEFAULT", label: "전체"},
  {id: "2", value: "MEDIA_NAME", label: "매체명"},
  {id: "3", value: "MEDIA_ID", label: "매체 아이디"},
  {id: "4", value: "REQUESTER_ID", label: "신청 아이디"},
]

const status = {
  "ALL" : "전체",
  "INVOICE_REQUEST" :"정산 신청",
  "CARRY_OVER_REQUEST" :"이월 신청",
  "EXAMINED_COMPLETED" :"심사 완료",
  "REJECT" :"반려",
  "PAYMENT_COMPLETED" : "지급 완료",
  "WITHHELD_PAYMENT" :"지급 보류",
  "REVENUE_INCREASE" : "수익 증가",
  "REVENUE_DECREASE" :"수익 감소",
}

export const accountHistoryColumns = [
  {
    name: 'recordMonth',
    header: '정산연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'status',
    header: '신청 상태',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <>{status[value]}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'userId',
    header: '매체 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
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


export const accountHistoryData =[]


export const accountHistorySetting = {
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