import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";
import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {columnHistoryData, columnHistorySetting, historyListInfo, mediaSearchTypeByHistory} from "./entity";
import {searchHistoryParams} from "./entity";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {json} from "react-router-dom";

function PlatformHistory() {

  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchHistoryParamsState, setSearchHistoryParamsState] = useState(searchHistoryParams)
  const [mediaSearchTypeByHistoryState, setMediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)

  useEffect(() => {
    console.log(searchHistoryParamsState)
    if (!searchHistoryParamsState.eventType && !searchHistoryParamsState.eventTypeValue && !searchHistoryParamsState.calculationType && !searchHistoryParamsState.noExposedConfigType) {
      setIsCheckedAll(false)

    } else if (searchHistoryParamsState.eventType && searchHistoryParamsState.eventTypeValue && searchHistoryParamsState.calculationType && searchHistoryParamsState.noExposedConfigType) {
      setIsCheckedAll(true)

    } else {
      setIsCheckedAll(false)

    }
  }, [searchHistoryParamsState, isCheckedAll]);
  useEffect(() => {
    console.log(startDate)
    console.log(endDate)
  },[dateRange])
  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      eventType: event.target.checked,
      eventTypeValue: event.target.checked,
      calculationType: event.target.checked,
      noExposedConfigType: event.target.checked
    })
  }

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if (event.target.id === 'eventType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        eventType: event.target.checked
      })
    }
    if (event.target.id === 'eventTypeValue') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        eventTypeValue: event.target.checked
      })
    }
    if (event.target.id === 'calculationType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        calculationType: event.target.checked
      })
    }
    if (event.target.id === 'noExposedConfigType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        noExposedConfigType: event.target.checked
      })
    }
  }

  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      searchType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      searchValue: event.target.value
    })
  }
  /**
   * 기간변 버튼 이벤트
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastMonth().startDay,
        searchEndDay: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 이력 관리</BoardHeader>
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
                    <Checkbox label={'이벤트 설정'}
                              type={'c'}
                              id={'eventType'}
                              isChecked={searchHistoryParamsState.eventType}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'이벤트 단가'}
                              type={'c'}
                              id={'eventTypeValue'}
                              isChecked={searchHistoryParamsState.eventTypeValue}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'정산 정보'}
                              type={'c'}
                              id={'calculationType'}
                              isChecked={searchHistoryParamsState.calculationType}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'미송출 설정'}
                              type={'c'}
                              id={'noExposedConfigType'}
                              isChecked={searchHistoryParamsState.noExposedConfigType}
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
                      locale={ko}
                      onChange={(date) => setDateRange(date)}
                      dateFormat="yyyy-MM-dd"
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
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={mediaSearchTypeByHistoryState}
                        value={(searchHistoryParamsState.searchType !== undefined && searchHistoryParamsState.searchType.value !== '') ? searchHistoryParamsState.searchType : {
                          id: "1",
                          value: "all",
                          label: "전체"
                        }}
                        onChange={handleMediaSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchHistoryParamsState.searchValue}
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
            <Table columns={columnHistoryData}
                   data={historyListInfo}
                   settings={columnHistorySetting}/>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformHistory
