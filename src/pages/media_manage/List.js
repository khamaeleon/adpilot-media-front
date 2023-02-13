import Navigator from "../../components/common/Navigator";
import styled from "styled-components";
import Select from "react-select";
import Checkbox from "@atlaskit/checkbox";
import {ValueContainer} from "react-select/animated";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import {useState} from "react";
import {HorizontalRule} from "../../components/common/Common";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import {mediaSearchResult} from "./entity";

function MediaList(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const inputStyle = {
    input: (baseStyles,state) => (
      {
        ...baseStyles,
        minWidth: "130px",
        height: 36,
        borderRadius: 5,
      })
  }
  const setRangePick = (picked) => {
    console.log(picked)
  }
  return(
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
              <ColSpan>
                <div><span>게시상태</span></div>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan>
              <ColSpan>
                <div><span>광고상품</span></div>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan>
              <ColSpan>
                <div><span>정산 방식</span></div>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan>
            </RowSpan>
            <RowSpan>
              <ColSpan>
                <div><span>디바이스</span></div>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan>
              <ColSpan>
                <div><span>에이전트 유형</span></div>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}/>
                    <Checkbox label={'PC 웹'}/>
                    <Checkbox label={'PC 어플리케이션'}/>
                    <Checkbox label={'반응형웹'}/>
                    <Checkbox label={'MOBILE 웹'}/>
                    <Checkbox label={'Native App'}/>
                    <Checkbox label={'WebApp'}/>
                  </AgentType>
                </div>
              </ColSpan>
            </RowSpan>
            <RowSpan>
              <ColSpan>
                <div><span>기간</span></div>
                <div>
                  <Date>
                    <CalendarBox>
                      <CalendarIcon/>
                    </CalendarBox>
                    <CustomDatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(date) => setDateRange(date)}
                      locale={ko}
                      isClearable={false}
                    />
                  </Date>
                </div>
              </ColSpan>
              <ColSpan>
                <div>
                  <RangePicker>
                    <div onClick={() => setRangePick('thisMonth')}>이번달</div>
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
              </ColSpan>
            </RowSpan>
            <RowSpan>
              <ColSpan>
                <Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/>
              </ColSpan>
              <ColSpan>
                <SearchInput>
                  <input type={'text'} placeholder={'검색할 매체명을 입력해주세요.'}/>
                </SearchInput>
              </ColSpan>
              <ColSpan>
                <SearchButton>검색</SearchButton>
              </ColSpan>
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
                return(
                  <tr key={key}>
                    <td>{item.게재상태}</td>
                    <td>{item.매체명}</td>
                    <td>{item.아이디}</td>
                    <td>{item.지면명}</td>
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
  flex: auto;
  margin-top: 15px;
  gap: 15px;
`

const ColSpan = styled.div`
  display: flex;
  align-items: center;
  & > div:first-child {
    min-width: 65px;
  }
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
`

const SearchInput = styled.div`
  position: relative;
  & input[type='text'] {
    padding: 0 20px;
    width: 470px;
    height: 45px;
    background-color: #f9fafb;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
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

const SearchButton = styled.button`
  width: 140px;
  height: 45px;
  border: 1px solid #dddddd;
  background-color: #fff;
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