import {Link} from "react-router-dom";
import {atom} from "jotai";
import {Icon} from "../../components/table";
import React from "react";
import {TableTooltip, TooltipBody, ToolTipText} from "../../assets/GlobalStyles";
import {defaultEnumerates} from "../../components/common/enumerate";
import {deviceTypeInfo} from "../media_manage/entity/common";

export const searchAdExChangeParams = {
  pType: {'BANNER':"배너", 'POP_UNDER':'팝언더'},
  agentType: [
    {value:'PC',label:'PC 웹'},
    {value:'WEB_APP',label:'PC 어플리케이션'},
    {value:'MOBILE_WEB',label:'모바일웹'},
    {value:'MOBILE_HYBRID_APP',label:'하이브리드 APP'},
    {value:'MOBILE_NATIVE_APP',label:'네이티브 APP'}
  ],
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
        textDecoration: 'underline',
        justifyContent: 'center'
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
      const inventory = cellProps.data.inventoryExchanges.filter(item =>  item.publishYn === 'Y' ?  item.exchangePlatformType : null)
      return (
        <TableTooltip>
          <ToolTipText>{value}</ToolTipText>
          {inventory.length !== 0 &&
          <TooltipBody>
            {inventory.map((item,index) => {
              return (
                <div key={index}>{item.exchangePlatformType}</div>
              )}
            )}
          </TooltipBody>
          }
        </TableTooltip>
      )
    }
  },
  {
    name: 'productType',
    header: '광고 상품',
    minWidth: 100,
    render: ({value}) => {
      return defaultEnumerates.productTypeInfo[value]
    }
  },
  {
    name: 'deviceType',
    header: '디바이스',
    minWidth: 150,
    render: ({value}) => {
      return deviceTypeInfo.find(type => type.value === value).label;
    }
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => {
      return value!= null ? value?.replace('IMG','').replace('_','x') : '' ;
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


