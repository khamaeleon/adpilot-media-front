import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {inputStyle} from "../../assets/GlobalStyles";
import Checkbox from "@atlaskit/checkbox";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";

function PlatformAdmin(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const activeStyle = {paddingBottom:16,borderBottom:'4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>어드민 관리</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>관리 구분</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>사용 여부</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan2/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>기간</span></ColTitle>
                <div style={{width:'100%'}}>
                  <Date>
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
                  </Date>
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
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>설정 권한</th>
                <th>아이디</th>
                <th>담당자명</th>
                <th>담당자 연락처</th>
                <th>생성 일시</th>
                <th>사용 여부</th>
              </tr>
              </thead>
              <tbody>
              {/*반복*/}
              <tr>
                <td>최고관리자</td>
                <td>natead123</td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td>사용</td>
              </tr>
              <tr>
                <td>어드민</td>
                <td>natead123</td>
                <td>홍길동</td>
                <td>01012345678</td>
                <td>YYYY.MM.DD</td>
                <td style={{color:"#db6f6f"}}>미사용</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdmin

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
  & div {
    padding-bottom: 20px;
  }
`
const ColTitle = styled.div`
  padding: 0 10px 0 0;
  min-width: 65px;
`

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
  width: 100%;
  padding: 0 20px;
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

const BoardSearchResult = styled.div`
  & table {
    width: 100%;
    & tr {
      & th {
        padding: 14px 0;
        background-color: #fafafa;
        font-size: 15px;
        color: #b2b2b2;
        font-weight: normal;
        white-space: nowrap;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
      }
      & td {
        padding: 25px 0;
        word-break: break-word;
        border-bottom: 1px solid #dddddd;
        text-align: center;
      }
    }
  }
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
    content:"";
    width: 20px;
    height: 20px;
    background-image: url("/assets/images/common/icon_excel_on.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
    
  }
`