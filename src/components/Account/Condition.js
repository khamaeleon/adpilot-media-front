import {
  AgentType, BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer, inputStyle,
  RowSpan, SearchButton, SearchInput
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import Checkbox from "../common/Checkbox";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {getThisMonth, getToDay} from "../../common/DateUtils";
import {searchAccountType} from "../../pages/account_manage/entity";
import {useAtom} from "jotai/index";
import {tokenResultAtom} from "../../pages/login/entity";
import {dateFormat} from "../../common/StringUtils";

export function AccountCondition(props) {
  const {searchAccount, setSearchAccount, handleHistoryTableData} = props
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [accountTypeSelect] = useState(searchAccountType)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])

  useEffect(() => {
    setSearchAccount({
      ...searchAccount,
      startAt: dateFormat(startDate, 'YYYY-MM'),
      endAt: dateFormat(endDate, 'YYYY-MM'),
    })
  },[dateRange])

  useEffect(() => {
    if(searchAccount.statusList.length == 7) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchAccount.statusList.length])
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
  }
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchAccount({
        ...searchAccount,
        statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
      })
    } else{
      setSearchAccount({
        ...searchAccount,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }

  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if(event.currentTarget.checked){
      setSearchAccount({
        ...searchAccount,
        statusList: searchAccount.statusList.concat(event.currentTarget.id)
      })
    }else{
      setSearchAccount({
        ...searchAccount,
        statusList: searchAccount.statusList.filter(id => id !== event.currentTarget.id)
      })
    }
  }

  const handleAccountSearchTypeByHistory = (selectSearchType) => {
    setSearchAccount({
      ...searchAccount,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handleAccountSearchValueByHistory = (event) => {
    setSearchAccount({
      ...searchAccount,
      search: event.target.value
    })
  }
  return (
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
                        isChecked={searchAccount.statusList.includes('INVOICE_REQUEST') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'심사 완료'}
                        type={'c'}
                        id={'EXAMINED_COMPLETED'}
                        isChecked={searchAccount.statusList.includes('EXAMINED_COMPLETED') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'반려'}
                        type={'c'}
                        id={'REJECT'}
                        isChecked={searchAccount.statusList.includes('REJECT') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'지급 완료'}
                        type={'c'}
                        id={'PAYMENT_COMPLETED'}
                        isChecked={searchAccount.statusList.includes('PAYMENT_COMPLETED') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'지급 보류'}
                        type={'c'}
                        id={'WITHHELD_PAYMENT'}
                        isChecked={searchAccount.statusList.includes('WITHHELD_PAYMENT') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'수익 증가'}
                        type={'c'}
                        id={'REVENUE_INCREASE'}
                        isChecked={searchAccount.statusList.includes('REVENUE_INCREASE') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'수익 감소'}
                        type={'c'}
                        id={'REVENUE_DECREASE'}
                        isChecked={searchAccount.statusList.includes('REVENUE_DECREASE') ? true : false}
                        onChange={handleChangeChecked}/>
            </AgentType>
          </div>
          {tokenResultInfo.role === 'NORMAL' && <SearchButton onClick={handleHistoryTableData}>검색</SearchButton>}
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
                     value={searchAccount.search}
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
  )
}