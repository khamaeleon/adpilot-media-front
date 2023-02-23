import Navigator from "../../components/common/Navigator";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {columnData, mediaSearchResult, searchMediaInfo, searchMediaTypeAll} from "./entity";
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
import '@inovua/reactdatagrid-community/index.css'
import styled from "styled-components";
import Table, {ButtonRef, HyperRef, LinkRef, RenderButton, renderButton, renderSwitch} from "../../components/table";

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

  const columnSetting = {
    default: {
      textAlign: "center"
    },
    setColumns: [
      {
        target: 0,
        value: {
          defaultVisible: false
        },
      },
      {
        target: 1,
        value: {
          width: 90,
          showColumnMenuTool: false,
          sortable: false,
        },
        function: renderSwitch
      },
      {
        target: 4,
        value: {
          width: 230,
        },
        function: LinkRef("/board/media2/detail")
      },
      {
        target: 5,
        value: {
          type: 'number'
        }
      },
      {
        target: 10,
        function: ButtonRef('바로가기')
      },
      {
        target: 11,
        function: RenderButton('보기')
      },
      {
        target: 12,
        value: {
          onRender: (cellProps, {data}) => {
            cellProps.style.color = data.confirm === "심사 반려" ? '#db6f6f': data.confirm === "심사 승인" ? '#3d97bf' : '#222222'
          }
        }
      }
    ]
  }

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
          <BoardSearchResult>
            <Table columns={columnData}
                   data={mediaSearchResult}
                   settings={columnSetting}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default MediaList

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 68px;
  height: 30px;
  background: #ddd;
  border-radius: 68px;
  position: relative;
  transition: background-color .2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  & > label {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }
`

export const On = styled.span`
  display: inline-block;
  width: 50%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`
export const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`