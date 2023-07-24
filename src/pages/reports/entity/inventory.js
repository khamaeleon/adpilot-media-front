/* 지면별보고서 상태관리 */
import {getThisMonth} from "../../../common/DateUtils";
import {ReportsInventoryModal} from "../Page";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import {defaultCondition} from "./common";
import {Icon} from "../../../components/table";

export const reportsInventory = {
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
/* 지면별 상세보고서 상태관리 */
export const reportsInventoryDetail = {
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
export const reportsUserStaticsInventoryColumn = [
  {
    name: 'inventoryName', header: '지면명', minWidth: 220,
    render: ({value, data}) => {
      return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
          <div className={'ellipsis'} style={{whiteSpace: "break-spaces"}}>{value}</div>
          <ReportsInventoryModal inventoryId={data.inventoryId} inventoryName={value}/>
        </div>
      )
    }
  },
  {name: 'inventoryId', header: '지면코드', render: ({value, cellProps}) => <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>},
  {name: 'requestCount', header: '요청수' ,type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number',render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
]
/* 지면별보고서 컬럼 */
export const reportsStaticsInventoryColumn = [
  {
    name: 'inventoryName', header: '지면명', minWidth: 220,
    render: ({value, data}) => {
      return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
          <div className={'ellipsis'} style={{whiteSpace: "break-spaces"}}>{value}</div>
          <ReportsInventoryModal inventoryId={data.inventoryId} inventoryName={value}/>
        </div>
      )
    }
  },
  {name: 'inventoryId', header: '지면코드', render: ({value, cellProps}) => <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>},
  {name: 'requestCount', header: '요청수' ,type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number',defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number',render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'totalClickCount', header: '총 클릭 수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수',type: 'number', render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭율',sortable: false,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금',type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    sortable: false,
    render: ({data}) => {
      let value = data?.costAmount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    sortable: false,
    render: ({data}) => {
      let value = data?.costAmount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  }
]

/* 지면별보고서 모달 컬럼 */
const columnWidth = {minWidth: 145}
export const reportsStaticsInventoryDetailColumn = [
  {name: 'historyDate', header: '통계일', minWidth: 103, maxWidth: 103, resizeable: false },
  {name: 'requestCount', header: '요청수' , type: 'number', columnWidth, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'responseCount', header: '응답수', type: 'number',defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'exposureCount', header: '노출수', type: 'number',columnWidth, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'validClickCount', header: '클릭수', type: 'number',columnWidth, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {name: 'totalClickCount', header: '총 클릭 수', type: 'number',defaultVisible: false, render: ({value}) => <span>{decimalFormat(value)}</span>},
  {
    name: 'clickRate', header: '클릭률',sortable: false, columnWidth,
    render: ({data}) =>
      <span>{data.validClickCount && data.exposureCount && numberToFixedFormat((data.validClickCount / data.exposureCount) * 100)}%</span>
  },
  {name: 'costAmount', header: '비용', columnWidth,type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {name: 'revenueAmount', header: '수익금', columnWidth,type: 'number', render: ({value}) => <span className={'won'}>{decimalFormat(value)}</span>},
  {
    name: 'cpc',
    header: 'CPC',
    textAlign: 'center',
    sortable: false,
    columnWidth,
    render: ({data}) => {
      let value = data?.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    header: 'ECPM',
    sortable: false,
    columnWidth,
    render: ({data}) => {
      let value = data?.exposureCount !== 0 ?  (data?.costAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    }
  }
]