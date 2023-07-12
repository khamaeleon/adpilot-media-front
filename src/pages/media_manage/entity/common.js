export const mediaResistInfo = {
  siteName: '',
  inventoryName: '',
  mediaUrl: '',
  deviceType: '',
  category1: "",
  category2: "",
  description: '',
  agentTypes: [],
  id: '',
  productType: 'BANNER',
  exposureInterval: '',
  bannerSize: '',
  feeCalculations: [
    {
      id: '',
      calculationEtc: '',
      calculationType: '',
      calculationValue: 0,
      contractStartDate: new Date(new Date().setDate(new Date().getDate()+1)),
    }
  ],
  feeCalculation:{
    id: '',
    calculationEtc: '',
    calculationType: '',
    calculationValue: 0,
    contractStartDate: new Date(),
  },
  nonExposureConfigType: 'NONE',
  nonExposureConfigValue: '',
  allowTargetings: [],
  inventoryType:'',
  examinationStatus: "CONFIRMING"
}
export const mediaSearchInfo = []
export const mediaCategoryOneDepthInfo = []
export const adPreviewSize = []
export const inventoryType = []
export const exposureIntervalType = [
  {value: -1, label: '무제한'},
  {value: 1, label: '1분'},
  {value: 5, label: '5분'},
  {value: 10, label: '10분'},
  {value: 15, label: '15분'},
]
export const calculationAllType = [
  {id: "0", value: "ALL", label: "전체"},
  {id: "1", value: "CPC", label: "CPC"},
  {id: "2", value: "CPM", label: "CPM"},
  {id: "3", value: "RS", label: "RS"},
  {id: "4", value: "GT", label: "GT"}
]
export const mediaAcceptYn = [
  {id: "1", value: "on", label: "게재중"},
  {id: "2", value: "off", label: "중지"},
]
export const productTypeInfo = [
  {id:"0", value: "ALL", label: "전체"},
  {id:'1', value: 'BANNER', label: '배너'},
  {id:'2', value: 'POP_UNDER', label: '팝언더'}
]
export const deviceTypeInfo = [
  {id:"0", value: "ALL", label: "전체"},
  {id:'1', value: 'PC', label: 'PC'},
  {id:'2', value: 'MOBILE', label: '모바일 웹'},
  {id:'3', value: 'RESPONSIVE_WEB', label: '반응형 웹'},
  {id:'4', value: 'APP', label: 'APP'}
]
export const searchMediaTypeAll = [
  {id:"0", value: "ALL", label: "전체"},
  {id:"1", value: "SITE_NAME", label:"매체명"},
  {id:"3", value: "INVENTORY_NAME", label:"지면명"},
  {id:"4", value: "INVENTORY_ID", label:"지면코드"},
]
export const agentTypeInfo = [
  {id:"1", value: "WEB", label: "PC 웹"},
  {id:"2", value: "WEB_APP", label: "PC 어플리케이션"},
  {id:"3", value: "MOBILE_WEB", label: "모바일 웹"},
  {id:"4", value: "MOBILE_HYBRID_APP", label: "하이브리드 APP"},
  {id:"5", value: "MOBILE_NATIVE_APP", label: "네이티브 APP"}
]
export const searchInfo = {
  calculationType: {id: "", value: "", label: ""},
  deviceType: {id:"", value: "", label:""},
  productType: {id:"", value: "", label:""},
  agentTypes: [],
  examinationStatus: '',
  searchKeywordType: {id: "", value: "", label: ""},
  keyword: ''
}


