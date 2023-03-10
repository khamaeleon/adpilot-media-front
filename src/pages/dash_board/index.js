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
import {reportsStaticsAll} from "../reports/entity";
import React, {useState} from "react";
import {VerticalRule} from "../../components/common/Common";
import {ModalMediaResult} from "../media_manage";
import {atom, useAtom} from "jotai/index";
import {modalController} from "../../store";
import {mediaResistInfo, mediaSearchInfo} from "../media_manage/entity";
import {ResponsiveSunburst} from "@nivo/sunburst";
const MediaResistAtom = atom(mediaResistInfo)
const MediaSearchInfo = atom(mediaSearchInfo)

function MyResponsiveBar(props) {
  return (
    <ResponsiveBar
      data={reportsStaticsAll.rows}
      keys={[props.data]}
      indexBy="historyDate"
      margin={{top: 40, right: 130, bottom: 130, left: 60}}
      padding={0.75}
      width={1100}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={["#f5811f"]}
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


function MyResponsivePie(props){
  const formatting = (v,vc) => {
    let a = vc/(v[0] + v[1])
    return a
  }
  const value = [10000,15000]
  const data = [
    {
      id: "c",
      label: "팝언더",
      value: formatting(value,value[0]),
    },
    {
      id: "a",
      label: "배너",
      value: formatting(value,value[1]),
    },
  ]


  return(
    <PieChartCentered>
      <CenteredInfo>
        <div>total</div>
        {value[0] + value[1]}
      </CenteredInfo>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        colors={["#fff8e8","#ffd1af", "#f5811f"]}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        enableArcLinkLabels={false}
        valueFormat={"-.0%"}
        legends={[{
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 50,
          itemHeight: 30,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
        }]}
      />
    </PieChartCentered>
  )
}

const PieChartCentered = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
`

const CenteredInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  & div {
    text-align: center;
    font-size: 12px;
  }
`

function DashBoard(){
  const [chartKey, setChartKey] = useState('proceed')
  const [, setModal] = useAtom(modalController)
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [searchKeyword, setSearchKeyword] = useState('')
  const activeStyle = {borderBottom:'4px solid #f5811f'}
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
  }

  const handleSearchKeyword = (event) => {
    console.log(event.target.value)
    setSearchKeyword(event.target.value)
  }

  /**
   * 모달안에 선택완료 선택시
   */
  const handleMediaSearchSelected = (item) => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    setMediaResistState({
      ...mediaResistState,
      siteName: item.siteName
    })
  }
  /**
   * 매체 계정 전환 버튼 클릭시
   */
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return <ModalMediaResult searchKeyword={searchKeyword} onResult={handleSearchResult} onSearchKeyword={handleSearchKeyword} onSearch={handleMediaSearchSelected}/>
      }
    })
  }

  return(
    <main>
      <BoardContainer>
        <RowSpan style={{alignItems:'center', marginTop: 0}}>
          <TitleContainer>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </TitleContainer>
          <div><SwitchUserButton type={'button'} onClick={handleModalComponent}>매체 계정 전환</SwitchUserButton></div>
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
                <div onClick={() => handleChangeChartKey('proceedsAmount')} style={chartKey==='proceedsAmount' ? activeStyle : null}>수익금</div>
                <div onClick={() => handleChangeChartKey('requestCount')} style={chartKey==='requestCount' ? activeStyle : null}>요청수</div>
                <div onClick={() => handleChangeChartKey('responseCount')} style={chartKey==='responseCount' ? activeStyle : null}>응답수</div>
                <div onClick={() => handleChangeChartKey('exposureCount')} style={chartKey==='exposureCount' ? activeStyle : null}>노출수</div>
                <div onClick={() => handleChangeChartKey('clickCount')} style={chartKey==='clickCount' ? activeStyle : null}>클릭수</div>
                <div onClick={() => handleChangeChartKey('costAmount')} style={chartKey==='costAmount' ? activeStyle : null}>비용</div>
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
  height: 60px;
  background-image: linear-gradient(to left, #f25108, #fa9714);
  color: #fff;
  & div {
    display: flex;
    align-items: center;
    & > span {
      font-size: 25px;
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
  font-size: 15px;
  font-weight: 700;
`

const BigPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const DashBoardBodyColSpan = styled.div`
  display: flex;
  height: 145px;
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
  height: 245px;
  border: 1px solid #e9ebee;
  border-radius: 10px;
`

const PieChartTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  border-right: 1px solid #e9ebee;
  & > div {
    width: 100%;
    padding-left: 30px;
  }
`

const PieChart = styled.div`
  width: 80%;
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
    border-bottom: 4px solid #fff
  }
`