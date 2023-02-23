import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import moment from "moment";
import {useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";
import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, BoardSearchResult, BoardSearchResultTitle, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan, SaveExcelButton, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import {Link} from "react-router-dom";
import Checkbox from "../../components/common/Checkbox";
import {searchHistoryParams} from "./entity";

function PlatformHistory() {
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const activeStyle = {paddingBottom: 16, borderBottom: '4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchHistoryParamsState, setSearchHistoryParamsState] = useState(searchHistoryParams)
  useEffect(() => {
    console.log(searchHistoryParamsState)
    if (!searchHistoryParamsState.eventType && !searchHistoryParamsState.eventTypeValue && !searchHistoryParamsState.calculationType && !searchHistoryParamsState.noExposedConfigType ) {
      setIsCheckedAll(false)

    } else if (searchHistoryParamsState.eventType && searchHistoryParamsState.eventTypeValue && searchHistoryParamsState.calculationType && searchHistoryParamsState.noExposedConfigType ) {
      setIsCheckedAll(true)

    } else {
      setIsCheckedAll(false)

    }
  }, [searchHistoryParamsState, isCheckedAll]);
  const handleChangeSelectAll = (event) => {
    setIsCheckedAll(event.target.checked)
    setSearchHistoryParamsState({
      ...searchHistoryParamsState,
      eventType: event.target.checked,
      eventTypeValue: event.target.checked,
      calculationType: event.target.checked,
      noExposedConfigType: event.target.checked
    })
  }

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if (event.target.id === 'eventType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        eventType: event.target.checked
      })
    }
    if (event.target.id === 'eventTypeValue') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        eventTypeValue: event.target.checked
      })
    }
    if (event.target.id === 'calculationType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        calculationType: event.target.checked
      })
    }
    if (event.target.id === 'noExposedConfigType') {
      setSearchHistoryParamsState({
        ...searchHistoryParamsState,
        noExposedConfigType: event.target.checked
      })
    }
  }
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 이력 관리</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan3>
                <ColTitle><span>변경 항목</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'all'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeSelectAll}
                    />
                    <Checkbox label={'이벤트 설정'}
                              type={'c'}
                              id={'eventType'}
                              isChecked={searchHistoryParamsState.eventType}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'이벤트 단가'}
                              type={'c'}
                              id={'eventTypeValue'}
                              isChecked={searchHistoryParamsState.eventTypeValue}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'정산 정보'}
                              type={'c'}
                              id={'calculationType'}
                              isChecked={searchHistoryParamsState.calculationType}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'미송출 설정'}
                              type={'c'}
                              id={'noExposedConfigType'}
                              isChecked={searchHistoryParamsState.noExposedConfigType}
                              onChange={handleChangeChecked}/>
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
            {/*line2*/}
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
                      onChange={(date) => setDateRange(date)}
                      dateFormat="MM월 dd일"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan1>
              <ColSpan3>
                <div>
                  <RangePicker>
                    <div>이번달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난달</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>오늘</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>어제</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난7일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난30일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난90일</div>
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div>지난 180일</div>
                  </RangePicker>
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/>
                <SearchInput>
                  <input type={'text'} placeholder={'검색할 매체명을 입력해주세요.'}/>
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton>검색</SearchButton>
              </ColSpan2>
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
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>매체명</th>
                <th>매체 구분</th>
                <th>아이디</th>
                <th>사업자 등록 번호</th>
                <th>담당자명</th>
                <th>담당자 연락처</th>
                <th>가입 일시</th>
                <th>사용 여부</th>
              </tr>
              </thead>
              <tbody>
              {/*반복*/}
              <tr>
                <td>네이트</td>
                <td>매체사</td>
                <td><Link to={'/board/platform3/detail?id=1'}>natead123</Link></td>
                <td>123-45-67890</td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td>사용</td>
              </tr>
              <tr>
                <td>네이트</td>
                <td>매체사</td>
                <td>natead123</td>
                <td>123-45-67890</td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td style={{color: "#db6f6f"}}>미사용</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformHistory
