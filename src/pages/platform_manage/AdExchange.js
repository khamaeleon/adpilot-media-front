import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import React, {useEffect, useState} from "react";

import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, BoardSearchResultTitle, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {
  adExChangeListInfo,
  columnAdExChangeData, columnAdExChangeSetting,
  mediaSearchTypeByHistory,
  searchAdExChangeParams
} from "./entity";
import Table from "../../components/table";

function PlatformAdExchange() {
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchAdExChangeParamsState, setSearchAdExChangeParamsState] = useState(searchAdExChangeParams)
  const [mediaSearchTypeByHistoryState, setMediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)

  useEffect(() => {
    if (!searchAdExChangeParamsState.adExchangeConfig && !searchAdExChangeParamsState.paramsConfig && !searchAdExChangeParamsState.rankingConfig) {
      setIsCheckedAll(false)

    } else if (searchAdExChangeParamsState.adExchangeConfig && searchAdExChangeParamsState.paramsConfig && searchAdExChangeParamsState.rankingConfig) {
      setIsCheckedAll(true)

    } else {
      setIsCheckedAll(false)

    }
  }, [searchAdExChangeParamsState, isCheckedAll]);

  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      adExchangeConfig: event.target.checked,
      paramsConfig: event.target.checked,
      rankingConfig: event.target.checked
    })
  }

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if (event.target.id === 'adExchangeConfig') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        adExchangeConfig: event.target.checked
      })
    }
    if (event.target.id === 'paramsConfig') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        paramsConfig: event.target.checked
      })
    }
    if (event.target.id === 'rankingConfig') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        rankingConfig: event.target.checked
      })
    }
  }
  /**
   * 기간변 버튼 이벤트
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastMonth().startDay,
        searchEndDay: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }
  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchValue: event.target.value
    })
  }
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>애드 익스체인지 이력 관리</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan3>
                <ColTitle><span>변경 항목</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeSelectAll}
                    />
                    <Checkbox label={'연동 상태'}
                              type={'c'}
                              id={'adExchangeConfig'}
                              isChecked={searchAdExChangeParamsState.adExchangeConfig}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'KEY/VALUE 설정'}
                              type={'c'}
                              id={'paramsConfig'}
                              isChecked={searchAdExChangeParamsState.paramsConfig}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'송출 순서'}
                              type={'c'}
                              id={'rankingConfig'}
                              isChecked={searchAdExChangeParamsState.rankingConfig}
                              onChange={handleChangeChecked}/>
                  </AgentType>
                </div>
              </ColSpan3>
              <ColSpan2>
                <ColTitle><span>기간</span></ColTitle>
                <div style={{width: '100%'}}>
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
              <ColSpan3>
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
              </ColSpan3>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={mediaSearchTypeByHistoryState}
                        value={(searchAdExChangeParamsState.searchType !== undefined && searchAdExChangeParamsState.searchType.value !== '') ? searchAdExChangeParamsState.searchType : {
                          id: "1",
                          value: "all",
                          label: "전체"
                        }}
                        onChange={handleMediaSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAdExChangeParamsState.searchValue}
                         onChange={handleMediaSearchValueByHistory}
                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <Table columns={columnAdExChangeData}
                   data={adExChangeListInfo}
                   settings={columnAdExChangeSetting}/>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdExchange
