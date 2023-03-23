import {atom} from "jotai/index";

export const proceedsAtom = atom({
  todayAmount: 9000000,
  yesterdayAmount: 0,
  last7daysAmount: 0,
  thisMonthAmount: 0,
})

export const thisMonthAtom = atom({
  requestCount: 0,
  exposureCount: 0,
  clickCount: 0,
})

export const lastMonthAtom = atom({
  proceedsAmount: 0,
  requestCount: 0,
  exposureCount: 0,
  clickCount: 0
})

export const proceedShareAtom = atom([
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

export const proceedPeriodAtom = atom([])
