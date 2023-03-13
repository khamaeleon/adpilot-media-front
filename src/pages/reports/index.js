import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, ColSpan4, inputStyle, SearchButton} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import React, {useEffect, useRef, useState} from "react";
import {useAtom} from "jotai";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1,  ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType, ChartContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import {
  defaultCondition,
  reportsStaticsAll,
  reportsStaticsAllColumn,
  reportsStaticsAtom
} from "./entity";
import { ResponsiveBar } from '@nivo/bar'
import {selectReportsStaticsAll} from "../../services/ReportsAxios";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import Table from "../../components/table";

function MyResponsiveBar(props) {
  return (
    <ResponsiveBar
      data={props.data.rows.length > 20 ? props.data.rows.slice(-21,-1) : props.data.rows}
      keys={[props.chartKey]}
      indexBy="historyDate"
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={["#f5811f"]}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}

function Reports(){
  const [searchCondition, setSearchCondition] = useAtom(reportsStaticsAtom)
  const [dataStaticsAll, setDataStaticsAll] = useAtom(reportsStaticsAll)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [chartKey, setChartKey] = useState('proceedsAmount')

  const activeStyle = {borderBottom:'4px solid #f5811f'}

  /**
   * 데이타 페칭
   * @param event
   */
  useEffect(() => {
    async function fetchAndGetList() {
      const data = await selectReportsStaticsAll(searchCondition);
      console.log(data)
      if(data !== undefined){
        setDataStaticsAll(data)
      }
    }
    fetchAndGetList()
  },[])

  useEffect(() => {
    console.log(searchCondition)
    if(searchCondition.agentType.length == 4) {
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
        agentType: searchCondition.agentType.concat(event.currentTarget.id)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.filter(id => id !== event.currentTarget.id)
      })
    }
  }
  /**
   * 차트 키값 선택
   * @param event
   */
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleSearchCondition = async() => {
    const result = await selectReportsStaticsAll(searchCondition)
    setDataStaticsAll(result)
  }

  /**
   * 날짜 레인지 선택
   * @param event
   */
  const handleRangeDate = (rangeType) => {
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
   * @param event
   */
  const handleChangeProductType = (type) => {
    setSearchCondition({
      ...searchCondition,
      productType: type.value
    })
  }
  /**
   * 이벤트 타입 선택
   * @param event
   */
  const handleChangeEventType = (type) => {
    setSearchCondition({
      ...searchCondition,
      eventType: type.value
    })
  }
  /**
   * 외부연동 유무 선택
   * @param event
   */
  const handleChangeIsAdExchange = (type) => {
    setSearchCondition({
      ...searchCondition,
      isAdExchange: type.value
    })
  }
  /**
   * 디바이스 타입 선택
   * @param event
   */
  const handleChangeDeviceType = (type) => {
    setSearchCondition({
      ...searchCondition,
      deviceType: type.value
    })
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>기간별 보고서</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>광고상품</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.productType}
                          options={defaultCondition.productType}
                          onChange={handleChangeProductType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>이벤트</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.eventType}
                          options={defaultCondition.eventType}
                          onChange={handleChangeEventType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>외부연동 유무</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.isAdExchange}
                          options={defaultCondition.isAdExchange}
                          onChange={handleChangeIsAdExchange}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
              </ColSpan1>
              <ColSpan1/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          placeholder={'선택하세요'}
                          value={searchCondition.deviceType}
                          options={defaultCondition.deviceType}
                          onChange={handleChangeDeviceType}
                          components={{IndicatorSeparator: () => null}}/>
                </div>
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
                              isChecked={searchCondition.agentType.includes('WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'PC 어플리케이션'}
                              type={'c'}
                              id={'WEB_APP'}
                              isChecked={searchCondition.agentType.includes('WEB_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 웹'}
                              type={'c'}
                              id={'MOBILE_WEB'}
                              isChecked={searchCondition.agentType.includes('MOBILE_WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 어플리케이션'}
                              type={'c'}
                              id={'MOBILE_NATIVE_APP'}
                              isChecked={searchCondition.agentType.includes('MOBILE_NATIVE_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
            {/*line3*/}
            <RowSpan>
              <ColSpan2>
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
                      onChange={(date) => setDateRange(date)}
                      dateFormat="yyyy-MM-dd"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan2>
              <ColSpan4>
                <div>
                  <RangePicker>
                    <div onClick={() => handleRangeDate('thisMonth')}>이번달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastMonth')}>지난달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('today')}>오늘</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastDay')}>어제</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastWeekDay')}>지난7일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastThirtyDay')}>지난30일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastNinetyDay')}>지난90일</div>
                  </RangePicker>
                </div>
              </ColSpan4>
              <ColSpan1/>
            </RowSpan>
          </BoardSearchDetail>
          <ChartContainer style={{height:250}}>
            <ChartLabel>
              <div onClick={() => handleChangeChartKey('proceedsAmount')} style={chartKey==='proceedsAmount' ? activeStyle : null}>수익금</div>
              <div onClick={() => handleChangeChartKey('requestCount')} style={chartKey==='requestCount' ? activeStyle : null}>요청수</div>
              <div onClick={() => handleChangeChartKey('responseCount')} style={chartKey==='responseCount' ? activeStyle : null}>응답수</div>
              <div onClick={() => handleChangeChartKey('exposureCount')} style={chartKey==='exposureCount' ? activeStyle : null}>노출수</div>
              <div onClick={() => handleChangeChartKey('clickCount')} style={chartKey==='clickCount' ? activeStyle : null}>클릭수</div>
              <div onClick={() => handleChangeChartKey('costAmount')} style={chartKey==='costAmount' ? activeStyle : null}>비용</div>
            </ChartLabel>
            <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
            {dataStaticsAll?.rows?.length !== 0 &&
              <MyResponsiveBar data={dataStaticsAll} selectKey={chartKey}/>
            }
          </ChartContainer>
          <BoardSearchResult>
            <Table columns={reportsStaticsAllColumn}
                   data={dataStaticsAll.rows}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default Reports

const ChartLabel = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  & div {
    display: flex;
    align-items: center;
    height: 45px;
    cursor: pointer;
  }
`