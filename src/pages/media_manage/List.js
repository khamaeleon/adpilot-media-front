import Navigator from "../../components/common/Navigator";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import React, { useEffect, useState} from "react";
import {
  columnData,
  mediaSearchResult,
  searchMediaInfo,
  searchMediaTypeAll
} from "./entity";
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
import Table from "../../components/table";
import {selInventoryList} from "../../services/InventoryAxios";
import {useAtom} from "jotai/index";
import {dataTotalInfo} from "../../components/common/entity";
function MediaList() {
  const [searchMediaTypeAllState, setSearchMediaTypeAllState] = useState(searchMediaTypeAll)
  const [searchMediaInfoState,setSearchMediaInfoState] = useState(searchMediaInfo)
  const [inventorySearchList, setInventorySearchList] = useAtom(mediaSearchResult);
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)
  const [checked, setChecked] = useState({
    WEB: true,
    APPLICATION: true,
    RESPONSIVE:true,
    MOBILE_WEB:true,
    APP:true
  })

  useEffect(() => {
     selInventoryList({pageSize:10, currentPage:1}).then(response =>{
       if(response){
         setInventorySearchList(response.rows)
         setTotalInfo({
           totalCount: response.totalCount,
           totalPages: response.totalPages,
           currentPage:response.currentPage
         })
       }
     })
  }, []);
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
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'ALL'}
                              onChange={handleChangeSelectAll}
                              isChecked={isCheckedAll}
                    />
                    <Checkbox label={'PC 웹'}
                              id={'WEB'}
                              type={'c'}
                              onChange={handleAgentType}
                              isChecked={checked.WEB}
                    />
                    <Checkbox label={'PC 어플리케이션'}
                              id={'APPLICATION'}
                              type={'c'}
                              onChange={handleAgentType}
                              isChecked={checked.APPLICATION}
                    />
                    <Checkbox label={'반응형웹'}
                              id={'RESPONSIVE'}
                              type={'c'}
                              onChange={handleAgentType}
                              isChecked={checked.RESPONSIVE}
                    />
                    <Checkbox label={'MOBILE 웹'}
                              id={'MOBILE_WEB'}
                              type={'c'}
                              onChange={handleAgentType}
                              isChecked={checked.MOBILE_WEB}
                    />
                    <Checkbox label={'APP'}
                              id={'APP'}
                              type={'c'}
                              onChange={handleAgentType}
                              isChecked={checked.APP}
                    />
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>{totalInfo.totalCount}</span>건의 매체
            </div>
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
          </BoardSearchResultTitle>
          <BoardSearchResult>
            <Table columns={columnData}
                   data={inventorySearchList}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default MediaList;
