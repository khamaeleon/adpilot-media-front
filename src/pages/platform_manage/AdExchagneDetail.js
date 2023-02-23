import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  BoardSearchResult, BoardTableContainer,
  BoardTap,
  BoardTapTitle,
  SubmitButton,
  SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";

function PlatformAdExchangeDetail(){
  const borderRight = {
    borderRight: '1px solid #dddddd'
  }
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <BoardTapTitle>지면 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
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
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>이력 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
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
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>광고 상품 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width={'20%'}></col>
                <col width={'20%'}></col>
                <col width={'20%'}></col>
                <col width={'20%'}></col>
                <col width={'20%'}></col>
              </colgroup>
              <thead>
              <tr>
                <th rowSpan={2} style={borderRight}>연동사명(송출 순위)</th>
                <th colSpan={2} style={borderRight}>연동상태</th>
                <th colSpan={2}>연동사 지면 코드</th>
              </tr>
              <tr>
                <th style={borderRight}>이전내역</th>
                <th style={borderRight}>변경내역</th>
                <th style={borderRight}>이전내역</th>
                <th>변경내역</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={borderRight}>{'크레테오'}</th>
                  <td style={borderRight}>{'연동중'}</td>
                  <td style={borderRight}>{'연동 중'}지</td>
                  <td style={borderRight}>{'ASKFJEIFLEKAZ,'}</td>
                  <td>{'DSFIEJFKEFJ;C,VMDFIEJF'}</td>
                </tr>
                <tr>
                  <th style={borderRight}>{'와이더플래닛'}</th>
                  <td style={borderRight}>{'연동중'}</td>
                  <td style={borderRight}>{'연동 중'}</td>
                  <td style={borderRight}>{'-'}</td>
                  <td>{'-'}</td>
                </tr>
                <tr>
                  <th style={borderRight}>{'Mcorporation'}</th>
                  <td style={borderRight}>{'연동중'}</td>
                  <td style={borderRight}>{'연동 중지'}</td>
                  <td style={borderRight}>{'-'}</td>
                  <td>{'-'}</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>

        <SubmitContainer>
          <SubmitButton>목록</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdExchangeDetail
