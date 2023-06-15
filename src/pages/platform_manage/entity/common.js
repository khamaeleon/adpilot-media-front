import {Icon} from "../../../components/table";
import {Link} from "react-router-dom";
import React from "react";
import moment from "moment";
import {atom} from "jotai";
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import {phoneNumFormat} from "../../../common/StringUtils";

export const accountInfoAtom = atom([])
export const adminInfoAtom = atom({})
/**
 * 매체 타입
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const mediaType = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "DIRECT", label: "직매체"},
  {id: "3", value: "AGENCY", label: "대행사"},
]
/**
 * 매체 계정 사용여부
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectAccountUseInfo = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "Y", label: "활성화"},
  {id: "3", value: "N", label: "비활성화"},
]
/**
 * 매체 계정 검색 타입
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectMediaSearchType = [
  {id: "0", value: null, label: "전체"},
  {id: "1", value: "MEDIA_NAME", label: "매체명"},
  {id: "2", value: "MEDIA_ID", label: "아이디"},
  {id: "3", value: "PHONE", label: "연락처"}
]
/**
 * 검색 조건
 * @type {{activeYn: {id: string, label: string, value: string}, phoneNumber: string, siteName: string, mediaType: {id: string, label: string, value: string}, selectAdminType: {id: string, label: string, value: string}, userId: string, mediaSearchType: {id: string, label: string, value: string}}}
 */
export const searchAccountInfo = {
  mediaType: '',
  selectAdminType: '',
  mediaSearchType: '',
  username: '',
  siteName: '',
  phoneNumber: '',
  activeYn: '',
  pageSize: 1000,
  currentPage: 1,
  searchText: ''
}
/**
 * 사용자 리스트 컬럼 설정
 * @type {[{name: string, header: string},{name: string, header: string, render: (function({value: *}): *)},{name: string, header: string, render: (function(*): *)},{name: string, header: string},{name: string, header: string},null,null]}
 */
export const columnUserData = [
  {
    name: 'siteName',
    header: '매체명'
  },
  {
    name: 'mediaType',
    header: '매체타입',
    render: ({value}) => {
      return (
        <>{value === 'DIRECT' ? "직매체" : "대행사"}</>
      )
    }
  },
  {
    name: 'username',
    header: '아이디',
    defaultWidth: 220, //가변 사이즈
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/platformUserDetail'} state={{id: props.data.id}}
              style={{display: 'inline-block', width: '100%', textAlign: "center"}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'managerName1',
    header: '담당자명'
  },
  {
    name: 'managerPhone1',
    header: '연락처',
    render: ({value}) => <span>{phoneNumFormat(value)}</span>
  },
  {
    name: 'createdAt',
    header: '생성 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'status',
    header: '사용 여부',
    render: ({value}) => {
      return (
        <>{value === 'NORMAL' ? "활성화" : "비활성화"}</>
      )
    }
  },
]

export const targetingTypeAll = [
  {id: "0", value: null, label: "전체"},
  {key: "1", value: 'SAW_THE_PRODUCT', label: '카트추천'},
  {key: "2", value: "CART_THE_PRODUCT", label: "상품추천"},
  {key: "3", value: 'DOMAIN_MATCHING', label: '유저매칭'},
  {key: "3", value: 'USER_OPTIMIZATION', label: '유저최적화'}
]


export const columnHistoryData = [
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 320, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={"/board/platformHistoryDetail"} style={{display: 'inline-block', width: '100%', textAlign: "center"}}
              state={cellProps.data.revisionId}>{value}</Link>
      )
    }
  },
  {
    name: 'id',
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
    name: 'publishYn',
    header: '게재상태',
    width: 80,
    resizeable: false,
    render: ({value}) => {
      return (
        <span>{value ? 'ON' : 'OFF'}</span>
      )
    }
  },
  {
    name: 'allowTargetings',
    header: '타겟팅 설정',
    render: ({value}) => {
      return (
        <span>{
          value.map((data, index) => {
            return (
              <p key={index}>{targetingTypeAll.find(type => type.value === data.targetingType)?.label + ':' + data.exposureWeight}</p>
            )
          })
        }</span>
      )
    }
  },
  {
    name: 'feeCalculations',
    header: '정산 정보 설정',
    render: ({value}) => {
      return (
        <span>{
          value.map((data, index) => {
            return (
              <p key={index}>{data.calculationType + '-' + data.calculationValue}</p>
            )
          })
        }</span>
      )
    }
  },
  {
    name: 'nonExposureConfigType',
    header: '대체광고',
    render: ({value}) => {
      const type = (value)=> {
        let label;
        if(value === 'NONE'){
          label = '없음'
        } else if (value === 'DEFAULT_BANNER_IMAGE'){
          label = '대체 이미지'
        } else if (value === 'JSON'){
          label = 'JSON DATA'
        } else label = value
        return label
      }
      return (
        <span>{type(value)}</span>
      )
    }
  },
  {
    name: 'revisionDateTime',
    header: '변경일시',
    defaultWidth: 250, //가변 사이즈
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일  HH시mm분ss초')}</span>
      )
    }
  },
  {
    name: 'modifiedBy',
    header: '변경자',
  }
]

