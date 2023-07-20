/* 리스트 기본값 */
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import React from "react";

export const defaultCondition = {
  productType: [
    {key: "0", value: null, label: '전체'},
    {key: "1", value: 'BANNER', label: '배너'},
    {key: "2",value: 'POP_UNDER',label: '팝 언더'}
  ],
  targetingType: [
    {key:"0",value: null,label:" 전체"},
    {key:"1",value:"SAW_THE_PRODUCT",label:"카트 추천"},
    {key:"2",value:"CART_THE_PRODUCT",label:"상품 추천"},
    {key:"3",value:"DOMAIN_MATCHING",label:"유저 매칭"},
    {key:"4",value:"USER_OPTIMIZATION",label:"유저 최적화"}
  ],
  exchangeSearchType: [
    {key: "0", value: null, label: '전체'},
    {key: "1", value: "IN_COMING",label: "수신"},
    // {key: "2", value: "OUT_GOING", label: "송출"}, //차후 외부연동 송출 기능 구현 시 적용
    {key: "3", value: "EXCEPTION", label: "제외"}
  ],
  deviceType: [
    {key: "0", value: null, label: '전체'},
    {key: "1", value: "PC", label: "PC"},
    {key: "2", value: "MOBILE",label: "모바일 웹"},
    {key: "3", value: "RESPONSIVE_WEB", label: "반응형 웹"},
    {key: "4", value: "APP", label: "APP"}],
  agentType: [
    {key: "1", value: "WEB", label: "PC 웹"},
    {key: "2", value: "WEB_APP", label: "PC 어플리케이션"},
    {key: "3", value: "MOBILE_WEB",label: "모바일 웹"},
    {key: "4", value: "MOBILE_HYBRID_APP", label: "하이브리드 APP"},
    {key: "5", value: "MOBILE_NATIVE_APP", label: "네이티브 APP"}
  ],
  sortType: null
}

export const lockedRows = [
  {
    position: 'start',
    cellStyle : {
      display: 'flex',
      justifyContent: 'center',
    },
    render: {
      historyDate: 'Total',
      siteName: 'Total',
      inventoryName: 'Total',
      inventoryId: '-',
      userId: '-',
      requestCount: ({ summary }) => <p className={'ellipsis'}>{decimalFormat(summary.requestCount)}</p>,
      responseCount: ({ summary }) => <p className={'ellipsis'}>{decimalFormat(summary.responseCount)}</p>,
      exposureCount: ({ summary }) => <p className={'ellipsis'}>{decimalFormat(summary.exposureCount)}</p>,
      validClickCount: ({ summary }) => <p className={'ellipsis'}>{decimalFormat(summary.validClickCount)}</p>,
      totalClickCount: ({ summary }) => <p className={'ellipsis'}>{decimalFormat(summary.totalClickCount)}</p>,
      clickRate: ({ summary }) => <p className={'pct ellipsis'}>{summary.validClickCount !== 0 ? numberToFixedFormat((summary.validClickCount / summary.exposureCount) * 100) : 0}</p>,
      costAmount: ({ summary }) => <p className={'won ellipsis'}>{moneyToFixedFormat(summary.costAmount)}</p>,
      revenueAmount: ({ summary }) => <p className={'won ellipsis'}>{moneyToFixedFormat(summary.revenueAmount)}</p>,
      cpc: ({ summary }) => <p className={'won ellipsis'}>{summary.validClickCount !== 0 ? moneyToFixedFormat(summary.costAmount / summary.validClickCount) : 0}</p>,
      ecpm: ({ summary }) => <p className={'won ellipsis'}>{summary.exposureCount !== 0 ? moneyToFixedFormat((summary.costAmount / summary.exposureCount) * 1000) : 0}</p>,
    }
  }
]
export const summaryReducer = {
  initialValue: {
    requestCount: 0,
    responseCount: 0,
    exposureCount: 0,
    validClickCount: 0,
    totalClickCount: 0,
    clickRate: 0,
    costAmount: 0,
    revenueAmount: 0,
    cpc: 0,
    ecpm: 0,
  },
  reducer: (accumulator, item) => {
    if(item !== null) {
      accumulator.requestCount += item.requestCount
      accumulator.responseCount += item.responseCount
      accumulator.exposureCount += item.exposureCount
      accumulator.validClickCount += item.validClickCount
      accumulator.totalClickCount += item.totalClickCount
      accumulator.costAmount += item.costAmount
      accumulator.revenueAmount += item.revenueAmount
    }
    return accumulator
  },
  complete: (accumulator, arr) => {
    return accumulator
  }
};