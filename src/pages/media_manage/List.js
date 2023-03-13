import Navigator from "../../components/common/Navigator";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import React, { useEffect, useState} from "react";
import {
  calculationAllType,
  columnData, deviceTypeInfo,
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
import {ListBody} from "../../components/layout";
import styled from "styled-components";
function MediaList() {
  const [searchMediaTypeAllState, setSearchMediaTypeAllState] = useState(searchMediaTypeAll)
  const [searchMediaInfoState,setSearchMediaInfoState] = useState(searchMediaInfo)
  const [inventorySearchList, setInventorySearchList] = useAtom(mediaSearchResult);
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [checked, setChecked] = useState({
    WEB: true,
    APPLICATION: true,
    RESPONSIVE:true,
    MOBILE_WEB:true,
    APP:true
  })

  useEffect(() => {
     selInventoryList(searchMediaInfoState).then(response =>{
       if(response){
         setInventorySearchList(response)
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
      searchKeywordType:searchMediaType
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
      keyword:event.target.value
    })
  }

  const handleDeviceType = (deviceType) => {
    setSearchMediaInfoState({
      ...searchMediaInfoState,
      deviceType: deviceType
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
    selInventoryList(searchMediaInfoState).then(response =>{
      if(response){
        setInventorySearchList(response)
      }
    })
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
                <ColTitle><span>디바이스 유형</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={deviceTypeInfo}
                          value={(searchMediaInfoState.deviceType !== undefined && searchMediaInfoState.deviceType.value !== '') ? searchMediaInfoState.deviceType : {id: "1", value: "all", label: "전체"}}
                          onChange={handleDeviceType}
                  />
                </div>
              </ColSpan2>
              <ColSpan2>
                <ColTitle><span>정산 방식</span></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={calculationAllType}
                          value={(searchMediaInfoState.calculationType !== undefined && searchMediaInfoState.calculationType.value !== '') ? searchMediaInfoState.calculationType : {id: "1", value: "all", label: "전체"}}
                          onChange={handleCalculationType}
                  />
                </div>
              </ColSpan2>

              {/*<ColSpan3>*/}
              {/*  <ColTitle><span>에이전트 유형</span></ColTitle>*/}
              {/*  <div>*/}
              {/*    <AgentType>*/}
              {/*      <Checkbox label={'전체'}*/}
              {/*                type={'c'}*/}
              {/*                id={'ALL'}*/}
              {/*                onChange={handleChangeSelectAll}*/}
              {/*                isChecked={isCheckedAll}*/}
              {/*      />*/}
              {/*      <Checkbox label={'PC 웹'}*/}
              {/*                id={'WEB'}*/}
              {/*                type={'c'}*/}
              {/*                onChange={handleAgentType}*/}
              {/*                isChecked={checked.WEB}*/}
              {/*      />*/}
              {/*      <Checkbox label={'PC 어플리케이션'}*/}
              {/*                id={'APPLICATION'}*/}
              {/*                type={'c'}*/}
              {/*                onChange={handleAgentType}*/}
              {/*                isChecked={checked.APPLICATION}*/}
              {/*      />*/}
              {/*      <Checkbox label={'반응형웹'}*/}
              {/*                id={'RESPONSIVE'}*/}
              {/*                type={'c'}*/}
              {/*                onChange={handleAgentType}*/}
              {/*                isChecked={checked.RESPONSIVE}*/}
              {/*      />*/}
              {/*      <Checkbox label={'MOBILE 웹'}*/}
              {/*                id={'MOBILE_WEB'}*/}
              {/*                type={'c'}*/}
              {/*                onChange={handleAgentType}*/}
              {/*                isChecked={checked.MOBILE_WEB}*/}
              {/*      />*/}
              {/*      <Checkbox label={'APP'}*/}
              {/*                id={'APP'}*/}
              {/*                type={'c'}*/}
              {/*                onChange={handleAgentType}*/}
              {/*                isChecked={checked.APP}*/}
              {/*      />*/}
              {/*    </AgentType>*/}
              {/*  </div>*/}
              {/*</ColSpan3>*/}
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={searchMediaTypeAllState}
                        value={(searchMediaInfoState.searchKeywordType !== undefined && searchMediaInfoState.searchKeywordType.value !== '') ? searchMediaInfoState.searchKeywordType : {id: "1", value: "all", label: "전체"}}
                        onChange={handleSearchMediaTypeAll}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchMediaInfoState.keyword}
                         onChange={handleSearchName}

                  />
                </SearchInput>
              </ColSpan3>
              <ColSpan2>
                <SearchButton onClick={onClickSearchMedia}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResultTitle>
            <div>
              총 <span>{inventorySearchList.length}</span>건의 매체
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
