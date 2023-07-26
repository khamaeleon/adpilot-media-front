import {
  dateFormat,
  decimalFormat,
  numberToFixedFormat
} from "../../common/StringUtils";
import {getToDay} from "../../common/DateUtils";
import {atom} from "jotai";
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

export const accountProfile = atom(null) // 매체 계정 프로필 조회

export const accountCreateInvoice = { // 정산 이력 추가
  username : "",
  invoiceStatus : "",
  requesterId : "",
  requestAmount : 0,
  etc : ""
}

export const accountInfoColumns = [
  {
    name: 'statisticsMonth',
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
    name: 'exposureCount',
    header: '노출수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'validClickCount',
    header: '클릭수',
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 100,
    maxWidth: 100,
    render: ({ data })=> <p className={'pct'}>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}</p>,
  },
  {
    name: 'costAmount',
    header: '비용',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'revenueAmount',
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

export const accountInfoTable = atom([])

export const accountStatus =  [ // 신청 상태
  {value:'INVOICE_REQUEST', label:'정산 신청' },
  {value:'EXAMINED_COMPLETED', label:'심사 완료' },
  {value:'REJECT', label:'반려' },
  {value:'PAYMENT_COMPLETED', label:'지급 완료' },
  {value:'WITHHELD_PAYMENT', label:'지급 보류' },
  {value:'REVENUE_INCREASE', label:'정산금 지급' },
  {value:'REVENUE_DECREASE', label:'정산금 차감' },
]

export const searchAccountParams = { // 정산 관리 검색 params
  startAt: dateFormat(getToDay(), 'YYYY-MM'),
  endAt: dateFormat(getToDay(), 'YYYY-MM'),
  statusList: accountStatus.map(obj => obj.value),
  searchType: null,
  search: ''
}

export const searchAccountType = [
  {id: "0", value: null, label: "전체"},
  {id: "1", value: "MEDIA_NAME", label: "매체명"},
  {id: "2", value: "MEDIA_ID", label: "매체 아이디"},
  {id: "3", value: "REQUESTER_ID", label: "신청 아이디"},
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
    render: ({ value })=> {
      let label = accountStatus.find(item => item.value === value).label
      return <>{label}</>
    }
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
    render: ({ value })=> {
      let label = accountStatus.find(item => item.value === value).label
      return <>{label}</>
    }
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
    header: () => {
      return(
        <div><p>그로스 정산% /</p><p>그로스 정산금</p></div>
      )
    },
    width: 135,
    render: ({data}) => {
      return (
        <>
          <p>{data.grossCalculate}% /</p>
          <p className={'won'}>{decimalFormat(data?.grossSettlement)}</p>
        </>
      )
    }
  },
  {
    name: 'grossFee',
    header: '그로스 수수료',
    width: 130,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    width: 120,
  },
  {
    name: 'etc',
    header: '비고',
    width: 50,
    sortable: false,
    render: ({ value, cellProps }) => {
      return <Icon icon={'memo'} value={value} cellProps={cellProps}/>
    }
  }
]


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
    render: ({ value })=> {
      let label = accountStatus.find(item => item.value === value).label
      return <>{label}</>
    }
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
  {id: "1", value: 10, label: "10%"},
  {id: "2", value: 20, label: "20%"},
  {id: "3", value: 30, label: "30%"},
  {id: "4", value: 40, label: "40%"},
]

/*은행 리스트 테스트 값 */
export const refundRequestData = {
  bankType: [
    {key: "1", value: 'KDB_BANK', label: 'KDB산업은행'},
    {key: "2", value: 'IBK_BANK', label: 'IBK기업은행'},
    {key: "3", value: 'KOOKMIN_BANK', label: '국민은행'},
    {key: "4", value: 'KEB_BANK', label: 'KEB하나은행'},
    {key: "5", value: 'SUHYUP_BANK', label: '수협'},
    {key: "6", value: 'NONGHYUP_BANK', label: '농협'},
    {key: "7", value: 'REGIONAL_NONGHYUP_BANK', label: '농협중앙회'},
    {key: "8", value: 'WOORI_BANK', label: '우리은행'},
    {key: "9", value: 'SC_BANK', label: 'SC제일은행'},
    {key: "10", value: 'SHINHAN_BANK', label: '신한은행'},
    {key: "11", value: 'CITY_BANK', label: '시티은행'},
    {key: "12", value: 'DAEGU_BANK', label: '대구은행'},
    {key: "13", value: 'BUSAN_BANK', label: '부산은행'},
    {key: "14", value: 'GWANGJU_BANK', label: '광주은행'},
    {key: "15", value: 'JEJU_BANK', label: '제주은행'},
    {key: "16", value: 'JEONBUK_BANK', label: '전북은행'},
    {key: "17", value: 'GYEONGNAM_BANK', label: '경남은행'},
    {key: "18", value: 'KFCC_BANK', label: '새마을금고'},
    {key: "19", value: 'SHINHYUP_BANK', label: '신협'},
    {key: "20", value: 'FSB_BANK', label: '저축은행중앙회'},
    {key: "21", value: 'NFCF_BANK', label: '산립조합중앙회'},
    {key: "22", value: 'EPOST_BANK', label: '우체국'},
    {key: "23", value: 'HANA_BANK', label: '하나은행'},
    {key: "24", value: 'K_BANK', label: '케이뱅크'},
    {key: "25", value: 'KAKAO_BANK', label: '카카오뱅크'},
    {key: "26", value: 'TOSS_BANK', label: '토스뱅크'},
  ],
  sortType: null
}
