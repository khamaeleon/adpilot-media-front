/* 기간별보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {decimalFormat} from "../../../common/StringUtils";

export const reportsStaticsAtom = atomWithReset({
  pageSize: 30,
  currentPage: 1,
  searchStartDate: '2023-04-08',
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
  {name: 'requestCount', header: '요청수' , render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: 'responseCount', header: '응답수', render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'validClickCount', header: '클릭수', render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율', sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({data}) => <span>{decimalFormat(data.costAmount)}</span>},
  {name: 'proceedsAmount', header: '수익금', render: ({data}) => <span>{decimalFormat(data.proceedsAmount)}</span>},
  {name: 'clickCount', header: '총 클릭 수', render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>}
]

/* 기간별보고서 결과 리스트 */
export const reportsStaticsAll = atom([])