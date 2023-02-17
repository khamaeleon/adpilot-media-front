import styled from "styled-components";
import DatePicker from "react-datepicker";

export const inputStyle = {
  input: (baseStyles,state) => (
    {
      ...baseStyles,
      minWidth: 150,
      height: 36,
      borderRadius: 5,
    })
}

export const BoardContainer = styled.div`
  padding: 30px;
  background-color: #f8f8f8;
`

export const TitleContainer = styled.div`
  & h1 {
    font-size: 30px;
    font-weight: 700;
  }
`
export const Board = styled.div`
  margin: 34px 0;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

export const BoardTap = styled.div`
  margin: 0 0 34px 0;
  width: 100%;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 0 20px 20px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

export const BoardTapTitle = styled.div`
  margin-top: 34px;
  padding: 12px 0;
  width: 300px;
  background-color: #fff;
  text-align: center;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  font-size: 18px;
  font-weight: bold;
`

export const BoardHeader = styled.div`
  padding: 21px 0;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  font-weight: bold;
`

export const BoardSearchDetail = styled.div`
  padding: 10px 0;
`

export const RowSpan = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`

export const ColSpan1 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 25%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan2 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 50%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan3 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 75%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan4 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  & div {
    padding-bottom: 20px;
  }
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`
export const ColTitle = styled.div`
  padding: 0 10px 0 0;
  min-width: 65px;
`

export const AgentType = styled.div`
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
export const DateContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`

export const CalendarBox = styled.div`
  display: flex;
  width: 55px;
  border-right: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`

export const CalendarIcon = styled.div`
  width: 18px;
  height: 20px;
  background-image: url("/assets/images/common/icon_calendar.png");
`

export const CustomDatePicker = styled(DatePicker)`
  border: none !important;
  color: #a2aab2;
  font-size: 14px;
  width: 100%;
  padding: 0 20px;
`

export const RangePicker = styled.div`
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

export const SearchInput = styled.div`
  position: relative;
  width: 100%;
  & input[type='text'] {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
`

export const SearchButton = styled.button`
  width: 140px;
  height: 45px;
  border: 1px solid #dddddd;
  background-color: #fff;
  border-radius: 5px;
`

export const BoardSearchResult = styled.div`
  margin: 20px 0;
  & table {
    width: 100%;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    & tr {
      & th {
        padding: 14px 0;
        background-color: #fafafa;
        font-size: 15px;
        color: #b2b2b2;
        font-weight: normal;
        white-space: nowrap;
        border-top: 1px solid #dddddd;
      }
      & td {
        padding: 14px 0;
        word-break: break-word;
        border-top: 1px solid #dddddd;
        text-align: center;
        & a {
          border-bottom: 1px solid #777;
        }
      }
    }
  }
`

export const BoardSearchResultTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 20px 0;
  & span {
    color: #f5811f;
  }
`

export const SaveExcelButton = styled.button`
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
export const ChartContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`


export const Span1 = styled.span`
  display: inline-block;
  width: 60px;
`
export const Span2 = styled.span`
  display: inline-block;
  width: 80px;
`
export const Span3 = styled.span`
  display: inline-block;
  width: 100px;
`
export const Span4 = styled.span`
  display: inline-block;
  width: 120px;
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  & button {
    margin: 8px;
    width: 200px;
    height: 60px;
    font-size: 16px;
    cursor: pointer;
  }
`
export const CancelButton = styled.button`
  border: 1px solid #535353;
  background-color: #fff;
`

export const SubmitButton = styled.button`
  background-color: #535353;
  color: #fff;
`

export const ValidationScript = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0px;
  color: #f55a5a;
  font-size: 12px !important;
`

export const Input = styled('input')`
  padding:0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 10px;
`

export const RelativeDiv = styled.div`
  position: relative;
  & > * {
    margin-right: 10px;
  }
`