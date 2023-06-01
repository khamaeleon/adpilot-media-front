/* 기간별보고서 상태관리 */
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import {defaultCondition} from "./common";

export const reportsStaticsAtom = atomWithReset({
  pageSize: 30,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getToDay(),
  productType: null,
  targetingMethod: null,
  exchangeSearchType: null,
  deviceType: null,
  agentType: defaultCondition.agentType.map(obj => obj.value),
  sortType: null
})
/* 기간별보고서 컬럼 */
export const reportsStaticsAllColumn = [
  {name: 'historyDate', header: '통계일'},
  {name: 'requestCount', header: '요청수', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'totalClickCount', header: '총 클릭 수', defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭률', sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    render: ({data}) => {
      let value = data?.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    render: ({data}) => {
      let value = data?.costAmount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  }
]

/* 기간별보고서 결과 리스트 */
export const reportsStaticsAll = atom([])
