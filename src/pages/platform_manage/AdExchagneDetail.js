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

function PlatformAdExchangeDetail(){

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
                <td>네이트 중앙 120*600</td>
                <td>NateAd12</td>
                <td>123456</td>
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
                <th>이전 작성 일시</th>
                <td>YYYY.MM.DD HH:mm</td>
                <th>변경 일시</th>
                <td>YYYY.MM.DD HH:mm</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>이전 작성자</th>
                <td>홍길동</td>
                <th>변경자</th>
                <td>홍길동</td>
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
                <th col={2}>연동사명(송출 순위)</th>
                <th row={2}>연동상태</th>
                <th row={2}>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th></th>
                <th>이전내역</th>
                <th>변경내역</th>
                <th>이전내역</th>
                <th>변경내역</th>
              </tr>
              <tr>
                <th>지면명</th>
                <td>연동중</td>
                <td>연동 중지</td>
                <td>ASKFJEIFLEKAZ,</td>
                <td>DSFIEJFKEFJ;C,VMDFIEJF</td>
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

export default PlatformAdExchangeDetail

const Input = styled.input`
  padding:0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 10px;
  background-color: #f9fafb;
`
