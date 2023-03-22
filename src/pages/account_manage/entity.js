import {dateFormat, decimalFormat} from "../../common/StringUtils";
import {getToDay} from "../../common/DateUtils";
import {atom} from "jotai/index";
import {Icon} from "../../components/table";

export const accountInfoRevenue = atom({ // 정산 수익 현황
  "username" : "",
  "revenueAmount" : 0,
  "revenueBalance" : 0,
  "totalCarryOver" : 0,
  "invoiceRequestAmount" : 0,
  "examinedCompletedAmount" : 0,
  "paymentCompletedAmount" : 0
})

export const accountProfile = atom({ // 매체 계정 프로필 조회
  "username" : "",
  "managerName" : "",
  "managerEmail" : "",
  "managerPhone" : "",
  "bankAccountNumber" : "",
  "bankType" : "",
  "accountHolder" : "",
  "passbookCopy" : "",
  "grossCalculate" : 0,
  "businessName" : "",
  "businessNumber" : "",
  "businessLicenseCopy" : "",
  "business" : "",
  "businessType" : "",
  "ceoName" : "",
  "address" : "",
  "taxYn" : 'Y',
  "mediaType" : ""
})

export const accountCreateInvoice = { // 정산 이력 추가
  username : "",
  invoiceStatus : "",
  requesterId : "",
  requestAmount : 0,
  etc : ""
}

export const accountInfoColumns = [
  {
    name: 'statsMonth',
    header: '연월',
    defaultWidth: 120,
    resizable: false,
  },
  {
    name: 'requestCount',
    header: '요청수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'responseCount',
    header: '응답수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'mediaExposureCount',
    header: '노출수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickCount',
    header: '클릭수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 100,
    maxWidth: 100,
    render: ({ value })=> <p className={'pct'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'costAmount',
    header: '비용',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'revenue',
    header: '수익금',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'completedPaymentAmount',
    header: '지급 완료',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'totalCarryOverAmount',
    header: '이월금',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  }
]

export const accountInfoSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    }
  ]
}

export const accountInfoList = [
  {
    "statsMonth" : '2023-1',
    "username" : '',
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
  statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE'],
  searchType: 'DEFAULT',
  search: ''
}

export const searchAccountType = [
  {id: "1", value: "DEFAULT", label: "전체"},
  {id: "2", value: "MEDIA_NAME", label: "매체명"},
  {id: "3", value: "MEDIA_ID", label: "매체 아이디"},
  {id: "4", value: "REQUESTER_ID", label: "신청 아이디"},
]
export const accountHistoryDataAtom = atom([])

export const accountHistoryColumns = [ //정산 이력 테이블
  {
    name: 'recordMonth',
    header: '정산연월',
    defaultWidth: 120,
    resizable: false,
  },
  {
    name: 'status',
    header: '신청 상태',
    minWidth: 120,
    maxWidth: 120,
    render: ({ value })=> <>{value.label}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    defaultFlex: 1,
  },
  {
    name: 'username',
    header: '매체 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    minWidth: 120,
    maxWidth: 120,
  },
  {
    name: 'etc',
    header: '비고',
    defaultFlex: 2,
  }
]

export const accountHistorySetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    }
  ]
}

export const accountUpdateInvoiceStatus = { // 정산 이력 수정
  invoiceIdList : [],
  invoiceStatus : "",
  etc : ""
}
export const accountConfirmColumns = [ //정산 심사 테이블
  {
    name: 'id',
    header: 'id',
    defaultVisible: false,
  },
  {
    name: 'recordMonth',
    header: '정산연월',
    width: 120,
  },
  {
    name: 'status',
    header: '신청 상태',
    width: 120,
    render: ({ value })=> <>{value.label}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
  },
  {
    name: 'username',
    header: '매체 아이디',
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
  },
  {
    name: 'revenueAmount',
    header: '수익금',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmount',
    header: '신청 금액(VAT별도)',
    width: 160,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmountVAT',
    header: '신청 금액(VAT포함)',
    width: 160,
    render: ({data}) => {
      let vat = data.taxYn === 'Y' ? data.requestAmount+(data.requestAmount/10): data.requestAmount;
      return (
        <span className={'won'}>{decimalFormat(vat)}</span>
      )
    }
  },
  {
    name: 'revenueBalance',
    header: '수익 잔액',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'taxYn',
    header: '과세 여부',
    width: 100,
    render: ({ value })=> value === 'Y' ? '과세' : '면세'
  },
  {
    name: 'grossCalculate',
    header: '그로스 정산% / 그로스 정산금',
    width: 100,
    render: ({data}) => {
      return (
        <>
          <p>{data.grossCalculate}% /</p>
          <p>{data?.grossSettlement}</p>
        </>
      )
    }
  },
  {
    name: 'grossFee',
    header: '그로스 수수료',
    width: 100,
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    width: 100,
  },
  {
    name: 'etc',
    header: '비고',
    defaultWidth: 60,
    render: ({ value, cellProps }) => {
      return <Icon icon={'script'} value={value} cellProps={cellProps}/>
    }
  }
]

export const accountConfirmSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 1,
      value: {
      }
    }
  ]
}

export const accountDataColumns = [ //정산 데이터 관리 테이블
  {
    name: 'recordMonth',
    header: '정산연월',
    defaultWidth: 120,
    resizable: false,
  },
  {
    name: 'status',
    header: '신청 상태',
    minWidth: 120,
    maxWidth: 120,
    render: ({ value })=> <>{value.label}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    defaultFlex: 1,
  },
  {
    name: 'username',
    header: '매체 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    minWidth: 120,
    maxWidth: 120,
  },
  {
    name: 'etc',
    header: '비고',
    defaultFlex: 2,
  }
]

export const accountDataSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      }
    }
  ]
}

export const grossCalculateOption = [
  {id: "1", value: 1.1, label: "1.1%"},
  {id: "2", value: 2.2, label: "2.2%"},
  {id: "3", value: 3.3, label: "3.3%"},
  {id: "4", value: 4.4, label: "4.4%"},
]