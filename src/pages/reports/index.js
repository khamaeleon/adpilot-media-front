import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardSearchResult, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import moment from "moment";
import React, {useCallback, useEffect, useState} from "react";
import {modalController} from "../../store";
import {useAtom} from "jotai";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1,  ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan,
  TitleContainer,
  AgentType, ColSpan4, ChartContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table, {ButtonRef, LinkRef, RenderButton, renderSwitch} from "../../components/table";
import { reportsPeriod, reportsPeriodColumns} from "./entity";
import { ResponsiveBar } from '@nivo/bar'

function MyResponsiveBar(props) {
  return (
    <ResponsiveBar
      data={reportsPeriod}
      keys={[props.data]}
      indexBy="period"
      margin={{top: 40, right: 130, bottom: 130, left: 60}}
      padding={0.75}
      width={1100}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={{scheme: 'nivo'}}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}

function Reports(){
  const today = moment().toDate()
  const tomorrow = moment().add(1, 'd').toDate();
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const [startDate, endDate] = dateRange;
  const [chartKey, setChartKey] = useState('proceed')
  const activeStyle = {borderBottom:'4px solid #f5811f'}
  const [modal, setModal] = useAtom(modalController)

  const componentModal = () => {
    return (
      <div>
        <ModalHeader title={'일자별 통계'}/>
        <ModalBody>
          <ModalContainer>
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
          </ModalContainer>
        </ModalBody>
      </div>
    )
  }
  useEffect(()=>{
    setModal({
      isShow: false,
      width: 1500,
      modalComponent: () => componentModal()
    })
  },[])

  const handleCheckBoxChange = (e) => {
    console.log(e.target.value)
  }

  const columnSetting = {
    default: {
      textAlign: "center"
    },
    setColumns: [
      {
        target: 0,
        value: {
          defaultVisible: false,
          type: "date"
        },
      },
      {
        target: 1,
        value: {}
      }
    ]
  }
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>기간별 보고서</BoardHeader>
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
          <ChartContainer style={{height:250}}>
            <ChartLabel>
              <div onClick={() => handleChangeChartKey('proceed')} style={chartKey==='proceed' ? activeStyle : null}>수익금</div>
              <div onClick={() => handleChangeChartKey('request')} style={chartKey==='request' ? activeStyle : null}>요청수</div>
              <div onClick={() => handleChangeChartKey('require')} style={chartKey==='require' ? activeStyle : null}>응답수</div>
              <div onClick={() => handleChangeChartKey('impression')} style={chartKey==='impression' ? activeStyle : null}>노출수</div>
              <div onClick={() => handleChangeChartKey('clicks')} style={chartKey==='clicks' ? activeStyle : null}>클릭수</div>
              <div onClick={() => handleChangeChartKey('clickRate')} style={chartKey==='clickRate' ? activeStyle : null}>클릭률</div>
              <div onClick={() => handleChangeChartKey('expense')} style={chartKey==='expense' ? activeStyle : null}>비용</div>
              <div onClick={() => handleChangeChartKey('CPC')} style={chartKey==='CPC' ? activeStyle : null}>CPC</div>
              <div onClick={() => handleChangeChartKey('eCPM')} style={chartKey==='eCPM' ? activeStyle : null}>eCPM</div>
            </ChartLabel>
            <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
            <MyResponsiveBar data={chartKey}/>
          </ChartContainer>
          <BoardSearchResult>
            <Table columns={reportsPeriodColumns}
                   data={reportsPeriod}
                   settings={columnSetting}/>
          </BoardSearchResult>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default Reports

const ModalContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`

const ChartLabel = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  & div {
    display: flex;
    align-items: center;
    height: 45px;
    cursor: pointer;
  }
`