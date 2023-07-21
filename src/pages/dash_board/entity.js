import {atom} from "jotai";

export const revenueAtom = atom({
  todayAmount: 0,
  yesterdayAmount: 0,
  last7daysAmount: 0,
  thisMonthAmount: 0,
})

export const thisMonthAtom = atom({
  requestCount: 0,
  exposureCount: 0,
  validClickCount: 0,
})

export const lastMonthAtom = atom({
  revenueAmount: 0,
  requestCount: 0,
  exposureCount: 0,
  validClickCount: 0
})

export const revenueShareAtom = atom([
  {
    selectedTypeName: "PC",
    shareByPer: 25
  },
  {
    selectedTypeName: "모바일",
    shareByPer: 25
  },
  {
    selectedTypeName: "네이티브",
    shareByPer: 50
  }
])

export const revenuePeriodAtom = atom([])
