/* 외부연동수신보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {decimalFormat} from "../../../common/StringUtils";
import {Icon} from "../../../components/table";

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
  {name: "inventoryId", header: "지면번호", render: ({value, cellProps}) => <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>},
  {name: "countByExchangePlatform", header: "연동사수", sortable: false},
  {name: "requestCount", header: "요청수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: "exposureCount", header: "노출수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: "validClickCount", header: "클릭수", group: "defaultData", render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율', group: "defaultData",sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && ((data.validClickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: "requestCountByOther", header: "요청수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.requestCountByOther)}</span>},
  {name: "exposureCountByOther", header: "노출수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.exposureCountByOther)}</span>},
  {name: "clickCountByOther", header: "클릭수", group: "platformData", render: ({data}) => <span>{decimalFormat(data.clickCountByOther)}</span>},
  {
    name: 'clickRateCountByOther', header: '클릭율', group: "platformData",sortable: false,
    render: ({data}) =>
      <span>{data.clickCountByOther && data.exposureCountByOther && ((data.clickCountByOther / data.exposureCountByOther) * 100).toFixed(2)}%</span>
  },
  {name: "revenueAmountOfPlatform", header: "수익금", group: "platformData", render: ({data}) => <span>{decimalFormat(data.revenueAmountByOther)}</span>},
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
  {
    name: "exchangePlatformType", header: "연동사", sortable: false,
    render: ({data}) =>  <span>{data.exchangePlatformType}</span>
  },
  {name: "requestCount", header: "요청수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.requestCount)}</span>},
  {name: "exposureCount", header: "노출수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.exposureCount)}</span>},
  {name: "validClickCount", header: "클릭수", group: "defaultData", sortable: false, render: ({data}) => <span>{decimalFormat(data.validClickCount)}</span>},
  {
    name: 'clickRate', header: '클릭율', group: "defaultData",sortable: false,
    render: ({data}) => <span>{data.exposureCount != 0 ? ((data.validClickCount / data.exposureCount) * 100).toFixed(2): 0}%</span>
  },
  {name: "requestCountByOther", header: "요청수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.requestCountByOther)}</span>},
  {name: "exposureCountByOther", header: "노출수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.exposureCountByOther)}</span>},
  {name: "clickCountByOther", header: "클릭수", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.clickCountByOther)}</span>},
  {
    name: 'clickRateCountByOther', header: '클릭율', group: "platformData", sortable: false,
    render: ({data}) => <span>{data.exposureCountByOther != 0 ? ((data.clickCountByOther / data.exposureCountByOther) * 100).toFixed(2) : 0}%</span>
  },
  {name: "revenueAmountByOther", header: "수익금", group: "platformData", sortable: false, render: ({data}) => <span>{decimalFormat(data.revenueAmountByOther)}</span>},
]

/* 외부연동수신보고서 아코디언 리스트 결과 */
export const reportsStaticsAdExchangeByInventory = atom({
  "totalCount": 0,
  "totalPages": 0,
  "currentPage": 1,
  "rows": []
})