import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  BoardSearchResult,
  BoardTap,
  BoardTapTitle,
  SubmitButton,
  SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";

function PlatformHistoryDetail(){

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <BoardTapTitle>지면 정보</BoardTapTitle>
        <BoardTap>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>지면명</th>
                <th>아이디</th>
                <th>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>지면명</td>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </BoardTap>
        <BoardTapTitle>이력 정보</BoardTapTitle>
        <BoardTap>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <th>지면번호</th>
                <td>지면번호</td>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <th>지면명</th>
                  <td>아이디</td>
                  <th>지면번호</th>
                  <td>지면번호</td>
                </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </BoardTap>
        <BoardTapTitle>정산 설정 정보</BoardTapTitle>
        <BoardTap>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>지면명</th>
                <th>아이디</th>
                <th>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </BoardTap>
        <BoardTapTitle>정산 설정 정보</BoardTapTitle>
        <BoardTap>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>지면명</th>
                <th>아이디</th>
                <th>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </BoardTap>
        <BoardTapTitle>광고 상품 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardSearchResult>
            <table>
              <thead>
              <tr>
                <th>지면명</th>
                <th>아이디</th>
                <th>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              <tr>
                <th>지면명</th>
                <td>아이디</td>
                <td>지면번호</td>
              </tr>
              </tbody>
            </table>
          </BoardSearchResult>
        </BoardTap>

        <SubmitContainer>
          <SubmitButton>목록</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
    </main>
  )
}

export default PlatformHistoryDetail

const Input = styled.input`
  padding:0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 10px;
  background-color: #f9fafb;
`
