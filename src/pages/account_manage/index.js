import styled from "styled-components";
import {
  BoardContainer,
  DashBoardHeader,
  DashBoardCard,
  RowSpan,
  TitleContainer,
  DashBoardColSpan2, TextMainColor, BoardSearchResult
} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {Link} from "react-router-dom";

function Account(){
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산관리</h1>
          <Navigator/>
        </TitleContainer>
        <RowSpan style={{gap:30}}>
          <DashBoardColSpan2>
            <DashBoardCard style={{paddingBottom: 20}}>
              <DashBoardHeader>수익 현황</DashBoardHeader>
              <AccountBody>
                <StatusBoard>
                  <div>
                    <p>수익금</p>
                    <p>1,000,000</p>
                  </div>
                  <ul>
                    <li>
                      <p>정산 신청</p>
                      <p>1,000,000</p>
                    </li>
                    <li>
                      <p>잔여 정산금</p>
                      <p>1,000,000</p>
                    </li>
                    <li>
                      <p>총 이월</p>
                      <p>1,000,000</p>
                    </li>
                    <li>
                      <p>지급 예정</p>
                      <p>1,000,000</p>
                    </li>
                    <li>
                      <p>지급 완료</p>
                      <p>1,000,000</p>
                    </li>
                  </ul>
                </StatusBoard>
                <AccountButton>정산 신청</AccountButton>
              </AccountBody>
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>정산 프로필</DashBoardHeader>
              <NoAccountBody>
                <p><TextMainColor>매체 계정으로 전환</TextMainColor>하여 정산 프로필 정보를 확인해주세요.</p>
                <AccountButton>매체 계정 전환</AccountButton>
              </NoAccountBody>
              {/*<AccountBody></AccountBody>*/}
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>월별 정산이력</DashBoardHeader>
          <BoardSearchResult>
            <table>
              <colgroup>
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
                <col width={'10%'} />
              </colgroup>
              <thead>
                <tr>
                  <th>연월</th>
                  <th>요청수</th>
                  <th>응답수</th>
                  <th>노출수</th>
                  <th>클릭수</th>
                  <th>클릭률</th>
                  <th>비용</th>
                  <th>수익금</th>
                  <th>정산 상태</th>
                  <th>이월금</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023.02</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}

export default Account

const AccountButton = styled.button`
  width: 200px; 
  height: 50px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 16px;
`
const NoAccountBody = styled.div`
  height: 320px;
  border: solid 1px #ddd;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    line-height: 23px;
    &:last-of-type {
      margin-bottom: 25px;
    }
  }
  > button {
    background-color: #fff;
  }
`
const AccountBody = styled.div`

`
const StatusBoard = styled.div`
  > div {
    border-top: solid 1px #e9ebee;
    &:first-child {
      height: 58px;
      & p:last-child {
        font-size: 20px;
        font-weight: 600;
        color: #f5811f;
      }
    }
  }
  > ul {
    height: 210px;
    border: solid 1px #e9ebee;
    border-left: 0;
    border-right: 0;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & p:last-child {
      font-size: 18px;
      font-weight: 400;
      &:after {
        content: '원'
      }
    }
  }
`
