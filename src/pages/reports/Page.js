import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, ColSpan2, inputStyle, SearchButton} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1,  ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType,
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  defaultCondition,
  reportsInventoryAtom,
  reportsStaticsInventory,
  reportsStaticsInventoryColumn
} from "./entity";
import {atom, useAtom} from "jotai/index";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {modalController} from "../../store";
import {selectReportsStaticsAll, selectReportsStaticsInventory} from "../../services/ReportsAxios";

const conditionInventory = atom(reportsInventoryAtom)

function ReportsPage(){
  const [searchCondition, setSearchCondition] = useAtom(conditionInventory)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(false)


  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        agentType: ['pc','pc-app','responsive','mobile','native','webapp']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        agentType: []
      })
    }
    setIsCheckedAll(event.target.checked)
    console.log(searchCondition.agentType)
  }

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

  const handleSearchCondition = async() => {
    const result = await selectReportsStaticsInventory()
    console.log(searchCondition)
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

  const handleChangeProductType = (type) => {
    setSearchCondition({
      ...searchCondition,
      productType: type
    })
  }
  const handleChangeEventType = (type) => {
    setSearchCondition({
      ...searchCondition,
      eventType: type
    })
  }
  const handleChangeIsAdExchange = (type) => {
    setSearchCondition({
      ...searchCondition,
      isAdExchange: type
    })
  }
  const handleChangeDeviceType = (type) => {
    setSearchCondition({
      ...searchCondition,
      deviceType: type
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
          <BoardHeader>지면별 보고서</BoardHeader>
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
                              id={'pc'}
                              isChecked={searchCondition.agentType.includes('pc') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'PC 어플리케이션'}
                              type={'c'}
                              id={'pc-app'}
                              isChecked={searchCondition.agentType.includes('pc-app') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'반응형웹'}
                              type={'c'}
                              id={'responsive'}
                              isChecked={searchCondition.agentType.includes('responsive') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'MOBILE 웹'}
                              type={'c'}
                              id={'mobile'}
                              isChecked={searchCondition.agentType.includes('mobile') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'Native App'}
                              type={'c'}
                              id={'native'}
                              isChecked={searchCondition.agentType.includes('native') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'WebApp'}
                              type={'c'}
                              id={'webapp'}
                              isChecked={searchCondition.agentType.includes('webapp') ? true : false}
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
          <BoardSearchResult>
            <Table columns={reportsStaticsInventoryColumn}
                   data={reportsStaticsInventory.rows}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default ReportsPage