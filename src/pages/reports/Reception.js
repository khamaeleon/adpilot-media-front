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

function ReportsReception(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const activeStyle = {paddingBottom:16,borderBottom:'4px solid #f5811f'}
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>매체별 보고서</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>광고상품</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>이벤트</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1>
                <ColTitle><span>외부연동 유무</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan1/>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>디바이스</span></ColTitle>
                <div><Select styles={inputStyle} components={{IndicatorSeparator: () => null}}/></div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>에이전트 유형</span></ColTitle>
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
              </ColSpan3>
            </RowSpan>
            {/*line3*/}
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
          </BoardSearchDetail>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default ReportsReception

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

const ChartContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`