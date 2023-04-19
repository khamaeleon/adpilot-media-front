/* 매체별보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {ReportsMediaModal} from "../Media";
import {decimalFormat} from "../../../common/StringUtils";

export const reportsMediaAtom = atomWithReset({
  pageSize: 30,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
  sortType: null
})

/* 매체별 상세보고서 상태관리 */
export const reportsMediaDetailAtom = atomWithReset({
  pageSize: 30,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
  sortType: null
})

/* 매체별보고서 컬럼 */
export const reportsStaticsMediaColumn = [
  {name: 'userId', header: '지면 아이디'},
  {
    name: 'siteName', header: '지면 명', minWidth: 150,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>{value}</div>
          <ReportsMediaModal userId={cellProps.data.userId}/>
        </div>
      )
    }
  },
  {name: 'requestCount', header: '요청수', type: 'number', render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number', render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'clickCount', header: '클릭수', type: 'number', render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({data}) => <span className={'won'}>{decimalFormat(data.costAmount)}</span>},
  {name: 'revenueAmount', header: '수익금', render: ({data}) => <span  className={'won'}>{decimalFormat(data.revenueAmount)}</span>},
]
/* 매체별보고서 리스트 결과 */
export const reportsStaticsMedia = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})

/* 매체별보고서 아코디언 컬럼 */
export const reportsStaticsInventoryByMediaColumn = [
  {name: 'inventoryName', header: '지면명', sortable: false},
  {name: 'inventoryId', header: '지면아이디', sortable: false},
  {name: 'requestCount', header: '요청수', type: 'number', sortable: false, render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number', sortable: false, render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', sortable: false, render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'clickCount', header: '클릭수', type: 'number', sortable: false, render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', sortable: false, render: ({data}) => <span>{decimalFormat(data.costAmount)}</span>},
  {name: 'revenueAmount', header: '수익금', sortable: false, render: ({data}) => <span>{decimalFormat(data.revenueAmount)}</span>}
]
/* 매체별보고서 아코디언 결과 */
export const reportsStaticsInventoryByMedia = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})

/* 매체별보고서 상세 컬럼 */
export const reportsStaticsMediaDetailColumn = [
  {name: 'historyDate', header: '통계 일'},
  {name: 'validClickCount', header: '총 클릭수'},
  {name: 'requestCount', header: '요청수', type: 'number', render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number', render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'clickCount', header: '클릭수', type: 'number', render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({data}) => <span>{decimalFormat(data.costAmount)}</span>},
  {name: 'revenueAmount', header: '수익금', render: ({data}) => <span>{decimalFormat(data.revenueAmount)}</span>},
]
/* 매체별보고서 아코디언 결과 */
export const reportsStaticsMediaDetail = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})