import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  BoardTableContainer,
  inputStyle, RelativeDiv,
  ColSpan4,
  SubmitButton,
  TextMainColor, ValidationScript
} from "../../assets/GlobalStyles";
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
  accountHistorySetting,
  accountHistoryListInfo,
  mediaSearchTypeByHistory,
  accountDataColumns, searchAccountType, accountHistoryDataAtom
} from "./entity";
import {mediaCategoryOneDepthInfo, mediaResistInfo, mediaSearchInfo} from "../media_manage/entity";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import styled from "styled-components";
import {getToDay} from "../../common/DateUtils";
import {accountHistoryTableData} from "../../services/AccountAxios";
import {toast, ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
const MediaResistAtom = atom(mediaResistInfo)
const MediaSearchInfo = atom(mediaSearchInfo)

export function ModalHistoryAdd(props) {
  const [mediaSearchInfo] = useAtom(MediaSearchInfo)
  const [selectedItem, setSelectedItem] = useState({})
  const [proposeType, setProposeType] = useState('increment')


  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  const handleSubmit = () => {
    props.onSearch(selectedItem)
  }

  const handleOnSearchKeyword = (e) => {
    props.onSearchKeyword(e)
  }

  const handleSearch = () => {
    props.onResult()
  }
  return (
    <>
      <ModalHeader title={'이력 추가'}/>
      <ModalBody>
        <MediaSearchColumn>
          <div>매체명</div>
          <div>
            <InputGroup>
              <input type={'text'}
                     placeholder={"매체명을 입력해주세요."}
                     defaultValue={''}
                     onChange={handleOnSearchKeyword}
              />
              <button type={'button'} onClick={handleSearch}>검색</button>
            </InputGroup>
          </div>
        </MediaSearchColumn>
        <MediaSearchResult>
          {mediaSearchInfo.length !== 0 &&
            <>
              <table>
                <thead>
                <tr>
                  <th>매체명</th>
                  <th>아이디</th>
                  <th>담당자명</th>
                </tr>
                </thead>
                <tbody>
                {mediaSearchInfo.map((item, key) => {
                  return (
                    <tr key={key}
                        onClick={() => handleSelect(item)}
                        style={selectedItem.siteName === item.siteName ? {
                          backgroundColor: "#f5811f",
                          color: '#fff'
                        } : null}>
                      <td>{item.siteName}</td>
                      <td>{item.memberId}</td>
                      <td>{item.managerName}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </>
          }
          <HistoryAdd>
            <p>이력 추가</p>
            <div className={'border-box'}>
              <RowSpan style={{marginTop: 0}}>
                <ColSpan4 style={{paddingLeft: 0}}>
                  <span>신청 금액 설정</span>
                  <RelativeDiv>
                    <input type={'radio'} id={'increment'} name={'proposeState'} defaultChecked={true} onChange={() => setProposeType('increment')}/>
                    <label htmlFor={'increment'}>증가</label>
                    <input type={'radio'} id={'decrement'} name={'proposeState'} onChange={() => setProposeType('decrement')}/>
                    <label htmlFor={'decrement'}>감소</label>
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
              <RowSpan style={{marginTop: 0}}>
                <div className={'inputCon'}>
                  <span>금액 입력</span>
                  <div className={'won gary-bg'}>
                    <input
                      type={'text'}
                      placeholder={'금액 입력'}
                      // onChange={(e) => handleManagerName(e)}
                    />
                  </div>
                </div>
                <div className={'inputCon'}>
                  <span>수익 잔액</span>
                  <div className={'won'}>
                    <input
                      type={'text'}
                      placeholder={'수익 잔액'}
                    />
                  </div>
                </div>
              </RowSpan>
              <RowSpan style={{marginTop: 15}}>
                <ColSpan4 style={{paddingLeft: 0}}>
                  <span>비고</span>
                  <div className={'gary-bg'}>
                    <textarea placeholder={'내용을 입력해주세요.'}></textarea>
                  </div>
                </ColSpan4>
              </RowSpan>
            </div>
          </HistoryAdd>
        </MediaSearchResult>
      </ModalBody>
      <ModalFooter style={{borderTop: 0, paddingTop: 0}}>
        <SubmitButton onClick={handleSubmit}>이력 추가</SubmitButton>
      </ModalFooter>
    </>
  )
}

function AccountData(props) {
  const [role,setRole] = useState(localStorage.getItem("role"))
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)

  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)

  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)
  const [accountTypeSelect, setAccountTypeSelect] = useState(searchAccountType)

  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])
  const {setValue, setError} = props
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
  const handleHistoryTableData = () => { //테이블 데이터 호출
    const userId = role !== 'NORMAL' ? null : 'nate9988'
    searchAccountHistoryParamsState.statusList.length !== 0 ? accountHistoryTableData(userId, searchAccountHistoryParamsState).then(response => {
      response !== null ? setAccountHistoryDataState(response) : setAccountHistoryDataState([])
    }) : toast.warning('신청 상태를 선택 해주세요.')
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

  const handleSearchButton = () => {
    handleHistoryTableData()
  }
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
  }

  const handleSearchKeyword = (event) => {
    console.log(event.target.value)
    setSearchKeyword(event.target.value)
  }

  /**
   * 모달안에 이력 추가 버튼 클릭시
   */
  const handleMediaSearchSelected = (item) => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    setMediaResistState({
      ...mediaResistState,
      siteName: item.siteName
    })
    setValue('siteName', item.siteName);
    setError('siteName','')
  }
  /**
   * 데이터 관리 에서 이력 추가 버튼 클릭시
   */
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => {
        return <ModalHistoryAdd searchKeyword={searchKeyword} onResult={handleSearchResult} onSearchKeyword={handleSearchKeyword} onSearch={handleMediaSearchSelected}/>
      }
    })
  }

  const historyBtn = () => {
    return <SaveExcelButton className={'listUp'} onClick={handleModalComponent}>이력 추가</SaveExcelButton>
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
                <SearchButton onClick={handleSearchButton}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <Table columns={accountDataColumns}
                   data={accountHistoryDataState}
                   emptyText={'정산 데이터 관리 내역이 없습니다.'}
                   settings={accountHistorySetting}
                   historyBtn={historyBtn()}
            />
          </BoardTableContainer>
        </Board>
      </BoardContainer>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </main>
  )
}

export default AccountData

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
    width: 80%;
    border: 1px solid #e5e5e5;
    height: 45px;
    border-radius: 10px 0 0 10px;
  }

  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
`

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`
const MediaSearchResult = styled.div`
  font-size: 13px;

  & table {
    margin-top: 18px;
    width: 100%;

    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 400;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`
const HistoryAdd = styled.div`
  > p {
    margin: 20px 0 10px;
  }
  .border-box {
    padding: 15px 20px;
    border: solid 1px #e5e5e5;
    span {
      width: 92px; 
      color: #777;
    }
    .inputCon {
      width: 48%;
      display: flex;
      align-items: center;
    }
    .gary-bg {
      background-color: #f9f9f9;
      border-radius: 10px;
      border: 0 !important;
      textarea {
        width: 100%;
        background-color: transparent;
        margin: 0;
        padding: 10px;
        border: 0;
      }
    }
    .won {
      width: calc(100% - 78px);
      height: 45px;
      display: flex;
      align-items: center;
      padding: 8px 15px;
      border-radius: 10px;
      border: solid 1px #e5e5e5;
      &.gary-bg input {
        font-size: 18px;
        &::placeholder {
          font-size: 13px;
        }
      }
      input {
        width: 90%;
        border: 0;
        background-color: transparent;
        text-align: right;
      }
    }
  }
`

