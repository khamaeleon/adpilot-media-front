
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {
  Icon,SelectConfirm,
  SwitchComponent
} from "../../components/table";
import {atom} from "jotai/index";
import {
  convertInventoryExamination,
  convertInventoryPublish
} from "../../services/InventoryAxios";

export const mediaResistInfo = {
  siteName: '',
  inventoryName: '',
  mediaUrl: '',
  deviceType: '',
  category1: {
    key: "",
    value: "",
    label: ""
  },
  category2: {
    key: "1",
    value: "SPORT",
    label: "스포츠"
  },
  description: '',
  agentTypes: [],
  id: '',
  productType: {id: '', value: '', label: ''},
  exposedMinuteLimit: '',
  bannerSize: '',
  calculationType: '',
  calculationValue: 0,
  contractStartDate: new Date(),
  noExposedConfigType: "",
  noExposedConfigValue: '',
  calculationEtc: '',
  allowEvents: [],
  publication:true,
  inventoryType:{id: '', value: '', label: ''},
  examinationStatus: "CONFIRMING"
}

export const mediaSearchInfo = []

export const mediaCategoryOneDepthInfo = []

export const adPreviewSize = []

export const productAllType = [
  {value: 'BANNER_BASIC', label: '기본 배너', group: 'BANNER'},
  {value: 'BANNER_FLOATING', label: '플로팅 배너', group: 'BANNER'},
  {value: 'BANNER_TOAST', label: '토스트 배너', group: 'BANNER'},
  {value: 'POP_UNDER_DIRECT', label: '다이렉트 커버', group: 'POP_UNDER'},
  {value: 'POP_UNDER', label: '팝언더', group: 'POP_UNDER'},
]
export const exposedLimitType = [
  {value: -1, label: '무제한'},
  {value: 1, label: '1분'},
  {value: 5, label: '5분'},
  {value: 10, label: '10분'},
  {value: 15, label: '15분'},
]
export const calculationAllType = [
  {id: "1", value: "cpc", label: "CPC"},
  {id: "2", value: "cpm", label: "CPM"},
  {id: "3", value: "rs", label: "RS"},
  {id: "4", value: "gt", label: "GT"}
]

export const columnData = [

  {
    name: 'id',
    header: 'ID',
    defaultVisible: false
  },
  {
    name: 'publish',
    header: '게재 상태',
    width: 90,
    showColumnMenuTool: false, // 설정메뉴표시
    sortable: false,
    render: ({value, cellProps}) => {
      return (
          <SwitchComponent value={value} cellProps={cellProps} eventClick={()=>convertInventoryPublish(cellProps.data.inventoryId, !value)}/>
      );
    }
  },
  {
    name: 'siteName',
    header: '매체명',
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'userId',
    header: '아이디',
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 220, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return(
          <Link to={"/board/media2/detail"} state={cellProps.data.inventoryId}>{value}</Link>
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
    name: 'productType',
    header: '광고 상품',
    textAlign: 'center',
    width: 100,
    resizeable: false,
    sortable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return productTypeInfo.find(type => type.value === value).label;
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
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    defaultWidth: 100,
    showColumnMenuTool: false,
    render: ({value}) => {
      return value.label ;
    }
  },
  {
    name: 'calculation',
    header: '정산 방식',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ( { value, cellProps } ) => {
      return value.calculationType + "("+cellProps.data.calculation.calculationValue+")"
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
      return <SelectConfirm value={value} cellProps={cellProps} onSelect={(item)=>convertInventoryExamination(cellProps.data.inventoryId, item)}/>
    }
  }
]


export const mediaSearchResult = atom([]);

export const mediaAcceptYn = [
  {id: "1", value: "on", label: "게재중"},
  {id: "2", value: "off", label: "중지"},
]

export const productTypeInfo = [
  {id:'1', value: 'BANNER', label: '배너'},
  {id:'2', value: 'POP_UNDER', label: '팝언더'}
]

export const deviceTypeInfo = [
  {id:'1', value: 'PC', label: 'PC'},
  {id:'2', value: 'MOBILE', label: 'MOBILE'},
  {id:'3', value: 'RESPONSIVE_WEB', label: '반응형웹'}
]

export const searchMediaTypeAll = [
  {id: "1", value: "all", label: "전체"},
  {id: "2", value: "mediaName", label: "매체명"},
  {id: "3", value: "mediaId", label: "아이디"},
  {id: "4", value: "inventoryName", label: "지면명"},
  {id: "5", value: "inventoryId", label: "지면번호"},
]

export const searchMediaInfo = {
  selectSearchMediaType: {id: "1", value: "all", label: "전체"},
  selectSearchName: '',
  calculationType: {id: "", value: "", label: ""},
  agentType: ['WEB', 'APPLICATION', 'RESPONSIVE', 'MOBILE_WEB', 'APP']
}

export const confirmAllType = [
  {value: 'CONFIRMING', label: '심사 중'},
  {value: 'APPROVED', label: '심사 승인'},
  {value: 'REJECTED', label: '심사 반려'}
]


