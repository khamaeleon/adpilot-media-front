import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {modalController} from "../../store";
import {atom, useAtom} from "jotai";
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
import {
  searchAccountHistoryParams,
  accountHistoryData,
  accountHistorySetting,
  mediaSearchTypeByHistory,
  accountHistoryColumns, accountProfile
} from "./entity";
import {getToDay} from "../../common/DateUtils";
import {accountHistoryTableData} from "../../services/AccountAxios";

const AccountHistoryData = atom(accountHistoryData)

function AccountHistory() {

  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountHistoryParams)
  const [mediaSearchTypeByHistoryState, setMediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)
  const [accountHistoryData, setAccountHistoryData] = useState(AccountHistoryData)

  useEffect(() => {
    accountHistoryTableData('test').then(response => {
      setAccountHistoryData(response)
      console.log(response)
    })
  }, []);
  useEffect(() => {
    if (!searchAccountHistoryParamsState.invoiceRequest && !searchAccountHistoryParamsState.carryOverRequest && !searchAccountHistoryParamsState.examinedCompleted && !searchAccountHistoryParamsState.reject && !searchAccountHistoryParamsState.paymentCompleted && !searchAccountHistoryParamsState.withheldPayment  && !searchAccountHistoryParamsState.revenueIncrease && !searchAccountHistoryParamsState.revenueDecrease) {
      setIsCheckedAll(false)

    } else if (searchAccountHistoryParamsState.invoiceRequest && searchAccountHistoryParamsState.carryOverRequest && searchAccountHistoryParamsState.examinedCompleted && searchAccountHistoryParamsState.reject && searchAccountHistoryParamsState.paymentCompleted && searchAccountHistoryParamsState.withheldPayment  && searchAccountHistoryParamsState.revenueIncrease && searchAccountHistoryParamsState.revenueDecrease) {
      setIsCheckedAll(true)

    } else {
      setIsCheckedAll(false)

    }
  }, [searchAccountHistoryParamsState, isCheckedAll]);
  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      invoiceRequest: event.target.checked,
      carryOverRequest: event.target.checked,
      examinedCompleted: event.target.checked,
      reject: event.target.checked,
      paymentCompleted: event.target.checked,
      withheldPayment: event.target.checked,
      revenueIncrease: event.target.checked,
      revenueDecrease: event.target.checked,
    })
  }

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if (event.target.id === 'invoiceRequest') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        invoiceRequest: event.target.checked
      })
    }
    if (event.target.id === 'carryOverRequest') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        carryOverRequest: event.target.checked
      })
    }
    if (event.target.id === 'examinedCompleted') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        examinedCompleted: event.target.checked
      })
    }
    if (event.target.id === 'reject') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        reject: event.target.checked
      })
    }
    if (event.target.id === 'paymentCompleted') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        paymentCompleted: event.target.checked
      })
    }
    if (event.target.id === 'withheldPayment') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        withheldPayment: event.target.checked
      })
    }
    if (event.target.id === 'revenueIncrease') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        revenueIncrease: event.target.checked
      })
    }
    if (event.target.id === 'revenueDecrease') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        revenueDecrease: event.target.checked
      })
    }
  }

  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      searchType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      searchValue: event.target.value
    })
  }

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>정산 이력</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
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
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>신청 상태</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeSelectAll}
                    />
                    <Checkbox label={'정산 신청'}
                              type={'c'}
                              id={'invoiceRequest'}
                              isChecked={searchAccountHistoryParamsState.invoiceRequest}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'이월 신청'}
                              type={'c'}
                              id={'carryOverRequest'}
                              isChecked={searchAccountHistoryParamsState.carryOverRequest}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'심사 완료'}
                              type={'c'}
                              id={'examinedCompleted'}
                              isChecked={searchAccountHistoryParamsState.examinedCompleted}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'반려'}
                              type={'c'}
                              id={'reject'}
                              isChecked={searchAccountHistoryParamsState.reject}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 완료'}
                              type={'c'}
                              id={'paymentCompleted'}
                              isChecked={searchAccountHistoryParamsState.paymentCompleted}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 보류'}
                              type={'c'}
                              id={'withheldPayment'}
                              isChecked={searchAccountHistoryParamsState.withheldPayment}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 증가'}
                              type={'c'}
                              id={'revenueIncrease'}
                              isChecked={searchAccountHistoryParamsState.revenueIncrease}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 감소'}
                              type={'c'}
                              id={'revenueDecrease'}
                              isChecked={searchAccountHistoryParamsState.revenueDecrease}
                              onChange={handleChangeChecked}/>
                  </AgentType>
                </div>
              </ColSpan3>


            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={null}
                        value={0}
                        // onChange={handleMediaSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAccountHistoryParamsState.searchValue}
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
            {
              !accountHistoryData ?
                <p>데이터가 없습니다.</p>
                : <Table columns={accountHistoryColumns}
                         data={accountHistoryData}
                         settings={accountHistorySetting}
                         style={{color: '#222'}}/>
            }

          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AccountHistory
