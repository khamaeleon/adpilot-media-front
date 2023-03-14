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
  searchAccountParams,
  accountHistoryData,
  accountHistorySetting,
  accountHistoryColumns, searchAccountType,
} from "./entity";
import {getToDay} from "../../common/DateUtils";
import {accountHistoryTableData} from "../../services/AccountAxios";
import {dateFormat} from "../../common/StringUtils";
import {navigationName} from "../../components/common/entity";

const AccountHistoryData = atom(accountHistoryData)

function AccountHistory() {

  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}

  const [modal, setModal] = useAtom(modalController)
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(AccountHistoryData)

  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)
  const [accountTypeSelect, setAccountTypeSelect] = useState(searchAccountType)

  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])
  useEffect(() => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      startAt: dateFormat(startDate, 'YYYY-MM'),
      endAt: dateFormat(endDate, 'YYYY-MM'),
    })
  },[dateRange])

  useEffect(() => {
    console.log(searchAccountHistoryParamsState.statusList.length)
    searchAccountHistoryParamsState.endAt !== '' && accountHistoryTableData('admin', searchAccountHistoryParamsState).then(response => {
      response !== null ? setAccountHistoryDataState(response) : setAccountHistoryDataState([])
    })
  }, [searchAccountHistoryParamsState.statusList.length, searchAccountHistoryParamsState.searchType, searchAccountHistoryParamsState.endAt])

  useEffect(() => {
    if(searchAccountHistoryParamsState.statusList.length === 8) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[isCheckedAll])

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: ['INVOICE_REQUEST', 'CARRY_OVER_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
      })
    } else{
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }

  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if(event.currentTarget.checked){
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: searchAccountHistoryParamsState.statusList.concat(event.currentTarget.id)
      })
    }else{
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: searchAccountHistoryParamsState.statusList.filter(id => id !== event.currentTarget.id)
      })
    }
    // if (event.target.id === 'invoiceRequest') {
    //   setIsChecked({
    //     ...isChecked,
    //     invoiceRequest: event.target.checked
    //   })
    // }
    // if (event.target.id === 'carryOverRequest') {
    //   setIsChecked({
    //     ...isChecked,
    //     carryOverRequest: event.target.checked
    //   })
    // }
    // if (event.target.id === 'examinedCompleted') {
    //   setIsChecked({
    //     ...isChecked,
    //     examinedCompleted: event.target.checked
    //   })
    // }
    // if (event.target.id === 'reject') {
    //   setIsChecked({
    //     ...isChecked,
    //     reject: event.target.checked
    //   })
    // }
    // if (event.target.id === 'paymentCompleted') {
    //   setIsChecked({
    //     ...isChecked,
    //     paymentCompleted: event.target.checked
    //   })
    // }
    // if (event.target.id === 'withheldPayment') {
    //   setIsChecked({
    //     ...isChecked,
    //     withheldPayment: event.target.checked
    //   })
    // }
    // if (event.target.id === 'revenueIncrease') {
    //   setIsChecked({
    //     ...isChecked,
    //     revenueIncrease: event.target.checked
    //   })
    // }
    // if (event.target.id === 'revenueDecrease') {
    //   setIsChecked({
    //     ...isChecked,
    //     revenueDecrease: event.target.checked
    //   })
    // }
  }

  const handleAccountSearchTypeByHistory = (selectSearchType) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handleAccountSearchValueByHistory = (event) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      search: event.target.value
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
                      maxDate={new Date()}
                      onChange={(date) => setDateRange(date)}
                      showMonthYearPicker
                      dateFormat="yyyy.MM"
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
                              id={'ALL'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeCheckAll}
                    />
                    <Checkbox label={'정산 신청'}
                              type={'c'}
                              id={'INVOICE_REQUEST'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('INVOICE_REQUEST') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'이월 신청'}
                              type={'c'}
                              id={'CARRY_OVER_REQUEST'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('CARRY_OVER_REQUEST') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'심사 완료'}
                              type={'c'}
                              id={'EXAMINED_COMPLETED'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('EXAMINED_COMPLETED') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'반려'}
                              type={'c'}
                              id={'REJECT'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REJECT') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 완료'}
                              type={'c'}
                              id={'PAYMENT_COMPLETED'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('PAYMENT_COMPLETED') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 보류'}
                              type={'c'}
                              id={'WITHHELD_PAYMENT'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('WITHHELD_PAYMENT') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 증가'}
                              type={'c'}
                              id={'REVENUE_INCREASE'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REVENUE_INCREASE') ? true : false}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 감소'}
                              type={'c'}
                              id={'REVENUE_DECREASE'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REVENUE_DECREASE') ? true : false}
                              onChange={handleChangeChecked}/>
                  </AgentType>
                </div>
              </ColSpan3>


            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={accountTypeSelect}
                        value={searchSelected}
                        onChange={handleAccountSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAccountHistoryParamsState.search}
                         onChange={handleAccountSearchValueByHistory}
                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <Table columns={accountHistoryColumns}
                   data={accountHistoryDataState}
                   settings={accountHistorySetting}
                   emptyText={'뭐라고 할거냐'}
                   style={{color: '#222'}}/>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AccountHistory
