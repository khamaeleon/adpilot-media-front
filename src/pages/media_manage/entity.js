import {dateFormat} from "../../common/StringUtils";
import {Link} from "react-router-dom";
import Switch from "../../components/common/Switch";
import React, {useState} from "react";
import {Off, On, SwitchBox} from "./List";
import { TableButton} from "../../assets/GlobalStyles";
import {Icon, LinkRef, renderSwitch, selectConfirm, SelectConfirm, Selects} from "../../components/table";
import Select from "react-select";

export const mediaResistInfo = {
  siteName: '',
  inventoryName: '',
  mediaUrl: '',
  deviceType: 'PC',
  category: {value: 'media', label: '언론사'},
  description: '',
  agentType: 'WEB',
  memberId: '',
  pType: 'BANNER',
  eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING'],
  productType: {id: '', value: '', label: ''},
  bannerSize: 'IMG300_150',
  calculationType: {id: '', value: '', label: ''},
  calculationTypeValue: 0,
  contractStartDate: new Date(),
  noExposedConfigType: "DEFAULT_IMAGE",
  noExposedConfigTypeValue: '',
  calculationEtc: '',
  confirmType: {value: 'confirming', label: '심사 중'},
  eventTypeWeight: {
    sawTheProduct: 100,
    cartTheProduct: 100,
    domainMatching: 100
  },
  publication:true

}

export const mediaSearchInfo = [
  {
    id: '1',
    siteName: '한종상컴퍼니',
    memberId: 'mcor23',
    managerName: "한종상"
  },
  {
    id: '2',
    siteName: 'mcorporation',
    memberId: 'mcor12345',
    managerName: "김정훈",
  },
  {
    id: '3',
    siteName: '파인딩랩',
    memberId: 'mmm',
    managerName: "조규홍"
  }
]

export const mediaCategoryOneDepthInfo = [
  {value: 'media', label: '언론사'},
  {value: 'community', label: '커뮤니티'},
  {value: 'web-hard', label: '웹하드'},
  {value: 'blog', label: '블로그'},
  {value: 'portal', label: '포털'},
  {value: 'cafe', label: '카페'},
  {value: 'entertainment', label: '엔터테인먼트'},
  {value: 'adult-content', label: '성인 컨텐츠'},
  {value: 'sns', label: 'SNS'},
  {value: 'etc', label: '기타'}
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
  {value: 'floating', label: '플로팅'},
  {value: 'toast', label: '토스트'},
  {value: 'basic', label: '기본'},
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
    name: 'status',
    header: '개제 상태',
  },
  {
    name: 'name',
    header: '매체명',
  },
  {
    name: 'userId',
    header: '아이디',
  },
  {
    name: 'adName',
    header: '지면명',
  },
  {
    name: 'adNumber',
    header: '지면 코드',
  },
  {
    name: 'product',
    header: '광고 상품',
  },
  {
    name: 'device',
    header: '디바이스',
  },
  {
    name: 'adSize',
    header: '지면 사이즈',
  },
  {
    name: 'payType',
    header: '정산 방식',
  },
  {
    name: 'siteUrl',
    header: '사이트',
  },
  {
    name: 'script',
    header: '스크립트',
  },
  {
    name: 'confirm',
    header: '심사상태',
  }
  ]

export const columnSetting = {
  default: {
    textAlign: "center"
  },
  setColumns: [
    {
      target: 1,
      value: {
        width: 90,
        showColumnMenuTool: false, // 설정메뉴표시
        sortable: false,
      },
      function: renderSwitch
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
        defaultWidth: 220, //가변 사이즈
        resizeable: true, //리사이징
        textEllipsis: false, // ... 표시
        cellProps: {
          style: {
            textDecoration: 'underline'
          }
        }
      },
      function: LinkRef("/board/media2/detail")
    },
    {
      target: 5,
      value: {
        width: 80,
        sortable: false, //정렬
        resizeable: false,
      },
      function: Icon('copyCode')
    },
    {
      target: 6,
      value: {
        width: 80,
        resizeable: false,
        sortable: false
      },
    },
    {
      target: 7,
      value: {
        width: 100,
        sortable: false
      },
    },
    {
      target: 10,
      value: {
        width: 60,
        sortable: false,
        resizeable: false,
      },
      function: Icon('url')
    },
    {
      target: 11,
      value: {
        defaultWidth: 80,
        sortable: false,
        resizeable: false,
      },
      function: Icon('script')
    },
    {
      target: 12,
      function: selectConfirm
    }
  ]
}

export const mediaSearchResult = [
  {
    id:0,
    status: false,
    name: "인사이트1",
    userId: "userid1",
    adName: '인사이트_콘텐츠 플로팅 400*400',
    adNumber: '123123',
    product: '배너',
    device: 'MOBILE',
    agent: '웹앱',
    adSize: '120*300',
    siteUrl: 'https://finding.trycatch.co.kr',
    payType: 'CPM / 1,000원',
    payAgent: '미정산',
    script: 'script1',
    date: '2020.02.12',
    confirm: '심사 승인',
  },
  {
    id:1,
    status: false,
    name: "인사이트2",
    userId: "userid2",
    adName: '인사이트_콘텐츠 플로팅 400*400',
    adNumber: '123123',
    product: '배너',
    device: 'MOBILE',
    agent: '웹앱',
    adSize: '120*300',
    siteUrl: 'https://finding.trycatch.co.kr',
    payType: 'CPM / 1,000원',
    payAgent: '미정산',
    script: 'script2',
    date: '2020.02.12',
    confirm: '심사 중',
  },
  {
    id:2,
    status: false,
    name: "인사이트3",
    userId: "userid3",
    adName: '인사이트_콘텐츠 플로팅 400*400',
    adNumber: '123123',
    product: '배너',
    device: 'MOBILE',
    agent: '웹앱',
    adSize: '120*300',
    siteUrl: 'https://finding.trycatch.co.kr',
    payType: 'CPM / 1,000원',
    payAgent: '미정산',
    script: 'script3',
    date: '2020.02.12',
    confirm: '심사 반려',
  },
  {
    id:3,
    status: false,
    name: "인사이트4",
    userId: "userid4",
    adName: '인사이트_콘텐츠 플로팅 400*400',
    adNumber: '123123',
    product: '배너',
    device: 'MOBILE',
    agent: '웹앱',
    adSize: '120*300',
    siteUrl: 'https://finding.trycatch.co.kr',
    payType: 'CPM / 1,000원',
    payAgent: '미정산',
    script: 'script4',
    date: '2020.02.12',
    confirm: '심사 승인',
  },
  {
    id:4,
    status: false,
    name: "인사이트5",
    userId: "userid5",
    adName: '인사이트_콘텐츠 플로팅 400*400',
    adNumber: '123123',
    product: '배너',
    device: 'MOBILE',
    agent: '웹앱',
    adSize: '120*300',
    siteUrl: 'https://finding.trycatch.co.kr',
    payType: 'CPM / 1,000원',
    payAgent: '미정산',
    script: 'a script is script',
    date: '2020.02.12',
    confirm: '심사 승인',
  },
]

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
  {value: 'confirming', label: '심사 중'},
  {value: 'confirmDone', label: '심사 완료'}
]


