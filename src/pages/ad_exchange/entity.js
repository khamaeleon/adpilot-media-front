import {Link} from "react-router-dom";
import {atom} from "jotai";
import {Icon} from "../../components/table";
import React from "react";

export const searchAdExChangeParams = {
  pType: ['BANNER', 'POP_UNDER'],
  deviceType: ['PC', 'MOBILE', 'RESPONSIVE'],
  selectMediaType: {value: 'inventoryName', label: '지면명'},
  searchName: '',
  mediaAcceptConfig: {value: 'on', label: '사용중'},
}

export const columnAdExChangeData = [
  {
    name: 'publish',
    header: '게제 상태',
    width: 150,
    render: ({value}) => {
      return (
          <>{value ? "게재중" : "게재 중지"}</>
      )
    }
  },
  {
    name: 'siteName',
    header: '매체명',
    width: 150,
  },
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 200, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/adExchangeDetail'} state={{id: cellProps.data.inventoryId}}>{value}</Link>
      )
    }
  },
  {
    name: 'inventoryId',
    header: '지면 코드',
    textAlign: 'center',
    width: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'countByAdExchange',
    header: '연동사 수',
    textAlign: 'center',
    width: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return value}
  },
  {
    name: 'productType',
    header: '광고 상품',
    width: 100,
    render: ({value}) => {
      return value.label
    }
  },
  {
    name: 'agentTypes',
    header: '에이전트',
    width: 150,
    render: ({value}) => {
      return value.map(data => data.label).join(',');
    }
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => {
      return value!= null ? value.value.replace('IMG','') : '' ;
    }
  },

]

export const showListAtom = atom({isShow:false})
export const adExchangeListAtom = atom([])

export const adExchangeSortListAtom = atom([])

export const adExchangeAtom = atom({
  "inventoryId": "",
  "inventoryName": "",
  "exchangePlatformId":"",
  "productType": "",
  "deviceType": "",
  "agentTypes": [],
  "bannerSize": {},
  "publish": false,
  "countByAdExchange": 0,
  "inventoryExchanges": []
})


