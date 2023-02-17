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
                <td>{'네이트 중앙'}</td>
                <td>{'Natead123'}</td>
                <td>{'123456'}</td>
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
                <th>이전 작성 일지</th>
                <td>{'YYYY.MM.DD hh:mm'}</td>
                <th>변경일시</th>
                <td>{'YYYY.MM.DD hh:mm'}</td>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <th>이전 작성자</th>
                  <td>{'홍길동'}</td>
                  <th>변경자</th>
                  <td>{'홍길동'}</td>
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
                <th>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>이벤트 설정</th>
                <td>{'본상품'}</td>
                <td>{['장바구니', '리턴매칭'].join(',')}</td>
              </tr>
              <tr>
                <th>이벤트 가중치 설정</th>
                <td>{['본상품(100%)', '장바구니(100%)','리턴매칭(100%)'].join(',')}</td>
                <td>{['본상품(110%)', '장바구니(90%)','리턴매칭(100%)'].join(',')}</td>
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
                <th>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>계약 기간</th>
                <td>{'YYYY.MM.DD hh:mm'}</td>
                <td>{'YYYY.MM.DD hh:mm'}</td>
              </tr>
              <tr>
                <th>정산 유형 및 정산 금액</th>
                <td>{'CPC(120원)'}</td>
                <td>{'RS(50%)'}</td>
              </tr>
              <tr>
                <th>정산 비고</th>
                <td>{'-'}</td>
                <td>{'매체사 요청으로 변경하였습니다'}</td>
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
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>광고 미송출 대체 설정</th>
                <td>{'대체 이미지'}</td>
                <td>{'URL(www.naver.com)'}</td>
              </tr>
              <tr>
                <th>매체 정보 설정</th>
                <td>{'-'}</td>
                <td>{'네이트'}</td>
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
