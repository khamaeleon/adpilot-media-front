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

function DashBoard(){
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>대시보드</h1>
          <Navigator depth={2}/>
        </TitleContainer>
      </BoardContainer>
    </main>
  )
}

export default DashBoard

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