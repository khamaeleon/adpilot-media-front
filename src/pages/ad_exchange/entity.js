import {Link} from "react-router-dom";
import {atom} from "jotai";

export const searchAdExChangeParams = {
  pType: ['BANNER', 'POP_UNDER'],
  deviceType: ['PC', 'MOBILE', 'RESPONSIVE'],
  selectMediaType: {value: 'inventoryName', label: '지면명'},
  searchName: '',
  mediaAcceptConfig: {value: 'on', label: '사용중'},
}

export const columnAdExChangeData = [
  {
    name: 'inventoryId',
    header: '지면 아이디',
    width: 300,
  },
  {
    name: 'inventoryName',
    header: '지면명',
    width: 250,
    render: (props) => {
      return (
        <Link to={'/board/adExchange/detail'} state={{id: props.data.inventoryId}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'productType',
    header: '지면 광고 상품 타입',
    render: ({value}) => {
      return value.value
    }
  },
  {
    name: 'deviceType',
    header: '디바이스',
  },
  {
    name: 'agentTypes',
    header: '에이전트',
    render: ({value}) => {
      return (
        value.map(data => data.label).join(', ')
      )
    }
  },
  {
    name: 'publish',
    header: '게제 상태',
    render: ({value}) => {
      return (
        <>{value ? "게재중" : "게재 중지"}</>
      )
    }
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    width: 200,
    render: ({value}) => {
      return (
        <>{value.label}</>
      )
    }
  },
]

export const adExchangeListAtom = atom([])

export const adExchangeSortListAtom = atom([])

export const adExchangeAtom = atom({
  "inventoryId": "",
  "inventoryName": "",
  "productType": "",
  "deviceType": "",
  "agentTypes": [],
  "bannerSize": {},
  "publish": false,
  "countByAdExchange": 2,
  "inventoryExchanges": []
})

