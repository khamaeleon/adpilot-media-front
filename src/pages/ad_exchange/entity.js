import {Link} from "react-router-dom";
import {atom} from "jotai";
import {Icon} from "../../components/table";
import React from "react";

export const searchAdExChangeParams = {
  pType: {'BANNER':"배너", 'POP_UNDER':'팝언더'},
  agentType: [{value:'PC',label:'PC 웹'}, {value:'MOBILE_WEB',label:'모바일웹'}, {value:'MOBILE_NATIVE_APP',label:'네이티브앱'}],
  deviceType: {MOBILE:'모바일',PC:'웹',},
  selectMediaType: {value: 'inventoryName', label: '지면명'},
}

export const columnAdExChangeData = [
  {
    name: 'publishYn',
    header: '게제 상태',
    minWidth: 150,
    render: ({value}) => {
      return (
          <>{value === 'Y' ? "게재중" : "게재 중지"}</>
      )
    }
  },
  {
    name: 'siteName',
    header: '매체명',
    minWidth: 150,
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
    minWidth: 80,
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
    minWidth: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return value}
  },
  {
    name: 'productType',
    header: '광고 상품',
    minWidth: 100,
    render: ({value}) => {
      const label = {BANNER:'배너',POP_UNDER:'팝언더'}
      return label[value]
    }
  },
  {
    name: 'agentTypes',
    header: '에이전트',
    minWidth: 150,
    render: ({value}) => {

      return value.join(',');
    }
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => {

      return value!= null ? value?.replace('IMG','') : '' ;
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
  "publishYn": false,
  "countByAdExchange": 0,
  "inventoryExchanges": []
})


