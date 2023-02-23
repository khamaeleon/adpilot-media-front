import styled from "styled-components";

import Navigator from "../../components/common/Navigator";
import DatePicker from "react-datepicker";
import {DashBoardCard, DashBoardHeader, DashBoardColSpan2, RowSpan} from "../../assets/GlobalStyles";

function DashBoard(){
  return(
    <main>
      <BoardContainer>
        <RowSpan style={{alignItems:'flex-end'}}>
          <TitleContainer>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </TitleContainer>
          <div><SwitchUserButton>매체 계정 전환</SwitchUserButton></div>
        </RowSpan>
        <RowSpan style={{gap:30}}>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 현황</DashBoardHeader>
              <DashBoardBody>
              </DashBoardBody>
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>이번달 현황</DashBoardHeader>
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

const SwitchUserButton = styled.button`
  background-color: #fff;
  padding: 13px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const DashBoardBody = styled.div`

`