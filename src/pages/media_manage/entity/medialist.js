import {Icon, SwitchComponent} from "../../../components/table";
import {convertInventoryExamination, convertInventoryPublishYn} from "../../../services/mediamanage/InventoryAxios";
import {Link, useNavigate} from "react-router-dom";
import SelectBox from "../../../components/common/SelectBox";
import React from "react";
import {deviceTypeInfo, productTypeInfo} from "./common";
import {confirmAllType} from "./medialistdetail";
import {atom} from "jotai";
import {navigate} from "@inovua/reactdatagrid-community/packages/Calendar/src/DecadeView";
import HoverCampaigns from "../../../components/common/HoverCampaigns";
import {updateAllowCampaignWeight} from "../../../services/reports/mediaAxios";

export const mediaSearchResult = atom([]);
export const columnData = (navigate) => [
  {
    name: 'publishYn',
    header: '게재 상태',
    width: 90,
    showColumnMenuTool: false, // 설정메뉴표시
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y');
      const disabled = cellProps.data.examinationStatus !== "APPROVED"
      return (
        <SwitchComponent value={valueYn} cellProps={cellProps} disabled={disabled} eventClick={()=>convertInventoryPublishYn(cellProps.data.inventoryId, !valueYn)}/>
      );
    }
  },
  {
    name: 'siteName',
    header: '매체명',
    defaultWidth: 200, //가변 사이즈
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '아이디',
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 250, //가변 사이즈
    resizeable: true, //리사이징
    cellProps: {
      style: {
        justifyContent: 'center'
      }
    },
    render: ({value, cellProps}) => {
      return(
        <Link className={'ellipsis'} to={"/board/mediaListDetail"} state={cellProps.data.inventoryId}>{value}</Link>
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
    name: 'allowCampaigns',
    header: '연결 캠페인',
    textAlign: 'center',
    width: 180,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({ value }) => <HoverCampaigns ids={value} onSave={(draft) => {
      updateAllowCampaignWeight(draft).then((r) => {alert("가중치가 변경되었습니다.")} );
    }}/>
  },
  {
    name: 'productType',
    header: '광고 상품',
    textAlign: 'center',
    width: 100,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return productTypeInfo.find(type => type.value === value)?.label;
    }
  },
  {
    name: 'deviceType',
    header: '디바이스',
    textAlign: 'center',
    defaultWidth: 100,
    showColumnMenuTool: false,
    render: ({value}) => {
      return deviceTypeInfo.find(type => type.value === value).label;
    }
  },
  //{
  //  name: 'bannerSize',
  //  header: '지면 사이즈',
  //  textAlign: 'center',
  //  showColumnMenuTool: false,
  //  render: ({value}) => {
  //    return value!= null ? value?.replace('IMG','') : '-' ;
  //  }
  //},
  {
    name: 'feeCalculation',
    header: '정산 방식',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ( { value } ) => {
      return value != null && (value.calculationType + "("+value.calculationValue+")")
    }
  },
  {
    name: 'siteUrl',
    header: '사이트',
    textAlign: 'center',
    defaultWidth: 100,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'url'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'script',
    header: '스크립트',
    textAlign: 'center',
    defaultWidth: 100,
    render: ({value, cellProps}) => {
      return <Icon icon={'script'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'examinationStatus',
    header: '심사상태',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({ value, cellProps }) => {
      return <SelectBox options={confirmAllType} value={value} onSelect={async (item)=>{ await convertInventoryExamination(cellProps.data.inventoryId, item); navigate(0);}} />
    }
  }
]
