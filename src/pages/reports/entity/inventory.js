/* 지면별보고서 상태관리 */
import {atomWithReset} from "jotai/utils";
import {atom} from "jotai";
import {getThisMonth} from "../../../common/DateUtils";
import {ReportsInventoryModal} from "../Page";
import {decimalFormat} from "../../../common/StringUtils";

export const reportsInventoryAtom = atomWithReset({
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
/* 지면별 상세보고서 상태관리 */
export const reportsInventoryDetailAtom = atomWithReset({
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

/* 지면별보고서 컬럼 */
export const reportsStaticsInventoryColumn = [
  {
    name: 'inventoryName', header: '지면명', minWidth: 220,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{whiteSpace: "break-spaces"}}>{value}</div>
          <ReportsInventoryModal inventoryId={cellProps.data.inventoryId}/>
        </div>
      )
    }
  },
  {name: 'inventoryId', header: '지면아이디'},
  {name: 'responseCount', header: '응답수', render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'clickCount', header: '클릭수', render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({data}) => <span>{decimalFormat(data.costAmount)}</span>},
  {name: 'proceedsAmount', header: '수익금', render: ({data}) => <span>{decimalFormat(data.proceedsAmount)}</span>}
]
/* 지면별보고서 리스트 결과 */
export const reportsStaticsInventory = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})
/* 지면별보고서 모달 컬럼 */
export const reportsStaticsInventoryDetailColumn = [
  {name: 'inventoryName', header: '지면명'},
  {name: 'inventoryId', header: '지면아이디'},
  {name: 'requestCount', header: '요청수', type: 'number', render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number', render: ({data}) => <span>{decimalFormat(data.responseCount)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number', render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: 'validClickCount', header: '클릭수', type: 'number', render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({data}) => <span>{decimalFormat(data.costAmount)}</span>},
  {name: 'proceedsAmount', header: '수익금', render: ({data}) => <span>{decimalFormat(data.proceedsAmount)}</span>},
  {name: 'clickCount', header: '총 클릭 수(유효클릭)', render: ({data}) => <span>{decimalFormat(data.clickCount)}</span>}
]
/* 지면별보고서 모달 리스트 결과 */
export const reportsStaticsInventoryDetail = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})