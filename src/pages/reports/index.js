import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, inputStyle, SearchButton} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import React, { useEffect, useState} from "react";
import { modalController} from "../../store";
import {useAtom} from "jotai";
import {ModalBody, ModalHeader} from "../../components/modal/Modal";
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
import Table from "../../components/table";
import {defaultCondition, reportsStaticsAll, reportsStaticsAllColumn} from "./entity";
import { ResponsiveBar } from '@nivo/bar'
import {selectReportsStaticsAll} from "../../services/ReportsAxios";
import {atom} from "jotai/index";
import SelectBox from "../../components/common/SelectBox";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";


function MyResponsiveBar(props) {
  return (
    <ResponsiveBar
      data={reportsStaticsAll.rows}
      keys={[props.data]}
      indexBy="historyDate"
      margin={{top: 40, right: 130, bottom: 130, left: 60}}
      padding={0.75}
      width={1100}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={{scheme: 'nivo'}}
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



function ComponentModal(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>광고상품</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>이벤트</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>외부연동 유무</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>에이전트 유형</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'} type={'c'} id={'all'} onChange={() => { return null }}/>
                    <Checkbox label={'PC 웹'} type={'c'} id={'pc'} onChange={() => { return null }}/>
                    <Checkbox label={'PC 어플리케이션'} type={'c'} id={'pc-app'} onChange={() => { return null }}/>
                    <Checkbox label={'반응형웹'} type={'c'} id={'responsive'} onChange={() => { return null }}/>
                    <Checkbox label={'MOBILE 웹'} type={'c'} id={'mobile'} onChange={() => { return null }}/>
                    <Checkbox label={'Native App'} type={'c'} id={'native'} onChange={() => { return null }}/>
                    <Checkbox label={'WebApp'} type={'c'} id={'webapp'} onChange={() => { return null }}/>
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
                      onChange={(date) => setDateRange(date)}
                      dateFormat="MM월 dd일"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan1>
              <ColSpan3>
                <div>
                  <RangePicker>
                    <div>이번달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>오늘</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>어제</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난7일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난30일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난90일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난 180일</div>
                  </RangePicker>
                </div>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}

const condition = atom(defaultCondition)

function Reports(){
  const [searchCondition, setSearchCondition] = useAtom(condition)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [chartKey, setChartKey] = useState('proceedsAmount')
  const [modal, setModal] = useAtom(modalController)

  const activeStyle = {borderBottom:'4px solid #f5811f'}


  useEffect(()=>{
    setModal({
      isShow: false,
      width: 1500,
      modalComponent: () => {
        return <ComponentModal/>
      }
    })
  },[])

  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)

  }

  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  const handleSearchCondition = async() => {
    const result = await selectReportsStaticsAll()
    console.log(result)
  }

  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastMonth().startDay,
        searchEndDay: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
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
                <div><Select styles={inputStyle} options={defaultCondition.productType} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>이벤트</span></ColTitle>
                <div><Select styles={inputStyle} options={defaultCondition.eventType} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>외부연동 유무</span></ColTitle>
                <div><Select styles={inputStyle} options={defaultCondition.isAdExchange} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div><Select styles={inputStyle}  options={defaultCondition.deviceType} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>에이전트 유형</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeSelectAll}
                    />
                    <Checkbox label={'PC 웹'} type={'c'} id={'pc'} onChange={() => { return null }}/>
                    <Checkbox label={'PC 어플리케이션'} type={'c'} id={'pc-app'} onChange={() => { return null }}/>
                    <Checkbox label={'반응형웹'} type={'c'} id={'responsive'} onChange={() => { return null }}/>
                    <Checkbox label={'MOBILE 웹'} type={'c'} id={'mobile'} onChange={() => { return null }}/>
                    <Checkbox label={'Native App'} type={'c'} id={'native'} onChange={() => { return null }}/>
                    <Checkbox label={'WebApp'} type={'c'} id={'webapp'} onChange={() => { return null }}/>
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
              </ColSpan2>
              <ColSpan1>
                <div>
                  <SearchButton onClick={handleSearchCondition}>검색</SearchButton>
                </div>
              </ColSpan1>
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
            <MyResponsiveBar data={chartKey}/>
          </ChartContainer>
          <BoardSearchResult>
            <Table columns={reportsStaticsAllColumn}
                   data={reportsStaticsAll.rows}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default Reports

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`

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