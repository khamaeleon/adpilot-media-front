import styled from "styled-components";

import Navigator from "../../components/common/Navigator";
import DatePicker from "react-datepicker";
import {Board, BoardHeader, ColSpan2, RowSpan} from "../../assets/GlobalStyles";

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
          <ColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 현황</DashBoardHeader>
              <DashBoardBody>
              </DashBoardBody>
            </DashBoardCard>
          </ColSpan2>
          <ColSpan2>
            <DashBoardCard>
              <DashBoardHeader>이번달 현황</DashBoardHeader>
            </DashBoardCard>
          </ColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30}}>
          <ColSpan2>
            <DashBoardCard>
              <DashBoardHeader>지난 30일 현황</DashBoardHeader>
            </DashBoardCard>
          </ColSpan2>
          <ColSpan2>
            <DashBoardCard>
              <DashBoardHeader>수익금 점유율</DashBoardHeader>
            </DashBoardCard>
          </ColSpan2>
        </RowSpan>
        <RowSpan>
          <DashBoardCard>
            <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
          </DashBoardCard>
        </RowSpan>
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
const DashBoardCard = styled.div`
  margin-top: 15px;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

const DashBoardHeader = styled.div`
  padding: 21px 0;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`

const DashBoardBody = styled.div`

`