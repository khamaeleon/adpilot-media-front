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
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {columnAdExChangeData, mediaSearchTypeByHistory, searchAdExChangeParams,} from "./entity/common";
import Table from "../../components/table";
import {selAdExChangeHistoryList} from "../../services/platform/HistoryAxios";
import {atom, useAtom} from "jotai";

const AdExChangeHistoryListInfo =atom([])
function PlatformAdExchange() {
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [searchAdExChangeParamsState, setSearchAdExChangeParamsState] = useState(searchAdExChangeParams)
  const [mediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)
  const [adExChangeHistoryList, setAdExChangeHistoryList] =useAtom(AdExChangeHistoryListInfo)
  const [pickedDate, setPickedDate] = useState('')

  useEffect(() => {
    selAdExChangeHistoryList(searchAdExChangeParamsState).then(response => {
      setAdExChangeHistoryList(response)
    })
  }, []);

  /**
   * 기간변 버튼 이벤트
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setPickedDate(rangeType)
    if (rangeType === 'thisMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDate: getLastNinetyDay().startDay,
        searchEndDate: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }
  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchKeywordType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchKeyword: event.target.value
    })
  }

  const searchAdExChangeHistoryInfo =()=>{
    selAdExChangeHistoryList(searchAdExChangeParamsState).then(response => {
      setAdExChangeHistoryList(response)
    })
  }
  return (
    <Board>
      <BoardHeader>애드 익스체인지 이력 관리</BoardHeader>
      <BoardSearchDetail>
        {/*line1*/}
        <RowSpan>
          <ColSpan1>
            <div>
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
            <div style={{width: '100%'}}>
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
            </div>
          </ColSpan2>
          <ColSpan1>
            <Select styles={inputStyle}
                    options={mediaSearchTypeByHistoryState}
                    value={searchAdExChangeParamsState.searchKeywordType !== '' ? mediaSearchTypeByHistoryState.find(option => option.value === searchAdExChangeParamsState.searchKeywordType) : {id: "0", value: "select", label: "선택"}}
                    onChange={handleMediaSearchTypeByHistory}
            />
          </ColSpan1>
          <ColSpan2>
            <SearchInput>
              <input type={'text'}
                     placeholder={'검색어를 입력해주세요.'}
                     value={searchAdExChangeParamsState.searchKeyword || ""}
                     onChange={handleMediaSearchValueByHistory}
                     onKeyDown={e => (e.key === 'Enter') && searchAdExChangeHistoryInfo()}
                     readOnly={(searchAdExChangeParamsState.searchKeywordType === '' || searchAdExChangeParamsState.searchKeywordType.value === 'select') ? true:false}
              />
            </SearchInput>
            <SearchButton onClick={searchAdExChangeHistoryInfo}>적용</SearchButton>
          </ColSpan2>
        </RowSpan>
      </BoardSearchDetail>
      <BoardTableContainer>
        <Table columns={columnAdExChangeData}
               rowHeight={60}
               totalCount={[adExChangeHistoryList !== null && adExChangeHistoryList.length, '이력']}
               idProperty="id"
               data={adExChangeHistoryList}/>
      </BoardTableContainer>
    </Board>
  )
}

export default PlatformAdExchange
