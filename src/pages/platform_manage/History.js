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

  const handleRangeDate = (rangeType) => {
    console.log('이번달: '+getThisMonth().endDay)
    console.log('지난달: '+JSON.stringify(getLastMonth()))
    console.log('오늘: '+getToDay())
    console.log('어제: '+getLastDay())
    console.log('지난7일'+JSON.stringify(getLastWeekDay()))
    console.log('지난30일'+JSON.stringify(getLastThirtyDay()))
    console.log('지난90일'+JSON.stringify(getLastNinetyDay()))
    if (rangeType === 'thisMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([getThisMonth().startDay, getThisMonth().endDay])
    } else if (rangeType === 'lastMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: moment(getLastMonth().startDay,'yyyy--mm-dd'),
        searchEndDay: moment(getLastMonth().endDay,'yyyy--mm-dd')
      })
    } else if (rangeType === 'today') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
    } else if (rangeType === 'lastDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
    } else if (rangeType === 'lastWeekDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
    } else if (rangeType === 'lastThirtyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
    } else if (rangeType === 'lastNinetyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
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
                      onChange={(date) => setDateRange(date)}
                      dateFormat="yyyy-mm-dd"
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
                    <div onClick={() => handleRangeDate('lastSevenDay')}>지난7일</div>
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
