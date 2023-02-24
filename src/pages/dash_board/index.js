import styled from "styled-components";

import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer, DashBoardCard, DashBoardHeader, DashBoardColSpan2, RowSpan} from "../../assets/GlobalStyles";
import { linearGradientDef } from '@nivo/core'
import { ResponsivePie } from '@nivo/pie'


function MyResponsivePie(){
  const data = [
    {
      "id": "scala",
      "label": "scala",
      "value": 75,
      "backgroundColor":" linear-gradient(to bottom, #fd730d, #fa9714)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 25,
      "color": "#fff8e8"
    },
  ]
  return(
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      sortByValue={true}
      innerRadius={0.5}

      enableArcLinkLabels={false}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-24}
      arcLinkLabelsStraightLength={0}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
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
          symbolSize: 16,
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
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 점유율</DashBoardHeader>
              <DashBoardBody>
                <div style={{height: 245}}>
                  <MyResponsivePie/>
                </div>
              </DashBoardBody>
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
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