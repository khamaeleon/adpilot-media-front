import {LinkRef} from "../../components/table";
import {atom} from "jotai";
import {decimalFormat} from "../../common/StringUtils";

export const accountInfoRevenue = { // 정산 수익 현황
  "user_id" : "nate9988",
  "revenue_amount" : 0,
  "revenue_balance" : 0,
  "total_carry_over" : 0,
  "invoice_request_amount" : 0,
  "examined_completed_amount" : 0,
  "payment_completed_amount" : 0
}

export const accountProfile = { // 매체 계정 프로필 조회
  "user_id" : "nate9988",
  "manager_name" : "manger",
  "manager_email" : "manager@mcorpor.com",
  "manager_phone" : "010-1234-5678",
  "bank_account_number" : "1111",
  "bank_type" : "123",
  "account_holder" : "hcson",
  "passbook_copy" : "/test/",
  "gross_calculate" : 1.0,
  "business_name" : 'Mcorporation',
  "business_number" : "123455",
  "business_license_copy" : "copy",
  "business" : "컴퓨터",
  "business_type" : "좋아!",
  "ceo_name" : "홍길동",
  "address" : "seoul",
  "tax_yn" : true,
  "media_type" : "AGENT"
}

export const accountCreateInvoice = { // 정산 이력 추가
  "user_id" : "nate9988",
  "invoice_status" : "INVOICE_REQUEST",
  "requester_id" : "nate9988",
  "request_amount" : 0,
  "etc" : ""
}

export const accountUpdateInvoiceStatus = { // 정산 이력 수정
  "user_id" : "nate9988",
  "invoice_id" : 1,
  "invoice_status" : "REJECT"
}

export const accountHistoryTableParams = atom({ // 정산 이력 조회
  'start_at': '2023-02',
  'end_at': '2023-03',
  "status" : null,
})

export const accountInfoColumns = [
  {
    name: 'stats_month',
    header: '연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'request_count',
    header: '요청수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'response_count',
    header: '응답수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'media_exposure_count',
    header: '노출수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'click_count',
    header: '클릭수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'click_rate',
    header: '클릭률',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'pct'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'cost_amount',
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
    name: 'completed_payment_amount',
    header: '지급 완료',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'total_carry_over_amount',
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
    "stats_month" : '2023-1',
    "user_id" : '',
    "request_count" : 0,
    "response_count" : 0,
    "media_exposure_count" : 0,
    "click_count" : 0,
    "clickRate": 0,
    "click_rate": 0,
    "cost_amount" : 0,
    "revenue" : 0,
    "request_amount" : 0,
    "total_carry_over_amount" : 0,
    "scheduled_payment_amount" : 0,
    "completed_payment_amount" : 0
  }
]

export const searchAccountHistoryParams = {
  invoiceRequest : true,
  carryOverRequest : true,
  examinedCompleted: true,
  reject : true,
  paymentCompleted : true,
  withheldPayment : true,
  revenueIncrease : true,
  revenueDecrease: true,
  searchStartDay: '2023-01-01',
  searchEndDay: '2023-01-01',
  searchType: {id: "4", value: "inventoryName", label: "지면명"},
  searchValue: ''
}

export const accountHistoryColumns = [
  {
    name: 'record_month',
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
    defaultFlex: 1
  },
  {
    name: 'media_name',
    header: '매체명',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'user_id',
    header: '매체 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requester_id',
    header: '신청 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'request_amount',
    header: '신청 금액',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'update_at',
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


export const accountHistoryData =[
  {
    "id" : 1,
    "record_month" : [ 2023, 1 ],
    "media_name" : "nate",
    "user_id" : "nate9988",
    "requester_id" : "hcson",
    "status" : "EXAMINED_COMPLETED",
    "revenue_amount" : 10,
    "request_amount" : 1,
    "tax_yn" : "Y",
    "surtax_amount" : 1,
    "revenue_balance" : 9,
    "gross_calculate" : 0.1,
    "gross_settlement" : 400000,
    "gross_fee" : 1000000,
    "update_at" : [ 2023, 3, 2 ],
    "etc" : "심사 완료"
  }
]

export const mediaSearchTypeByHistory =[
  {id: "1", value: "all", label: "전체"},
  {id: "4", value: "inventoryName", label: "지면명"},
  {id: "3", value: "mediaId", label: "아이디"},
  {id: "5", value: "inventoryCode", label: "지면코드"},
  {id: "3", value: "accountId", label: "변경자"}
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