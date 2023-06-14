import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  inputStyle,
  RangePicker,
  RowSpan
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

export function ReportsCondition(props) {
  const {searchCondition, setSearchCondition, setChartPageSize, modalStyle} = props
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [dayType, setDayType] = useState('')

  useEffect(() => {
    setSearchCondition({
      ...searchCondition,
      searchStartDate: moment(dateRange[0]).format('YYYY-MM-DD'),
      searchEndDate: moment(dateRange[1]).format('YYYY-MM-DD')
    })
  },[dateRange])

  useEffect(() => {
    if(searchCondition.agentType.length === defaultCondition.agentType.length) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchCondition]);
  /**
   * 에이전트 타입 전체 체크
   * @param event
   */
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        agentType: defaultCondition.agentType.map(obj => obj.value)
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        agentType: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }
  /**
   * 에이전트 타입 체크
   * @param event
   */
  const handleChangeCheck = (event) => {
    if(event.currentTarget.checked){
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.concat(event.currentTarget.value)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.filter(id => id !== event.currentTarget.value)
      })
    }
  }

  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setDayType(rangeType)
    if (rangeType === 'thisMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchCondition({
        ...searchCondition,
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
    setSearchCondition({
      ...searchCondition,
      productType: type.value
    })
  }
  /**
   * 타겟팅 타입 선택
   * @param type
   */
  const handleChangeTargetingType = (type) => {
    setSearchCondition({
      ...searchCondition,
      targetingType:type.value
    })
  }
  /**
   * 외부연동 유무 선택
   * @param type
   */
  const handleChangeExchangeSearchType = (type) => {
    setSearchCondition({
      ...searchCondition,
      exchangeSearchType: type.value
    })
  }
  /**
   * 디바이스 타입 선택
   * @param type
   */
  const handleChangeDeviceType = (type) => {
    setSearchCondition({
      ...searchCondition,
      deviceType: type.value
    })
  }
  return (
    <BoardSearchDetail>
      {/*line1*/}
      <RowSpan style={modalStyle && {marginTop:0}}>
        <ColSpan1>
          <ColTitle><span>광고상품</span></ColTitle>
          <Select styles={inputStyle}
            placeholder={'선택하세요'}
            value={defaultCondition.productType.find(item => item.value === searchCondition.productType)}
            options={defaultCondition.productType}
            onChange={handleChangeProductType}
            components={{IndicatorSeparator: () => null}}/>
        </ColSpan1>
        <ColSpan1>
          <ColTitle><span>타게팅</span></ColTitle>
          <Select styles={inputStyle}
                  placeholder={'선택하세요'}
                  value={defaultCondition.targetingType.find(item => item.value === searchCondition.targetingType)}
                  options={defaultCondition.targetingType}
                  onChange={handleChangeTargetingType}
                  components={{IndicatorSeparator: () => null}}/>
        </ColSpan1>
        <ColSpan1>
          <ColTitle><span>외부연동 유무</span></ColTitle>
          <div style={{width: '85%'}}>
            <Select styles={inputStyle}
                    placeholder={'선택하세요'}
                    value={defaultCondition.exchangeSearchType.find(item => item.value === searchCondition.exchangeSearchType)}
                    options={defaultCondition.exchangeSearchType}
                    onChange={handleChangeExchangeSearchType}
                    components={{IndicatorSeparator: () => null}}/>
          </div>
        </ColSpan1>
      </RowSpan>
      {/*line2*/}
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>디바이스</span></ColTitle>
          <Select styles={inputStyle}
                  placeholder={'선택하세요'}
                  value={defaultCondition.deviceType.find(item => item.value === searchCondition.deviceType)}
                  options={defaultCondition.deviceType}
                  onChange={handleChangeDeviceType}
                  components={{IndicatorSeparator: () => null}}/>
        </ColSpan1>
        <ColSpan2 style={{width: 'calc(50% + 30px)'}}>
          <ColTitle><span>에이전트 유형</span></ColTitle>
          <div>
            <AgentType>
              <Checkbox label={'전체'}
                        type={'c'}
                        id={'all'}
                        isChecked={isCheckedAll}
                        onChange={handleChangeCheckAll}
              />
              {
                searchCondition !== undefined && defaultCondition.agentType.map( (obj, key) => {
                  return (
                    <Checkbox label={obj.label}
                              type={'c'}
                              id={obj.value}
                              value={obj.value}
                              isChecked={!!searchCondition.agentType.includes(obj.value)}
                              onChange={handleChangeCheck}
                              key={key}
                    />
                  )
                })
              }
            </AgentType>
          </div>
        </ColSpan2>
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
              <div onClick={() => handleRangeDate('thisMonth')} style={dayType === 'thisMonth' ? {color: '#f5811f'} : null}>이번달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastMonth')} style={dayType === 'lastMonth' ? {color: '#f5811f'} : null}>지난달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('today')} style={dayType === 'today' ? {color: '#f5811f'} : null}>오늘</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastDay')} style={dayType === 'lastDay' ? {color: '#f5811f'} : null}>어제</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastWeekDay')} style={dayType === 'lastWeekDay' ? {color: '#f5811f'} : null}>지난7일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastThirtyDay')} style={dayType === 'lastThirtyDay' ? {color: '#f5811f'} : null}>지난30일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastNinetyDay')} style={dayType === 'lastNinetyDay' ? {color: '#f5811f'} : null}>지난90일</div>
            </RangePicker>
          </div>
        </ColSpan2>
        <ColSpan1>
          {/*<SearchButton onClick={props.onSearch}>검색</SearchButton>*/}
        </ColSpan1>
      </RowSpan>
    </BoardSearchDetail>
  )
}