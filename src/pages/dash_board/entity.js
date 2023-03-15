import {atom} from "jotai/index";

export const proceedsAtom = atom({
  todayAmount: 1000000,
  yesterdayAmount: 9000000,
  last7daysAmount: 1000000,
  thisMonthAmount: 1000000,
})

export const thisMonthAtom = atom({
  requestCount: 10000,
  exposureCount: 10000,
  clickCount: 10000,
})

export const lastMonthAtom = atom({
  proceedsAmount: 10000,
  requestCount: 100000,
  exposureCount: 10000,
  clickCount: 1000
})

export const proceedShareAtom = atom([
  {
    selectedTypeName: "배너",
    shareByPer: 25.0
  },
  {
    selectedTypeName: "팝언더",
    shareByPer: 75.0
  }
])

export const proceedPeriodAtom = atom([
  {
    date: "2023.02.13",
    count: 1130000,
  },
  {
    date: "2023.02.14",
    count: 91230000,
  },
  {
    date: "2023.02.15",
    count: 1230000,
  },
  {
    date: "2023.02.16",
    count: 5467000,
  },
  {
    date: "2023.02.17",
    count: 56874567,
  },
  {
    date: "2023.02.18",
    count: 34573456,
  },
  {
    date: "2023.02.19",
    count: 345756745,
  },
  {
    date: "2023.02.20",
    count: 23434567,
  },
  {
    date: "2023.02.21",
    count: 8946375,
  },
  {
    date: "2023.02.22",
    count: 2456356,
  },
  {
    date: "2023.02.23",
    count: 34563456
  },
  {
    date: "2023.02.24",
    count: 12341324,
  },
  {
    date: "2023.02.25",
    count: 8946375,
  },
  {
    date: "2023.02.26",
    count: 2456356,
  },
  {
    date: "2023.02.27",
    count: 34563456
  },
  {
    date: "2023.02.28",
    count: 12341324,
  },
  {
    date: "2023.03.01",
    count: 34563456
  },
  {
    date: "2023.03.02",
    count: 12341324,
  },
])