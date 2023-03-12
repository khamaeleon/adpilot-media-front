import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  BoardSearchResult,
  BoardTableContainer,
  ColSpan2,
  inputStyle, SearchButton,
  SearchInput,
  Span1,
  Span2,
  Span3,
  Span4
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,  ColSpan3,
  ColTitle, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType,
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import {columnData, mediaAcceptYn, mediaSearchResult, searchMediaTypeAll} from "../media_manage/entity";
import {adExchangeListAtom, columnAdExChangeData, searchAdExChangeParams} from "./entity";
import Table from "../../components/table";
import {getAdExchangeList} from "../../services/AdExchangeAxios";
import {atom, useAtom} from "jotai";

function AdExchange(){
  const [searchMediaTypeAllState, setSearchMediaTypeAllState] = useState(searchMediaTypeAll)
  const [searchAdExChangeParamsState, setSearchAdExChangeParamsState] = useState(searchAdExChangeParams)
  const [adExChangeList, setAdExChangeList] = useAtom(adExchangeListAtom)
  const [mediaAcceptYnAll] = useState(mediaAcceptYn)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [deviceChecked, setDeviceChecked] = useState({
    pc: true,
    mobile: true,
    responsive:true
  })
  const [pTypeChecked, setPTypeChecked] = useState({
    banner: true,
    popUnder: true
  })

  /**
   * 초기 데이터 리스트 페칭
   * @param event
   */
  useEffect(() => {
    async function fetchAndGetList() {
      const data = await getAdExchangeList();
      if(data !== undefined){
        setAdExChangeList(data)
      }
    }
    fetchAndGetList()
  }, []);

  /**
   * 체크박스 전체 체크
   * @param event
   */
  useEffect(() => {
    if (deviceChecked.pc && deviceChecked.mobile && deviceChecked.responsive) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [deviceChecked, isCheckedAll]);

  /**
   * 검색 타입 선택
   * @param event
   */
  const handleSearchMediaType = (searchMediaType) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      selectMediaType:searchMediaType
    })
    //지면리스트 호출
  }
  /**
   * 검색 매체명, 지면명 input
   * @param event
   */
  const handleSearchName = (event) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchName:event.target.value
    })
  }
  /**
   * 디바이스 전체 체크
   * @param event
   */
  const handleDeviceTypeAll = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType:['PC','MOBILE', 'RESPONSIVE']
      })
    }else{
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        agentTypes: []
      })
    }
    setIsCheckedAll(event.target.checked)
    setDeviceChecked({
      ...deviceChecked,
      pc: event.target.checked,
      mobile: event.target.checked,
      responsive: event.target.checked
    })
  }

  /**
   * 디바이스 체크
   * @param event
   */
  const handleDeviceType = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType: [...searchAdExChangeParamsState.deviceType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        deviceType: searchAdExChangeParamsState.deviceType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'pc') {
      setDeviceChecked({
        ...deviceChecked,
        pc: event.target.checked,
      })
    }
    if (event.target.id === 'mobile') {
      setDeviceChecked({
        ...deviceChecked,
        mobile: event.target.checked,
      })
    }
    if (event.target.id === 'responsive') {
      setDeviceChecked({
        ...deviceChecked,
        responsive: event.target.checked,
      })
    }
    //지면리스트 호출
  }

  /**
   * 광고상품 체크
   * @param event
   */
  const handleMediaAcceptConfig = (mediaAcceptConfig) =>{
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      mediaAcceptConfig: mediaAcceptConfig
    })
  }
  /**
   * 광고상품 체크
   * @param event
   */
  const handlePType = (event) => {
    if (event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        pType: [...searchAdExChangeParamsState.pType, event.target.id]
      })
    } else {
      //기존이 전체선택이 아닌경우
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        pType: searchAdExChangeParamsState.pType.filter((value) => value !== event.target.id)
      })
    }
    //체크박스 핸들링
    if (event.target.id === 'banner') {
      setPTypeChecked({
        ...pTypeChecked,
        banner: event.target.checked,
      })
    }
    if (event.target.id === 'popUnder') {
      setPTypeChecked({
        ...pTypeChecked,
        popUnder: event.target.checked,
      })
    }
    //지면리스트 호출
  }
  /**
   * 검색 데이터 페칭
   * @param event
   */
  const handleSearchAdExchange = async() => {
    const data = await getAdExchangeList(searchAdExChangeParamsState);
    if(data !== undefined){
      setAdExChangeList(data)
    }
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면별 연동사 수신 연동</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span1>게재 상태</Span1></ColTitle>
                <div>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={mediaAcceptYnAll}
                          value={searchAdExChangeParamsState.mediaAcceptConfig}
                          onChange={handleMediaAcceptConfig}
                  />
                </div>
                <ColTitle><Span1>광고 상품</Span1></ColTitle>
                <div>
                  <AgentType>
                <Checkbox label={'배너'}
                          type={'c'}
                          id={'banner'}
                          isChecked={pTypeChecked.banner}
                          onChange={handlePType}/>
                <Checkbox label={'팝언더'}
                          type={'c'}
                          id={'popUnder'}
                          isChecked={pTypeChecked.popUnder}
                          onChange={handlePType}/>
                  </AgentType>
                </div>
                <ColTitle><Span1>디바이스</Span1></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleDeviceTypeAll}
                    />
                    <Checkbox label={'PC'}
                              type={'c'}
                              id={'pc'}
                              isChecked={deviceChecked.pc}
                              onChange={handleDeviceType}/>
                    <Checkbox label={'MOBILE'}
                              type={'c'}
                              id={'mobile'}
                              isChecked={deviceChecked.mobile}
                              onChange={handleDeviceType}/>
                    <Checkbox label={'반응형'}
                              type={'c'}
                              id={'responsive'}
                              isChecked={deviceChecked.responsive}
                              onChange={handleDeviceType}/>
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={searchMediaTypeAllState}
                        value={searchAdExChangeParamsState.selectMediaType}
                        onChange={handleSearchMediaType}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAdExChangeParamsState.searchName}
                         onChange={handleSearchName}
                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton type={'button'} onClick={handleSearchAdExchange}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardSearchResult>
            <Table columns={columnAdExChangeData}
                   data={adExChangeList}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default AdExchange

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`