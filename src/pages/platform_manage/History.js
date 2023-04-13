import Select from "react-select";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  inputStyle,
  RangePicker,
  RowSpan,
  SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import React, {useEffect, useState} from "react";
import Table from "../../components/table";
import {columnHistoryData, mediaSearchTypeByHistory, searchHistoryParams} from "./entity/common";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {selHistoryList} from "../../services/platform/HistoryAxios";
import {atom, useAtom} from "jotai";

const HistoryListInfo =atom([])
function PlatformHistory() {
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [searchHistoryParamsState, setSearchHistoryParamsState] = useState(searchHistoryParams)
  const [mediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)
  const [historyListInfo, setHistoryListInfo] =useAtom(HistoryListInfo)
  const [pickedDate, setPickedDate] = useState('')

  useEffect(() => {
    selHistoryList(searchHistoryParamsState).then(response =>{
      setHistoryListInfo(response)
    })
  },[])

  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      searchKeywordType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      searchKeyword: event.target.value
    })
  }

  /**
   * 기간변 버튼 이벤트
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setPickedDate(rangeType)
    if (rangeType === 'thisMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        searchStartDate: getLastNinetyDay().startDay,
        searchEndDate: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
  }

  const searchHistoryInfo =()=>{
    selHistoryList(searchHistoryParamsState).then(response =>{
      setHistoryListInfo(response)
    })
  }

  return (
    <Board>
      <BoardHeader>지면 이력 관리</BoardHeader>
      <BoardSearchDetail>
        {/*line1*/}
        <RowSpan>
          <ColSpan1>
            <ColTitle><span>기간</span></ColTitle>
            <div>
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
          </ColSpan1>
          <ColSpan2>
            <RangePicker>
              <div onClick={() => handleRangeDate('thisMonth')} style={pickedDate === 'thisMonth' ? {color:'#f5811f'}:null}>이번달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastMonth')} style={pickedDate === 'lastMonth' ? {color:'#f5811f'}:null}>지난달</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('today')} style={pickedDate === 'today' ? {color:'#f5811f'}:null}>오늘</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastDay')} style={pickedDate === 'lastDay' ? {color:'#f5811f'}:null}>어제</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastWeekDay')} style={pickedDate === 'lastWeekDay' ? {color:'#f5811f'}:null}>지난7일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastThirtyDay')} style={pickedDate === 'lastThirtyDay' ? {color:'#f5811f'}:null}>지난30일</div>
              <HorizontalRule style={{margin: "0 10px"}}/>
              <div onClick={() => handleRangeDate('lastNinetyDay')} style={pickedDate === 'lastNinetyDay' ? {color:'#f5811f'}:null}>지난90일</div>
            </RangePicker>
          </ColSpan2>
          <ColSpan1/>
        </RowSpan>
        <RowSpan>
          <ColSpan1>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={mediaSearchTypeByHistoryState}
                    value={mediaSearchTypeByHistoryState.find(option => option.value === searchHistoryParamsState.searchKeywordType)}
                    onChange={handleMediaSearchTypeByHistory}
            />
          </ColSpan1>
          <ColSpan2>
            <SearchInput>
              <input type={'text'}
                     placeholder={'검색할 매체명을 입력해주세요.'}
                     value={searchHistoryParamsState.searchKeyword || ""}
                     onChange={handleMediaSearchValueByHistory}
              />
            </SearchInput>
          </ColSpan2>
          <ColSpan2>
            <SearchButton onClick={searchHistoryInfo}>검색</SearchButton>
          </ColSpan2>
        </RowSpan>
      </BoardSearchDetail>
      <BoardTableContainer>
        <Table columns={columnHistoryData}
               data={historyListInfo ? historyListInfo : []}/>
      </BoardTableContainer>
    </Board>
  )
}

export default PlatformHistory
