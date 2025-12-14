import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  Input,
  inputStyle,
  RangePicker,
  ResetButton,
  RowSpan,
  SearchButton
} from "../../assets/GlobalStyles";
import Select from "react-select";
import {defaultCondition} from "../../pages/reports/entity/common";
import Checkbox from "../common/Checkbox";
import ko from "date-fns/locale/ko";
import {HorizontalRule} from "../common/Common";
import React, {useEffect, useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import moment from "moment/moment";
import {confirmAlert} from "react-confirm-alert";
import {SearchUser} from "../common/SearchUser";
import {useAtomValue} from "jotai";
import {tokenResultAtom} from "../../pages/login/entity";

const mainColor = "#1E3A8A";
export function ReportsCondition(props) {
  const {searchState, setSearchState, setChartPageSize, modalStyle, onSearch, searchMediaInfo, searchMedia, searchMediaReset} = props
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [dayType, setDayType] = useState('')
  const tokenInfoState = useAtomValue(tokenResultAtom)

  useEffect(() => {
    setSearchState({
      ...searchState,
      searchStartDate: moment(dateRange[0]).format('YYYY-MM-DD'),
      searchEndDate: moment(dateRange[1]).format('YYYY-MM-DD')
    })
  },[dateRange])

  useEffect(() => {
    if(searchState.agentType.length === defaultCondition.agentType.length) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchState]);
  /**
   * 에이전트 타입 전체 체크
   * @param event
   */
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchState({
        ...searchState,
        agentType: defaultCondition.agentType.map(obj => obj.value)
      })
      setIsCheckedAll(event.target.checked)
    }
  }
  /**
   * 에이전트 타입 체크
   * @param event
   */
  const handleChangeCheck = (event) => {
    if(event.currentTarget.checked){
      setSearchState({
        ...searchState,
        agentType: searchState.agentType.concat(event.currentTarget.value)
      })
    }else{
      if(searchState.agentType.length > 1) {
        setSearchState({
          ...searchState,
          agentType: searchState.agentType.filter(
              id => id !== event.currentTarget.value)
        })
      }
    }
  }

  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setDayType(rangeType)
    if (rangeType === 'thisMonth') {
      setSearchState({
        ...searchState,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchState({
        ...searchState,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastNinetyDay().startDay,
        searchEndDate: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
      setChartPageSize !== undefined && setChartPageSize(90)
    }
    //call 때려
  }

  /**
   * 광고상품 선택
   * @param type
   */
  const handleChangeProductType = (type) => {
    setSearchState({
      ...searchState,
      productType: type.value
    })
  }
  /**
   * 타겟팅 타입 선택
   * @param type
   */
  const handleChangeTargetingType = (type) => {
    setSearchState({
      ...searchState,
      targetingType:type.value
    })
  }
  /**
   * 외부연동 유무 선택
   * @param type
   */
  const handleChangeExchangeSearchType = (type) => {
    setSearchState({
      ...searchState,
      exchangeSearchType: type.value
    })
  }
  /**
   * 디바이스 타입 선택
   * @param type
   */
  const handleChangeDeviceType = (type) => {
    setSearchState({
      ...searchState,
      deviceType: type.value
    })
  }
  return (
    <BoardSearchDetail>
      {tokenInfoState.role !== 'NORMAL' && searchMediaInfo !== undefined &&
      <RowSpan>
        <ColSpan3>
          <ColTitle><span>매체사</span></ColTitle>
          <Input
            style={{width: 300}}
            value={searchMediaInfo?.siteName || '전체'}
            readOnly
          />
          <SearchUser title={'매체 계정 검색'} onSubmit={searchMedia} btnStyle={'SearchUser'}/>
          <ResetButton onClick={searchMediaReset}>매체 전체</ResetButton>
        </ColSpan3>
      </RowSpan>
      }
      {/*line1*/}
      <RowSpan style={modalStyle && {marginTop:0}}>
        <ColSpan1>
          <ColTitle><span>광고상품</span></ColTitle>
          <Select styles={inputStyle}
            placeholder={'선택하세요'}
            value={defaultCondition.productType.find(item => item.value === searchState.productType)}
            options={defaultCondition.productType}
            onChange={handleChangeProductType}
            components={{IndicatorSeparator: () => null}}/>
        </ColSpan1>
        {/*<ColSpan1>*/}
        {/*  <ColTitle><span>타겟팅</span></ColTitle>*/}
        {/*  <Select styles={inputStyle}*/}
        {/*          placeholder={'선택하세요'}*/}
        {/*          value={defaultCondition.targetingType.find(item => item.value === searchState.targetingType)}*/}
        {/*          options={defaultCondition.targetingType}*/}
        {/*          onChange={handleChangeTargetingType}*/}
        {/*          components={{IndicatorSeparator: () => null}}/>*/}
        {/*</ColSpan1>*/}
        {/*<ColSpan1>*/}
        {/*  <ColTitle><span>외부연동 유무</span></ColTitle>*/}
        {/*  <div style={{width: '85%'}}>*/}
        {/*    <Select styles={inputStyle}*/}
        {/*            placeholder={'선택하세요'}*/}
        {/*            value={defaultCondition.exchangeSearchType.find(item => item.value === searchState.exchangeSearchType)}*/}
        {/*            options={defaultCondition.exchangeSearchType}*/}
        {/*            onChange={handleChangeExchangeSearchType}*/}
        {/*            components={{IndicatorSeparator: () => null}}/>*/}
        {/*  </div>*/}
        {/*</ColSpan1>*/}
      </RowSpan>
      {/*line2*/}
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>디바이스</span></ColTitle>
          <Select styles={inputStyle}
                  placeholder={'선택하세요'}
                  value={defaultCondition.deviceType.find(item => item.value === searchState.deviceType)}
                  options={defaultCondition.deviceType}
                  onChange={handleChangeDeviceType}
                  components={{IndicatorSeparator: () => null}}/>
        </ColSpan1>
        {/*<ColSpan2 style={{width: 'calc(50% + 30px)'}}>*/}
        {/*  <ColTitle><span>에이전트</span></ColTitle>*/}
        {/*  <div>*/}
        {/*    <AgentType>*/}
        {/*      <Checkbox label={'전체'}*/}
        {/*                type={'c'}*/}
        {/*                id={'all'}*/}
        {/*                isChecked={isCheckedAll}*/}
        {/*                onChange={handleChangeCheckAll}*/}
        {/*      />*/}
        {/*      {*/}
        {/*        searchState !== undefined && defaultCondition.agentType.map( (obj, key) => {*/}
        {/*          return (*/}
        {/*            <Checkbox label={obj.label}*/}
        {/*                      type={'c'}*/}
        {/*                      id={obj.value}*/}
        {/*                      value={obj.value}*/}
        {/*                      isChecked={!!searchState.agentType.includes(obj.value)}*/}
        {/*                      onChange={handleChangeCheck}*/}
        {/*                      key={key}*/}
        {/*            />*/}
        {/*          )*/}
        {/*        })*/}
        {/*      }*/}
        {/*    </AgentType>*/}
        {/*  </div>*/}
        {/*</ColSpan2>*/}
      </RowSpan>
      {/*line3*/}
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>기간</span></ColTitle>
          <div style={{width:'100%'}}>
            <DateContainer>
              <CalendarBox>
                <CalendarIcon/>
              </CalendarBox>
              <CustomDatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                onChange={(date) => setDateRange(date)}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                isClearable={false}
              />
            </DateContainer>
          </div>
        </ColSpan1>
        <ColSpan2>
          <div>
            <RangePicker>
              <div onClick={() => handleRangeDate('thisMonth')} style={dayType === 'thisMonth' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>이번달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastMonth')} style={dayType === 'lastMonth' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>지난달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('today')} style={dayType === 'today' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>오늘</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastDay')} style={dayType === 'lastDay' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>어제</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastWeekDay')} style={dayType === 'lastWeekDay' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>지난7일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastThirtyDay')} style={dayType === 'lastThirtyDay' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>지난30일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastNinetyDay')} style={dayType === 'lastNinetyDay' ? {color: `${mainColor}`, fontWeight: "bold"} : null}>지난90일</div>
            </RangePicker>
          </div>
        </ColSpan2>
        <ColSpan1>
          <SearchButton onClick={()=>{
            dateRange[1] !== null ? onSearch() : confirmAlert({
              title: '알림',
              message: '검색 종료일을 선택해 주세요.',
              buttons: [
                {
                  label: '확인',
                }
              ]
            })
          }}>적용</SearchButton>
        </ColSpan1>
      </RowSpan>
    </BoardSearchDetail>
  )
}