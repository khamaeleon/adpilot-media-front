import {
  AgentType,
  ColSpan1,
  ColSpan3,
  ColTitle,
  inputStyle,
  RowSpan,
  SearchButton,
  SearchInput,
  Span4
} from "../../assets/GlobalStyles";
import Select from "react-select";
import {
  agentTypeInfo,
  calculationAllType,
  deviceTypeInfo,
  productTypeInfo,
  searchInfo,
  searchMediaTypeAll
} from "../../pages/media_manage/entity/common";
import React, {useState} from "react";
import Checkbox from "./Checkbox";

export default function SearchBoard (props) {
  const {productType, deviceType, calculationType, agentType, searchKeyword, onSearch} = props;
  const [searchInfoState, setSearchInfoState] = useState(searchInfo)

  /**
   * 광고 상품 선택
   * @param productType
   */
  const handleProductType = (productType) => {
    setSearchInfoState({
      ...searchInfoState,
      productType: productType
    })
  }

  /**
   * 디바이스 유형 선택
   * @param deviceType
   */
  const handleDeviceType = (deviceType) => {
    setSearchInfoState({
      ...searchInfoState,
      deviceType: deviceType
    })
  }

  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setSearchInfoState({
      ...searchInfoState,
      calculationType: calculationType
    })
    //지면리스트 호출
  }

  /**
   * 에이전트 유형 선택
   * @param agentType
   */
  const handleAgentType = (e) => {
    if(e.target.checked){
      setSearchInfoState({
        ...searchInfoState,
        agentTypes: searchInfoState.agentTypes.concat(e.target.value)
      })
    }else{
      setSearchInfoState({
        ...searchInfoState,
        agentTypes: searchInfoState.agentTypes.filter(type => type !== e.target.value)
      })
    }
  }

  /**
   * 검색타입 선택
   * @param searchMediaType
   */
  const handleSearchMediaTypeAll = (searchMediaType) => {
    setSearchInfoState({
      ...searchInfoState,
      searchKeywordType: searchMediaType
    })
    //지면리스트 호출
  }

  /**
   * 검색어 입력
   * @param event
   */
  const handleSearchName = (event) => {
    setSearchInfoState({
      ...searchInfoState,
      keyword: event.target.value
    })
  }

  const onClickSearch =() => {
    onSearch(searchInfoState)
  }

  return (
    <>
      <RowSpan>
        {productType &&
            <ColSpan1>
              <ColTitle><span>광고 상품</span></ColTitle>
              <Select styles={inputStyle}
                      components={{IndicatorSeparator: () => null}}
                      options={productTypeInfo}
                      value={(searchInfoState.productType !== undefined && searchInfoState.productType.value !== '') ? searchInfoState.productType : {id: "1", value: "all", label: "전체"}}
                      onChange={handleProductType}
              />
            </ColSpan1>
        }
        {deviceType &&
          <ColSpan1>
            <Span4><span>디바이스 유형</span></Span4>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={deviceTypeInfo}
                    value={(searchInfoState.deviceType !== undefined && searchInfoState.deviceType.value !== '') ? searchInfoState.deviceType : {id: "1", value: "all", label: "전체"}}
                    onChange={handleDeviceType}
            />
          </ColSpan1>
        }
        {calculationType &&
          <ColSpan1>
            <ColTitle><span>정산 방식</span></ColTitle>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={calculationAllType}
                    value={(searchInfoState.calculationType !== undefined && searchInfoState.calculationType.value !== '') ? searchInfoState.calculationType : {id: "1", value: "all", label: "전체"}}
                    onChange={handleCalculationType}
            />
          </ColSpan1>
        }
      </RowSpan>
      {agentType &&
        <RowSpan>
          <ColSpan3>
            <ColTitle><span>에이전트 유형</span></ColTitle>
            <div>
              <AgentType>
                {agentTypeInfo.map(type => {return (
                    <Checkbox label={type.label} type={'c'} id={type.id} value={type.value} onChange={handleAgentType}/>
                )})}

              </AgentType>
            </div>
          </ColSpan3>
        </RowSpan>
      }
      {searchKeyword &&
        <RowSpan>
          <ColSpan1>
            <Select styles={inputStyle}
                    components={{IndicatorSeparator: () => null}}
                    options={searchMediaTypeAll}
                    value={(searchInfoState.searchKeywordType !== undefined && searchInfoState.searchKeywordType.value !== '') ? searchInfoState.searchKeywordType : {id: "1", value: "all", label: "전체"}}
                    onChange={handleSearchMediaTypeAll}
            />
          </ColSpan1>
          <ColSpan1>
            <SearchInput>
              <input type={'text'}
                     placeholder={'검색할 매체명을 입력해주세요.'}
                     value={searchInfoState.keyword}
                     onChange={handleSearchName}
                     onKeyDown={event => (event.code === 'Enter') && onClickSearch() }

              />
            </SearchInput>
          </ColSpan1>
          <ColSpan1>
            <SearchButton onClick={onClickSearch}>검색</SearchButton>
          </ColSpan1>

        </RowSpan>
      }
    </>
  )
}