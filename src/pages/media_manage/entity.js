
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {
  bannerSizeConverter, calculationConverter,
  Icon,
  LinkRef,
  renderSwitch, SelectConfirm,
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
  agentTypes: ['WEB'],
  id: '',
  pType: 'BANNER',
  eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING'],
  productType: {id: '', value: '', label: ''},
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

export const mediaSearchInfo = [
  {
    id: '1',
    siteName: '한종상컴퍼니',
    userId: 'mcor23',
    staffName: "한종상"
  },
  {
    id: '2',
    siteName: 'mcorporation',
    userId: 'mcor12345',
    staffName: "김정훈",
  },
  {
    id: '3',
    siteName: '파인딩랩',
    userId: 'mmm',
    staffName: "조규홍"
  }
]

export const mediaCategoryOneDepthInfo = [
  {value: 'PRESS', label: '언론사'},
  {value: 'COMMUNITY', label: '커뮤니티'},
  {value: 'WEB_HARD', label: '웹하드'},
  {value: 'BLOG', label: '블로그'},
  {value: 'PORTAL', label: '포털'},
  {value: 'CAFE', label: '카페'},
  {value: 'ENTERTAINMENT', label: '엔터테인먼트'},
  {value: 'ADULT', label: '성인 컨텐츠'},
  {value: 'SNS', label: 'SNS'},
  {value: 'ETC', label: '기타'}
]

export const adPreviewSize = [
  {id: "1", value: "IMG300_150", label: "w300x150(300_150)"},
  {id: "2", value: "IMG200_200", label: "w200x200(200_200)"},
  {id: "3", value: "IMG120_600", label: "w120x600(120_600)"},
  {id: "4", value: "IMG150_150", label: "w150x150(150_150)"},
  {id: "5", value: "IMG160_600", label: "w160x600(160_600)"},
  {id: "6", value: "IMG200_200", label: "w200x200(200_200)"},
  {id: "7", value: "IMG100_200", label: "w100x200(100_200)"},
  {id: "8", value: "IMG100_300", label: "w100x300(100_300)"},
  {id: "9", value: "IMG100_400", label: "w100x400(100_400)"},
  {id: "10", value: "IMG100_500", label: "w100x500(100_500)"},
  {id: "11", value: "IMG100_600", label: "w100x600(100_600)"},
  {id: "12", value: "IMG200_200", label: "w200x200(200_200)"},
  {id: "13", value: "IMG300_300", label: "w300x300(300_300)"},
  {id: "14", value: "IMG400_400", label: "w400x400(400_400)"},
  {id: "15", value: "IMG500_500", label: "w500x500(500_500)"},
  {id: "16", value: "IMG600_600", label: "w600x600(600_600)"}
]

export const productAllType = [
  {value: 'BANNER_BASIC', label: '기본 배너'},
  {value: 'BANNER_FLOATING', label: '플로팅 배너'},
  {value: 'BANNER_TOAST', label: '토스트 배너'},
  {value: 'POP_UNDER_DIRECT', label: '다이렉트 커버'},
  {value: 'POP_UNDER', label: '팝언더'},
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
  },
  {
    name: 'userId',
    header: '아이디',
    textAlign: 'center',
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
    width: 150,
    resizeable: false,
    sortable: false,
    showColumnMenuTool: false
  },
  {
    name: 'deviceType',
    header: '디바이스',
    textAlign: 'center',
  },
  {
    name: 'bannerSize',
    header: '지면 사이즈',
    textAlign: 'center',
    render: (props) => {
      const { value, cellProps } = props;
      return <span>{value.value}</span>
    }
  },
  {
    name: 'calculation',
    header: '정산 방식',
    textAlign: 'center',
    render: (props) => {
      const { value, cellProps } = props;
      return <span>{value.calculationType}</span>
    }
  },
  {
    name: 'siteUrl',
    header: '사이트',
    textAlign: 'center',
    render: ({value, cellProps}) => {
      return <Icon icon={'url'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'script',
    header: '스크립트',
    textAlign: 'center',
    render: ({value, cellProps}) => {
      return <Icon icon={'script'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'examinationStatus',
    header: '심사상태',
    textAlign: 'center',
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


