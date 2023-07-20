/* 매체별보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {ReportsMediaModal} from "../Media";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import {defaultCondition} from "./common";
import {Icon} from "../../../components/table";

export const reportsMedia = {
  pageSize: 30,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  targetingType: null,
  exchangeSearchType: null,
  deviceType: null,
  agentType: defaultCondition.agentType.map(obj => obj.value),
  sortType: null
}

/* 매체별 상세보고서 상태관리 */
export const reportsMediaDetailAtom = {
  pageSize: 30,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  targetingType: null,
  exchangeSearchType: null,
  deviceType: null,
  agentType: defaultCondition.agentType.map(obj => obj.value),
  sortType: null
}

/* 매체별보고서 컬럼 */
export const reportsStaticsMediaColumn = [
  {
    name: 'siteName', header: '매체명', minWidth: 150,
    render: ({value, data}) => {
      return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>{value}</div>
          <ReportsMediaModal userId={data.userId} siteName={value}/>
        </div>
      )
    }
  },
  {name: 'userId', header: '아이디'},
  {name: 'requestCount', header: '요청수' ,type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수',type: 'number', defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭률', sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    type: 'number',
    render: ({data}) => {
      let value = data?.costAmount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    type: 'number',
    render: ({data}) => {
      let value = data?.costAmount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },

  {name: 'totalClickCount', header: '총 클릭 수',type: 'number', defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
]


/* 매체별보고서 아코디언 컬럼 */
export const reportsStaticsInventoryByMediaColumn = [
  {name: 'inventoryName', header: '지면명', sortable: false},
  {name: 'inventoryId', header: '지면아이디', sortable: false, render: ({value, cellProps}) => <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>},
  {name: 'requestCount', header: '요청수', type: 'number', sortable: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number', sortable: false, defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', sortable: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수', type: 'number', sortable: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'totalClickCount', header: '총 클릭 수',type: 'number', defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭률',type: 'number', sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용',type: 'number', sortable: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금',type: 'number', sortable: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    type: 'number',
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? (data.costAmount / data.validClickCount) : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    type: 'number',
    render: ({data}) => {
      let value = data.exposureCount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
]

/* 매체별보고서 상세 컬럼 */
export const reportsStaticsMediaDetailColumn = [
  {name: 'historyDate', header: '통계일'},
  {name: 'requestCount', header: '요청수', type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수', defaultVisible: false, type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'totalClickCount', header: '총 클릭 수',type: 'number', defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭률', sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    type: 'number',
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;

      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    type: 'number',
    render: ({data}) => {
      let value = data?.costAmount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  }
]
/* 매체별보고서 아코디언 결과 */
export const reportsStaticsMediaDetail = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})