export const mediaSearchTypeByHistory = [
  {id: "0", value: null, label: "전체"},
  {id: "1", value: "INVENTORY_NAME", label: "지면명"},
  {id: "2", value: "USER_ID", label: "아이디"},
  {id: "3", value: "INVENTORY_ID", label: "지면코드"},
  {id: "4", value: "MODIFIED_BY", label: "변경자"}
]

export const searchRevisionTypes = [
  {id: "0", value: null, label: "전체"},
  {id: "1", value: "MODIFIED_PUBLISH", label: "게재 상태"},
  {id: "2", value: "MODIFIED_PRODUCT", label: "광고 상품 설정"},
  {id: "3", value: "MODIFIED_FEE_CALCULATION", label: "정산 정보 설정"},
  {id: "4", value: "MODIFIED_DETAIL_SETTINGS", label: "지면 상세 설정"}
]


export const searchHistoryParams = {
  pageSize: 10,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate:  getToDay(),
  searchKeywordType: '',
  searchKeyword: null,
  sortType: null
}
export const searchAdExChangeParams = {
  pageSize: 10,
  currentPage: 1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getToDay(),
  searchKeywordType: '',
  searchKeyword: null,
  sortType: null
}

export const columnAdExChangeData = [
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 250, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    render: ({value, cellProps}) => {
      return (
        <Link to={"/board/platformAdExchangeDetail"} style={{display: 'inline-block', width: '100%', textAlign: "center"}}
              state={{
                revId: cellProps.data.revisionId,
                inventoryExchangeId: cellProps.data.id
              }}
        >{value}</Link>
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
    name: 'exchangePlatformType',
    header: '연동사',
    textAlign: 'center',
    width: 180,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false
  },
  {
    name: 'publishYn',
    header: '연동 설정',
    width: 80,
    render: ({value}) => {
      return (
        <span>{value ? 'ON' : 'OFF'}</span>
      )
    }
  },
  {
    name: 'params',
    header: 'KEY/VALUE 설정',
    width: 300,
    render: ({value}) => {
      return (
        <span>{
          value !== null ? value.slice(-1).map((data, index) => {
            return (
              <div key={index}>
                <p>{'KEY : '+ data.key}</p>
                <p>{'VALUE : '+ data.value}</p>
              </div>
            )
          }) : '-'
        }</span>
      )
    }
  },
  {
    name: 'exchangeOrder',
    header: '송출 순서 설정',
    render: ({value,data}) => {
      return ( <p>{value}</p>
      )
    }
  },
  {
    name: 'revisionDateTime',
    header: '변경일시',
    defaultWidth: 230, //가변 사이즈
    render: ({value}) => {

      return (
        <span>{moment(value).format('YYYY년 MM월 DD일  HH시mm시분ss초')}</span>
      )
    }
  },
  {
    name: 'modifiedBy',
    header: '변경자',
  }
]

export const adExChangeDetailInfo = {
  inventoryName: '네이트 중아',
  accountId: 'nate',
  inventoryCode: '213123',
  beforeUpdateDate: '2023-01-01',
  beforeUpdateName: '한란민',
  lastUpdateDate: '2023-01-01',
  lastUpdateName: '조규홍',
  adExChangeConfig: [
    {
      adExChangeName: '크리테오',
      beforePublication: false,
      lastPublication: true
    },
    {
      adExChangeName: '와이더플래닛',
      beforePublication: false,
      lastPublication: false
    },
  ],
  ParamsConfig: [
    {
      adExChangeName: '크리테오',
      beforeKey: '123123',
      beforeValue: '213213',
      lastKey: '123123',
      lastValue: '213213'
    },
    {
      adExChangeName: '와이더플래닛',
      beforeKey: 'mediaKey',
      beforeValue: '213213',
      lastKey: 'sdfsdf',
      lastValue: '2132sdfadf13'
    },
  ],
  rankingConfig: [
    {
      adExChangeName: '크리테오',
      beforeRankingValue: 1,
      lastRankingValue: 2,
    },
    {
      adExChangeName: '와이더플래닛',
      beforeRankingValue: 2,
      lastRankingValue: 3,
    },
    {
      adExChangeName: '아이엠',
      beforeRankingValue: 3,
      lastRankingValue: 1,
    }
  ]
}

