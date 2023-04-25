/* 외부연동수신보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {decimalFormat} from "../../../common/StringUtils";

export const reportsAdExchangeAtom = atomWithReset({
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

/* 외부연동수신보고서 리스트 컬럼 */
export const reportsStaticsAdExchangeColumn = [
  {name: "inventoryName", header: "지면명", minWidth: 200},
  {name: "inventoryId", header: "지면번호"},
  {name: "exchangePlatformType", header: "연동사", sortable: false},
  {name: "countByExchangePlatform", header: "연동사수", sortable: false},
  {name: "requestCount", header: "요청수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: "exposureCount", header: "노출수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: "validClickCount", header: "클릭수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율', group: "defaultData",sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && ((data.validClickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: "requestCountOfPlatform", header: "요청수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.requestCountOfPlatform)}</span>},
  {name: "exposureCountOfPlatform", header: "노출수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.exposureCountOfPlatform)}</span>},
  {name: "clickCountOfPlatform", header: "클릭수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.clickCountOfPlatform)}</span>},
  {
    name: 'clickRateOfPlatform', header: '클릭율', group: "platformData",sortable: false,
    render: ({data}) =>
      <span>{data.clickCountOfPlatform && data.exposureCountOfPlatform && ((data.clickCountOfPlatform / data.exposureCountOfPlatform) * 100).toFixed(2)}%</span>
  },
  {name: "revenueAmountOfPlatform", header: "수익금", group: "platformData", render: ({data}) => <span>{decimalFormat(data.revenueAmountOfPlatform)}</span>},
]

/* 외부연동수신보고서 아코디언 리스트 결과 */
export const reportsStaticsAdExchange = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})

/* 외부연동수신보고서 아코디언 컬럼 */
export const reportsStaticsAdExchangeByInventoryColumn = [
  {name: "inventoryName", header: "지면명", sortable: false, minWidth: 200},
  {name: "inventoryId", header: "지면번호", sortable: false},
  {
    name: "exchangePlatformType", header: "연동사", sortable: false,
    render: ({data}) =>  <span>{data.exchangePlatformType.label}</span>
  },
  {name: "requestCount", header: "요청수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: "exposureCount", header: "노출수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: "validClickCount", header: "클릭수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율', group: "defaultData",sortable: false,
    render: ({data}) => <span>{((data.validClickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: "requestCountOfPlatform", header: "요청수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.requestCountOfPlatform)}</span>},
  {name: "exposureCountOfPlatform", header: "노출수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.exposureCountOfPlatform)}</span>},
  {name: "clickCountOfPlatform", header: "클릭수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.clickCountOfPlatform)}</span>},
  {
    name: 'clickRateOfPlatform', header: '클릭율', group: "platformData", sortable: false,
    render: ({data}) => <span>{((data.clickCountOfPlatform / data.exposureCountOfPlatform) * 100).toFixed(2)}%</span>
  },
  {name: "revenueAmountOfPlatform", header: "수익금", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.revenueAmountOfPlatform)}</span>},
]

/* 외부연동수신보고서 아코디언 리스트 결과 */
export const reportsStaticsAdExchangeByInventory = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})