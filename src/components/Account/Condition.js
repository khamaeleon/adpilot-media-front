import {
  AgentType,
  BoardSearchDetail,
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
import Checkbox from "../common/Checkbox";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {getToDay} from "../../common/DateUtils";
import {accountStatus, searchAccountType} from "../../pages/account_manage/entity";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../../pages/login/entity";
import moment from "moment";
import {confirmAlert} from "react-confirm-alert";

export function AccountCondition(props) {
  const {searchAccount, setSearchAccount, handleHistoryTableData} = props
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [accountTypeSelect] = useState(searchAccountType)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])

  useEffect(() => {
    if(searchAccount.statusList?.length == accountStatus.length) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchAccount.statusList?.length])
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
    setSearchAccount({
      ...searchAccount,
      startAt: moment(date[0]).format('YYYY-MM'),
      endAt: moment(date[1]).format('YYYY-MM')
    })
  }
  //전체 체크박스 핸들링
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchAccount({
        ...searchAccount,
        statusList: accountStatus.map(obj => obj.value)
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
      searchType: selectSearchType.value,
      search: selectSearchType.value !== null ? searchAccount.search: '',
    })
    setSearchSelected(selectSearchType)
  }

  const handleAccountSearchValueByHistory = (event) => {
    setSearchAccount({
      ...searchAccount,
      search: event.target.value
    })
  }

  const onSearch = (event) => {
    if(dateRange[1] !== null) {
      handleHistoryTableData()
    } else {
      event.target.blur()
      confirmAlert({
        title: '알림',
        message: '검색 종료일을 선택해 주세요.',
        buttons: [
          {
            label: '확인',
          }
        ]
      })
    }
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
              {
                accountStatus.map((obj, key) =>{
                  return (
                    <Checkbox label={obj.label}
                              type={'c'}
                              key={key}
                              id={obj.value}
                              isChecked={searchAccount.statusList.includes(obj.value) ? true : false}
                              onChange={handleChangeChecked}/>
                  )
                })
              }
            </AgentType>
          </div>
          {tokenResultInfo.role === 'NORMAL' && <SearchButton onClick={handleHistoryTableData}>검색</SearchButton>}
        </ColSpan3>
      </RowSpan>
      {tokenResultInfo.role !== 'NORMAL' &&
        <RowSpan>
          <ColSpan2>
            <div style={{width:200}}>
              <Select styles={inputStyle}
                      options={accountTypeSelect}
                      value={searchSelected}
                      onChange={handleAccountSearchTypeByHistory}
              />
            </div>
            <SearchInput>
              <input type={'text'}
                     placeholder={searchAccount.searchType === null ? '검색 항목을 선택해 주세요.' : '검색어를 입력해 주세요.'}
                     value={searchAccount.search || ""}
                     onChange={handleAccountSearchValueByHistory}
                     onKeyDown={event => (event.key === 'Enter') && onSearch(event)}
                     readOnly={searchAccount.searchType === null ? true : false}
              />
            </SearchInput>
          </ColSpan2>
          <ColSpan2>
            <SearchButton onClick={onSearch}>적용</SearchButton>
          </ColSpan2>
        </RowSpan>
      }
    </BoardSearchDetail>
  )
}