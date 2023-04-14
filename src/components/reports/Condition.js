import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon, ColFraction,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer, DefaultButton,
  inputStyle,
  RangePicker,
  RowSpan, SearchButton,
  Span4
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
  const {searchCondition, setSearchCondition} = props
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
    if(searchCondition.agentType.length === 4) {
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
        agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP']
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
   * 이벤트 타입 선택
   * @param type
   */
  const handleChangeEventType = (type) => {
    setSearchCondition({
      ...searchCondition,
      eventType:type.value
    })
  }
  /**
   * 외부연동 유무 선택
   * @param type
   */
  const handleChangeIsAdExchange = (type) => {
    setSearchCondition({
      ...searchCondition,
      isAdExchange: type.value
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
      <RowSpan>
        <ColFraction>
          <ColTitle><span>광고상품</span></ColTitle>
          <Select styles={inputStyle}
            placeholder={'선택하세요'}
            value={defaultCondition.productType.find(item => item.value === searchCondition.productType)}
            options={defaultCondition.productType}
            onChange={handleChangeProductType}
            components={{IndicatorSeparator: () => null}}/>
        </ColFraction>
        <ColFraction>
          <ColTitle><span>이벤트</span></ColTitle>
          <Select styles={inputStyle}
                  placeholder={'선택하세요'}
                  value={defaultCondition.eventType.find(item => item.value === searchCondition.eventType)}
                  options={defaultCondition.eventType}
                  onChange={handleChangeEventType}
                  components={{IndicatorSeparator: () => null}}/>
        </ColFraction>
        <ColFraction>
          <Span4><span>외부연동 유무</span></Span4>
          <Select styles={inputStyle}
                  placeholder={'선택하세요'}
                  value={defaultCondition.isAdExchange.find(item => item.value === searchCondition.isAdExchange)}
                  options={defaultCondition.isAdExchange}
                  onChange={handleChangeIsAdExchange}
                  components={{IndicatorSeparator: () => null}}/>
        </ColFraction>
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
        <ColSpan3>
          <ColTitle><span>에이전트 유형</span></ColTitle>
          <div>
            <AgentType>
              <Checkbox label={'전체'}
                        type={'c'}
                        id={'all'}
                        isChecked={isCheckedAll}
                        onChange={handleChangeCheckAll}
              />
              <Checkbox label={'PC 웹'}
                        type={'c'}
                        id={'WEB'}
                        value={'WEB'}
                        isChecked={!!searchCondition.agentType.includes('WEB')}
                        onChange={handleChangeCheck}/>
              <Checkbox label={'PC 어플리케이션'}
                        type={'c'}
                        id={'WEB_APP'}
                        value={'WEB_APP'}
                        isChecked={!!searchCondition.agentType.includes('WEB_APP')}
                        onChange={handleChangeCheck}/>
              <Checkbox label={'모바일 웹'}
                        type={'c'}
                        id={'MOBILE_WEB'}
                        value={'MOBILE_WEB'}
                        isChecked={!!searchCondition.agentType.includes('MOBILE_WEB')}
                        onChange={handleChangeCheck}/>
              <Checkbox label={'모바일 어플리케이션'}
                        type={'c'}
                        id={'MOBILE_NATIVE_APP'}
                        value={'MOBILE_NATIVE_APP'}
                        isChecked={!!searchCondition.agentType.includes('MOBILE_NATIVE_APP')}
                        onChange={handleChangeCheck}/>
            </AgentType>
          </div>
        </ColSpan3>
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
        <ColSpan3>
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
        </ColSpan3>
        <ColSpan1>
          {/*<SearchButton onClick={props.onSearch}>검색</SearchButton>*/}
        </ColSpan1>
      </RowSpan>
    </BoardSearchDetail>
  )
}