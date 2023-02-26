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
import {searchAccountHistoryParams, accountHistoryData, accountHistorySetting, accountHistoryListInfo, mediaSearchTypeByHistory} from "./entity";

function AccountData() {

  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountHistoryParams)
  const [mediaSearchTypeByHistoryState, setMediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)

  useEffect(() => {
    console.log(searchAccountHistoryParamsState)
    if (!searchAccountHistoryParamsState.calculationPropose && !searchAccountHistoryParamsState.carryPropose && !searchAccountHistoryParamsState.confirm && !searchAccountHistoryParamsState.confirmCancel && !searchAccountHistoryParamsState.paymentComplete && !searchAccountHistoryParamsState.paymentHold  && !searchAccountHistoryParamsState.revenueIncrease && !searchAccountHistoryParamsState.revenueDecrease) {
      setIsCheckedAll(false)

    } else if (searchAccountHistoryParamsState.calculationPropose && searchAccountHistoryParamsState.carryPropose && searchAccountHistoryParamsState.confirm && searchAccountHistoryParamsState.confirmCancel && searchAccountHistoryParamsState.paymentComplete && searchAccountHistoryParamsState.paymentHold && searchAccountHistoryParamsState.revenueIncrease && searchAccountHistoryParamsState.revenueDecrease) {
      setIsCheckedAll(true)

    } else {
      setIsCheckedAll(false)

    }
  }, [searchAccountHistoryParamsState, isCheckedAll]);
  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      calculationPropose: event.target.checked,
      carryPropose: event.target.checked,
      confirm: event.target.checked,
      confirmCancel: event.target.checked,
      paymentComplete: event.target.checked,
      paymentHold: event.target.checked,
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
    if (event.target.id === 'calculationPropose') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        calculationPropose: event.target.checked
      })
    }
    if (event.target.id === 'carryPropose') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        carryPropose: event.target.checked
      })
    }
    if (event.target.id === 'confirm') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        confirm: event.target.checked
      })
    }
    if (event.target.id === 'confirmCancel') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        confirmCancel: event.target.checked
      })
    }
    if (event.target.id === 'paymentComplete') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        paymentComplete: event.target.checked
      })
    }
    if (event.target.id === 'paymentHold') {
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        paymentHold: event.target.checked
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
          <BoardHeader>데이터 관리</BoardHeader>
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
                      dateFormat="yyyy-mm-dd"
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
                              id={'calculationPropose'}
                              isChecked={searchAccountHistoryParamsState.calculationPropose}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'이월 신청'}
                              type={'c'}
                              id={'carryPropose'}
                              isChecked={searchAccountHistoryParamsState.carryPropose}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'심사 완료'}
                              type={'c'}
                              id={'confirm'}
                              isChecked={searchAccountHistoryParamsState.confirm}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'반려'}
                              type={'c'}
                              id={'confirmCancel'}
                              isChecked={searchAccountHistoryParamsState.confirmCancel}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 완료'}
                              type={'c'}
                              id={'paymentComplete'}
                              isChecked={searchAccountHistoryParamsState.paymentComplete}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 보류'}
                              type={'c'}
                              id={'paymentHold'}
                              isChecked={searchAccountHistoryParamsState.paymentHold}
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
            <Table columns={accountHistoryData}
                   data={accountHistoryListInfo}
                   settings={accountHistorySetting}
                   // customBtn={{text :'이력 추가', icon: 'listUp'}}
            />
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AccountData
