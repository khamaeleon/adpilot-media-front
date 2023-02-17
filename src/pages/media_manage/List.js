import Navigator from "../../components/common/Navigator";
import styled from "styled-components";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import {mediaSearchResult, searchMediaInfo, searchMediaTypeAll} from "./entity";
import {BoardSearchResult, inputStyle} from "../../assets/GlobalStyles";
import {Link} from "react-router-dom";

function MediaList() {

  const [searchMediaTypeAllState, setSearchMediaTypeAllState] = useState(searchMediaTypeAll)
  const [searchMediaInfoState,setSearchMediaInfoState] = useState(searchMediaInfo)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [checked, setChecked] = useState({
    WEB: true,
    APPLICATION: true,
    RESPONSIVE:true,
    MOBILE_WEB:true,
    APP:true
  })
  /**
   * 검색타입 선택
   * @param searchMediaType
   */
  const handleSearchMediaTypeAll = (searchMediaType) => {
    setSearchMediaInfoState({
      ...searchMediaInfoState,
      selectSearchMediaType:searchMediaType
    })
    //지면리스트 호출
  }
  /**
   * 정산관리 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setSearchMediaInfoState({
      ...searchMediaInfoState,
      calculationType:calculationType
    })
    //지면리스트 호출
  }
  /**
   * 검색어 입력
   * @param event
   */
  const handleSearchName = (event) => {
    setSearchMediaInfoState({
      ...searchMediaInfoState,
      selectSearchName:event.target.value
    })
  }
  const handleAgentType = (event) => {
    if (event.target.checked) {
      setSearchMediaInfoState({
        ...searchMediaInfoState,
        agentType: [...searchMediaInfoState.agentType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setSearchMediaInfoState({
        ...searchMediaInfoState,
        agentType: searchMediaInfoState.agentType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'WEB') {
      setChecked({
        ...checked,
        WEB: event.target.checked,
      })
    }
    if (event.target.id === 'APPLICATION') {
      setChecked({
        ...checked,
        APPLICATION: event.target.checked,
      })
    }
    if (event.target.id === 'RESPONSIVE') {
      setChecked({
        ...checked,
        RESPONSIVE: event.target.checked,
      })
    }
    if (event.target.id === 'MOBILE_WEB') {
      setChecked({
        ...checked,
        MOBILE_WEB: event.target.checked,
      })
    }
    if (event.target.id === 'APP') {
      setChecked({
        ...checked,
        APP: event.target.checked,
      })
    }
    //지면리스트 호출
  }

  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setSearchMediaInfoState({
        ...searchMediaInfoState,
        agentType: ['WEB','APPLICATION','RESPONSIVE','MOBILE_WEB','APP']
      })
    }else{
      setSearchMediaInfoState({
        ...searchMediaInfoState,
        agentType: []
      })
    }
    setIsCheckedAll(event.target.checked)
    setChecked({
      WEB: event.target.checked,
      APPLICATION: event.target.checked,
      RESPONSIVE:event.target.checked,
      MOBILE_WEB:event.target.checked,
      APP:event.target.checked
    })
    //지면리스트 호출
  }
  const onClickSearchMedia =() => {
    console.log(searchMediaInfoState)
    //지면리스트 호출
  }

  /**
   * 이벤트 유형
   */
  useEffect(() => {
    if (checked.WEB && checked.APPLICATION && checked.RESPONSIVE && checked.MOBILE_WEB && checked.APP) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
    console.log(searchMediaInfoState)
  }, [checked, isCheckedAll]);

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>지면 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 리스트</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={searchMediaTypeAllState}
                        value={searchMediaInfoState.selectSearchMediaType}
                        onChange={handleSearchMediaTypeAll}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchMediaInfoState.selectSearchName}
                         onChange={handleSearchName}

                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton onClick={onClickSearchMedia}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>정산 방식</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={searchMediaTypeAllState}
                          value={(searchMediaInfoState.calculationType !== undefined && searchMediaInfoState.calculationType.value !== '') ? searchMediaInfoState.calculationType : {id: "1", value: "all", label: "전체"}}
                          onChange={handleCalculationType}
                  />
                </div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>에이전트 유형</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox title={'전체'}
                              type={'c'}
                              id={'ALL'}
                              onMethod={handleChangeSelectAll}
                              isChecked={isCheckedAll}
                    />
                    <Checkbox title={'PC 웹'}
                              id={'WEB'}
                              type={'c'}
                              onMethod={handleAgentType}
                              isChecked={checked.WEB}
                    />
                    <Checkbox title={'PC 어플리케이션'}
                              id={'APPLICATION'}
                              type={'c'}
                              onMethod={handleAgentType}
                              isChecked={checked.APPLICATION}
                    />
                    <Checkbox title={'반응형웹'}
                              id={'RESPONSIVE'}
                              type={'c'}
                              onMethod={handleAgentType}
                              isChecked={checked.RESPONSIVE}
                    />
                    <Checkbox title={'MOBILE 웹'}
                              id={'MOBILE_WEB'}
                              type={'c'}
                              onMethod={handleAgentType}
                              isChecked={checked.MOBILE_WEB}
                    />
                    <Checkbox title={'APP'}
                              id={'APP'}
                              type={'c'}
                              onMethod={handleAgentType}
                              isChecked={checked.APP}
                    />
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>120</span>건의 매체
            </div>
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
          </BoardSearchResultTitle>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>게재상태</th>
                <th>매체명</th>
                <th>아이디</th>
                <th>지면명</th>
                <th>지면번호</th>
                <th>광고상품</th>
                <th>디바이스</th>
                <th>에이전트</th>
                <th>지면사이즈</th>
                <th>사이트이동</th>
                <th>정산방식</th>
                <th>대행사정산</th>
                <th>지면스크립트</th>
                <th>신청일시</th>
                <th>심사상태</th>
              </tr>
              </thead>
              <tbody>
              {mediaSearchResult !== undefined && mediaSearchResult.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.게재상태}</td>
                    <td>{item.매체명}</td>
                    <td>{item.아이디}</td>
                    <td><Link to={`/board/media2/detail?id=${key}`}>{item.지면명}</Link></td>
                    <td>{item.지면번호}</td>
                    <td>{item.광고상품}</td>
                    <td>{item.디바이스}</td>
                    <td>{item.에이전트}</td>
                    <td>{item.지면사이즈}</td>
                    <td>{item.사이트이동}</td>
                    <td>{item.정산방식}</td>
                    <td>{item.대행사정산}</td>
                    <td>{item.지면스크립트}</td>
                    <td>{item.신청일시}</td>
                    <td>{item.심사상태}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default MediaList
/**
 * @type 공통 스타일
 **/
const BoardContainer = styled.div`
  padding: 30px;
  background-color: #f8f8f8;
`

const TitleContainer = styled.div`
  & h1 {
    font-size: 30px;
    font-weight: 700;
  }
`
const Board = styled.div`
  margin: 34px 0;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

const BoardHeader = styled.div`
  padding: 21px 0;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  font-weight: bold;
`

const BoardSearchDetail = styled.div`
  padding: 10px 0;
`

const RowSpan = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`

const ColSpan1 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 25%;
  gap: 10px;
`

const ColSpan2 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 50%;
  gap: 10px;
`

const ColSpan3 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 75%;
  gap: 10px;
`

const ColSpan4 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`

const ColTitle = styled.div`
  padding: 0 10px 0 0;
  min-width: 65px;
`

/**
 * @type 공통 스타일
 **/

const AgentType = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 45px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  & label {
    white-space: nowrap;
  }
`

const Date = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`

const CalendarBox = styled.div`
  display: flex;
  width: 55px;
  border-right: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`

const CalendarIcon = styled.div`
  width: 18px;
  height: 20px;
  background-image: url("/assets/images/common/icon_calendar.png");
`

const CustomDatePicker = styled(DatePicker)`
  border: none !important;
  color: #a2aab2;
  font-size: 14px;
`

const RangePicker = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 45px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: #777;

  & div {
    cursor: pointer;
  }
`

const SearchInput = styled.div`
  position: relative;
  width: 100%;

  & input[type='text'] {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    background-color: #f9fafb;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
`

const SearchButton = styled.button`
  width: 140px;
  height: 45px;
  border: 1px solid #dddddd;
  background-color: #fff;
  border-radius: 5px;
`

const BoardSearchResultTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 20px 0;

  & span {
    color: #f5811f;
  }
`

const SaveExcelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 45px;
  border: 1px solid #dddddd;
  background-color: #fff;

  &:after {
    margin-left: 5px;
    display: inline-block;
    content: "";
    width: 20px;
    height: 20px;
    background-image: url("/assets/images/common/icon_excel_on.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;

  }
`