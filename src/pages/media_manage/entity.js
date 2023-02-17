import {dateFormat} from "../../common/StringUtils";

export const mediaResistInfo = {
  siteName: '',
  inventoryName: '',
  mediaUrl: '',
  deviceType: 'PC',
  category: {key: '', value: '', label: ''},
  description: '',
  agentType: 'WEB',
  memberId: '',
  pType: 'BANNER',
  eventType: ['SAW_THE_PRODUCT', 'CART_THE_PRODUCT', 'DOMAIN_MATCHING'],
  productType: {id: '', value: '', key: ''},
  bannerSize: 'IMG300_150',
  calculationType: {id: '', value: '', key: ''},
  calculationTypeValue: '',
  contractStartDate: new Date(),
  noExposedConfigType: "DEFAULT_IMAGE",
  noExposedConfigTypeValue: '',
  calculationEtc: ''
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

export const mediaSearchResult = [
  {
    고유번호: '',
    게재상태: false,
    매체명: "인사이트",
    아이디: "userid",
    지면명: '인사이트_콘텐츠 플로팅 400*400',
    지면번호: '123123',
    광고상품: '배너',
    디바이스: 'MOBILE',
    에이전트: '웹앱',
    지면사이즈: '120*300',
    사이트이동: 'https://finding.trycatch.co.kr',
    정산방식: 'CPM / 1,000원',
    대행사정산: '미정산',
    지면스크립트: 'script',
    신청일시: '2020.02.12',
    심사상태: '심사 승인',
  },
  {
    고유번호: '',
    게재상태: false,
    매체명: "인사이트",
    아이디: "userid",
    지면명: '인사이트_콘텐츠 플로팅 400*400',
    지면번호: '123123',
    광고상품: '배너',
    디바이스: 'MOBILE',
    에이전트: '웹앱',
    지면사이즈: '120*300',
    사이트이동: 'https://finding.trycatch.co.kr',
    정산방식: 'CPM / 1,000원',
    대행사정산: '미정산',
    지면스크립트: 'script',
    신청일시: '2020.02.12',
    심사상태: '심사 승인',
  },
  {
    고유번호: '',
    게재상태: false,
    매체명: "인사이트",
    아이디: "userid",
    지면명: '인사이트_콘텐츠 플로팅 400*400',
    지면번호: '123123',
    광고상품: '배너',
    디바이스: 'MOBILE',
    에이전트: '웹앱',
    지면사이즈: '120*300',
    사이트이동: 'https://finding.trycatch.co.kr',
    정산방식: 'CPM / 1,000원',
    대행사정산: '미정산',
    지면스크립트: 'script',
    신청일시: '2020.02.12',
    심사상태: '심사 승인',
  },
  {
    고유번호: '',
    게재상태: false,
    매체명: "인사이트",
    아이디: "userid",
    지면명: '인사이트_콘텐츠 플로팅 400*400',
    지면번호: '123123',
    광고상품: '배너',
    디바이스: 'MOBILE',
    에이전트: '웹앱',
    지면사이즈: '120*300',
    사이트이동: 'https://finding.trycatch.co.kr',
    정산방식: 'CPM / 1,000원',
    대행사정산: '미정산',
    지면스크립트: 'script',
    신청일시: '2020.02.12',
    심사상태: '심사 승인',
  }
]

export const mediaAcceptYn = [
  {id: "1", value: "on", label: "ON"},
  {id: "2", value: "off", label: "OFF"},
]

export const searchMediaTypeAll = [
  {id: "1", value: "all", label: "전체"},
  {id: "2", value: "mediaName", label: "매체명"},
  {id: "3", value: "mediaId", label: "아이디"},
  {id: "4", value: "inventoryName", label: "지면명"},
  {id: "5", value: "inventoryId", label: "지면번호"},
]

export const searchMediaInfo = {
  selectSearchMediaType:{id: "1", value: "all", label: "전체"},
  selectSearchName:'',
  calculationType:{id: "", value: "", label: ""},
  agentType: ['WEB','APPLICATION','RESPONSIVE','MOBILE_WEB','APP']
}

