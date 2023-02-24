import styled from "styled-components";

import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  TitleContainer,
  DashBoardCard,
  DashBoardHeader,
  DashBoardColSpan2,
  RowSpan,
  ChartContainer
} from "../../assets/GlobalStyles";
import { ResponsivePie } from '@nivo/pie'
import {ResponsiveBar} from "@nivo/bar";
import {reportsPeriod} from "../reports/entity";
import React, {useState} from "react";
import {VerticalRule} from "../../components/common/Common";

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

function MyResponsivePie(){
  const data = [
    {
      "id": "banner",
      "label": "배너",
      "value": 25,
      "color": "hsl(293, 70%, 50%)",
    },
    {
      "id": "popUnder",
      "label": "팝언더",
      "value": 75,
      "color": "#fd730d"
    },
  ]
  return(
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      sortByValue={false}
      innerRadius={0.5}
      enableArcLinkLabels={false}
      enableArcLabels={true}
      arcLinkLabel={data => `${data.id} (${data.value})`}
      activeInnerRadiusOffset={0.5}
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends']}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsThickness={0}
      arcLabelsSkipAngle={10}
      colors={{scheme:"nivo"}}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            '1.2'
          ]
        ]
      }}
      transitionMode="startAngle"
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: -3,
          itemsSpacing: 0,
          itemWidth: 36,
          itemHeight: 35,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 30,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}

function DashBoard(){
  const [chartKey, setChartKey] = useState('proceed')
  const activeStyle = {borderBottom:'4px solid #f5811f'}
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  return(
    <main>
      <BoardContainer>
        <RowSpan style={{alignItems:'flex-end', marginTop: 0}}>
          <TitleContainer>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </TitleContainer>
          <div><SwitchUserButton>매체 계정 전환</SwitchUserButton></div>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 현황</DashBoardHeader>
              <DashBoardBody>
                <ProceedBoard>
                  <div>오늘</div>
                  <div>
                    <div><span>10,000,000 원</span></div>
                    <Rating>10%</Rating>
                  </div>
                </ProceedBoard>
                <DailyBoard>
                  <div>
                    <div>어제</div>
                    <Price>10,000,000 원</Price>
                  </div>
                  <div>
                    <div>지난7일</div>
                    <Price>10,000,000 원</Price>
                  </div>
                  <div>
                    <div>이번달</div>
                    <Price>10,000,000 원</Price>
                  </div>
                </DailyBoard>
              </DashBoardBody>
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>이번달 현황</DashBoardHeader>
              <DashBoardBodyColSpan>
                <ColoredBox>
                  <img src={"/assets/images/dashboard/img_dashboard_04.png"}/>
                  <div>요청 수</div>
                  <Price>10,000,000 건</Price>
                </ColoredBox>
                <ColoredBox>
                  <img src={"/assets/images/dashboard/img_dashboard_05.png"}/>
                  <div>노출 수</div>
                  <Price>10,000,000 건</Price>
                </ColoredBox>
                <ColoredBox>
                  <img src={"/assets/images/dashboard/img_dashboard_06.png"}/>
                  <div>클릭 수</div>
                  <Price>10,000,000 건</Price>
                </ColoredBox>
            </DashBoardBodyColSpan>
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>지난 30일 현황</DashBoardHeader>
              <DashBoardBody style={{height: '100%'}}>
                <DashBoardWrap>
                  <LastThirtyDaysItem>
                    <div>
                      <img src={'/assets/images/dashboard/icon_dashboard_main01.png'}/>
                    </div>
                    <div>
                      <div>수익금</div>
                      <BigPrice>10,000,000 원</BigPrice>
                    </div>
                  </LastThirtyDaysItem>
                  <LastThirtyDaysItem>
                    <div>
                      <img src={'/assets/images/dashboard/icon_dashboard_main02.png'}/>
                    </div>
                    <div>
                      <div>요청 수</div>
                      <BigPrice>10,000,000 원</BigPrice>
                    </div>
                  </LastThirtyDaysItem>
                  <LastThirtyDaysItem>
                    <div>
                      <img src={'/assets/images/dashboard/icon_dashboard_main03.png'}/>
                    </div>
                    <div>
                      <div>노출 수</div>
                      <BigPrice>10,000,000 원</BigPrice>
                    </div>
                  </LastThirtyDaysItem>
                  <LastThirtyDaysItem>
                    <div>
                      <img src={'/assets/images/dashboard/icon_dashboard_main04.png'}/>
                    </div>
                    <div>
                      <div>클릭 수</div>
                      <BigPrice>10,000,000 원</BigPrice>
                    </div>
                  </LastThirtyDaysItem>
                </DashBoardWrap>
              </DashBoardBody>
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 점유율</DashBoardHeader>
              <DashBoardBody>
                <PieChartContainer>
                  <PieChartTap>
                    <div>광고상품</div>
                    <div>광고상품</div>
                    <div>광고상품</div>
                  </PieChartTap>
                  <PieChart>
                    <MyResponsivePie/>
                  </PieChart>
                </PieChartContainer>
              </DashBoardBody>
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
          <DashBoardBody>
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
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}

export default DashBoard

const SwitchUserButton = styled.button`
  background-color: #fff;
  padding: 13px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const DashBoardBody = styled.div`

`

const ProceedBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-radius: 10px;
  height: 80px;
  background-image: linear-gradient(to left, #f25108, #fa9714);
  color: #fff;
  & div {
    display: flex;
    align-items: center;
    & > span {
      font-size: 30px;
      font-weight: 800;
    }
  }
`

const Rating = styled.div`
  width: 66px;
  height: 30px;
  margin: 9px 0 5px 20px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(256,256,256,0.21);
  &:before {
    content:"";
    display: inline-block;
    width: 13px;
    height: 9px;
    background-image: url("/assets/images/common/icon_dropup.png");
    background-repeat: no-repeat;
    background-position: center;
  }
`

const DailyBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 5px solid #ffd1af;
    padding: 0 15px;
  }
`

const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const BigPrice = styled.div`
  font-size: 25px;
  font-weight: 700;
`

const DashBoardBodyColSpan = styled.div`
  display: flex;
  height: 165px;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  & > div:nth-child(1) {
    background-color: #fecfcf;
  }
  & > div:nth-child(2) {
    background-color: #fee3cf;
  }
  & > div:nth-child(3) {
    background-color: #fef1cf;
  }
`

const ColoredBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`

const PieChartContainer = styled.div`
  display: flex;
  height:245px;
  border: 1px solid #e9ebee;
  border-radius: 10px;
`

const PieChartTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 16%;
  border-right: 1px solid #e9ebee;
  & > div {
    width: 100%;
    padding-left: 30px
  }
`

const PieChart = styled.div`
  width: 84%;
`

const DashBoardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  height: calc(100% - 50px);
  & > div {
    width: 50%;
  }
`

const LastThirtyDaysItem = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e9ebee;
  border-bottom: 1px solid #e9ebee;
  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background-color: #ffefe2;
  }
  & > div:last-child {
    padding-left: 15px;
  }
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