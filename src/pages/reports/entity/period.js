/* 기간별보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";

export const reportsStaticsAtom = atom({
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
/* 기간별보고서 컬럼 */
export const reportsStaticsAllColumn = [
  {name: 'historyDate', header: '통계일'},
  {name: 'requestCount', header: '요청수'},
  {name: 'responseCount', header: '응답수'},
  {name: 'exposureCount', header: '노출수'},
  {name: 'clickCount', header: '클릭수'},
  {
    name: 'clickRate', header: '클릭율', sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용'},
  {name: 'proceedsAmount', header: '수익금'},
  {name: 'validClickCount', header: '총 클릭 수'}
]

/* 기간별보고서 결과 리스트 */
export const reportsStaticsAll = atom([])