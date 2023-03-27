import Select from "react-select";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  inputStyle,
  RowSpan,
  SearchButton,
  SearchInput
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  accountDataColumns,
  accountDataSetting,
  accountHistoryDataAtom,
  searchAccountParams,
  searchAccountType
} from "./entity";
import {getToDay} from "../../common/DateUtils";
import {accountCreateInvoiceRecord, accountHistoryTableData} from "../../services/AccountAdminAxios";
import {dateFormat} from "../../common/StringUtils";
import {SearchUser} from "../../components/common/SearchUser";
import {AdminInfo} from "../layout";
import {confirmAlert} from "react-confirm-alert";
import {tokenResultAtom} from "../login/entity";
import Navigator from "../../components/common/Navigator";

function AccountData() {
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)

  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)
  const [accountTypeSelect] = useState(searchAccountType)

  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])

  useEffect(() => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      startAt: dateFormat(startDate, 'YYYY-MM'),
      endAt: dateFormat(endDate, 'YYYY-MM'),
    })
  },[dateRange])

  useEffect(() => {
    handleHistoryTableData()
  }, [])

  useEffect(() => {
    if(searchAccountHistoryParamsState.statusList.length == 7) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchAccountHistoryParamsState.statusList.length])


  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
  }
  const handleHistoryTableData = () => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
    accountHistoryTableData(userName,searchAccountHistoryParamsState).then(response => {
      response !== null && setAccountHistoryDataState(response)
    })
  }
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
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

  /**
   * 모달안에 매체 검색 선택시
   */
  const handleHistoryAdd = (params) => {
    accountCreateInvoiceRecord(params).then(response => {
      response ? handleHistoryTableData() : confirmAlert({
        title: '이력 추가',
        message: '정산 프로필이 없습니다.',
        buttons: [
          {
            label: '확인',
          }
        ]
      });
    })
  }

  return (
    <>
      <Navigator/>
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
                      maxDate={new Date()}
                      onChange={(date) => handleRangeDate(date)}
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
                {tokenResultInfo.role === 'NORMAL'&& <SearchButton onClick={handleHistoryTableData}>검색</SearchButton>}
              </ColSpan3>
            </RowSpan>
            {tokenResultInfo.role !== 'NORMAL' &&
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
                  <SearchButton onClick={handleHistoryTableData}>검색</SearchButton>
                </ColSpan2>
              </RowSpan>
            }
          </BoardSearchDetail>
          <BoardTableContainer>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}><SearchUser title={'이력 추가'} className={'listUp'} onSubmit={handleHistoryAdd} btnStyle={'historyAddButton'} historyAdd={true}/></div>
            <Table columns={accountDataColumns}
                   data={accountHistoryDataState}
                   emptyText={'정산 데이터 관리 내역이 없습니다.'}
                   settings={accountDataSetting}
            />
          </BoardTableContainer>
        </Board>
    </>
  )
}

export default AccountData
