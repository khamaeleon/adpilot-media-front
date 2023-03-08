import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType,
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  reportsAdExchangeAtom,
  reportsStaticsAdExchange,
  reportsStaticsAdExchangeColumn
} from "./entity";
import {atom} from "jotai/index";

const condition = atom(reportsAdExchangeAtom)

function ReportsReception(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const groupStyle = {
    textAlign: 'center'
  }
  const groups = [
    { name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
    { name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle },
  ]
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
                    <Checkbox label={'전체'} type={'c'} id={'all'} onChange={() => { return null }}/>
                    <Checkbox label={'PC 웹'} type={'c'} id={'pc'} onChange={() => { return null }}/>
                    <Checkbox label={'PC 어플리케이션'} type={'c'} id={'pc-app'} onChange={() => { return null }}/>
                    <Checkbox label={'반응형웹'} type={'c'} id={'responsive'} onChange={() => { return null }}/>
                    <Checkbox label={'MOBILE 웹'} type={'c'} id={'mobile'} onChange={() => { return null }}/>
                    <Checkbox label={'Native App'} type={'c'} id={'native'} onChange={() => { return null }}/>
                    <Checkbox label={'WebApp'} type={'c'} id={'webapp'} onChange={() => { return null }}/>
                  </AgentType>
                </div>
              </ColSpan3>
            </RowSpan>
            {/*line3*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>기간</span></ColTitle>
                <div style={{width:'100%'}}>
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
          </BoardSearchDetail>
          <BoardSearchResult>
            <Table columns={reportsStaticsAdExchangeColumn}
                   data={reportsStaticsAdExchange.rows}
                   groups={groups}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default ReportsReception
