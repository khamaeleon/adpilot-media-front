import {Icon, LinkRef, renderSwitch} from "../../components/table";

export const searchAdExChangeParams = {
  pType: ['BANNER', 'POP_UNDER'],
  deviceType: ['PC', 'MOBILE', 'RESPONSIVE'],
  selectMediaType: {value: 'inventoryName', label: '지면명'},
  searchName: '',
  mediaAcceptConfig: {value: 'on', label: '사용중'},
}

export const columnAdExChangeData = [
  {
    name: 'mediaName',
    header: '매체명'
  },
  {
    name: 'inventoryName',
    header: '지면명',
  },
  {
    name: 'inventoryCode',
    header: '지면코드',
  },
  {
    name: 'adExChangeCount',
    header: '연동사',
  },
  {
    name: 'pType',
    header: '광고 상품',
  },
  {
    name: 'deviceType',
    header: '디바이스',
  },
  {
    name: 'inventorySize',
    header: '지면 사이즈',
  }
]

export const columnAdExChangeSetting = {
  default: {
    textAlign: "center"
  },
  setColumns: [
    {
      target: 0,
      value: {
        width: 100,
        sortable: true
      },
    },
    {
      target: 1,
      value: {
        defaultWidth: 300,
      },
      function: LinkRef("/board/adExchange/detail")
    },
    {
      target: 2,
      value: {
        defaultWidth: 110,
      },
    },
    {
      target: 3,
      value: {
        defaultWidth: 110,
      },
    },
    {
      target: 4,
      value: {
        width: 100,
        sortable: false
      },
    },
    {
      target: 5,
      value: {
        width: 100,
        sortable: false
      },
    },
    {
      target: 6,
      value: {
        width: 100,
        sortable: false
      },
    }
  ]
}

export const adExChangeListResult = [
  {
    mediaName: "네이트",
    inventoryName: '네이트 플로팅',
    inventoryCode: '123123',
    adExChangeCount: 2,
    pType: '배너',
    deviceType: 'MOBILE',
    inventorySize: '600_120'
  },
  {
    mediaName: "디스패치",
    inventoryName: '디스패치 플로팅',
    inventoryCode: '166123',
    adExChangeCount: 2,
    pType: '배너',
    deviceType: 'PC',
    inventorySize: '600_120'
  },
  {
    mediaName: "세계일보",
    inventoryName: '세계일보 날개배너',
    inventoryCode: '123777',
    adExChangeCount: 2,
    pType: '배너',
    deviceType: 'MOBILE',
    inventorySize: '600_120'
  }
]
