import Navigator from "../../components/common/Navigator";
import styled from "styled-components";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import {mediaSearchResult, searchMediaInfo, searchMediaTypeAll} from "./entity";
import {
  AgentType,
  Board,
  BoardContainer, BoardHeader, BoardSearchDetail,
  BoardSearchResult, BoardSearchResultTitle,
  ColSpan1,
  ColSpan2,
  ColSpan3, ColTitle,
  inputStyle, RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
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
