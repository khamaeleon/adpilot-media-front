import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  BoardTableContainer,
  BoardTap,
  BoardTapTitle,
  SubmitButton,
  SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import {atom, useAtom} from "jotai/index";
import {historyDetailInfo} from "./entity";

const HistoryDetailInfo = atom(historyDetailInfo)

function PlatformHistoryDetail() {
  const [historyDetailInfoState] = useAtom(HistoryDetailInfo)
  return (
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
                <td>{historyDetailInfoState.inventoryName}</td>
                <td>{historyDetailInfoState.accountId}</td>
                <td>{historyDetailInfoState.inventoryCode}</td>
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
                <th>이전 작성 일지</th>
                <td>{historyDetailInfoState.beforeUpdateDate}</td>
                <th>변경일시</th>
                <td>{historyDetailInfoState.lastUpdateDate}</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>이전 작성자</th>
                <td>{historyDetailInfoState.beforeUpdateName}</td>
                <th>변경자</th>
                <td>{historyDetailInfoState.lastUpdateName}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>정산 설정 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
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
                <td>{historyDetailInfo.beforeEventTypeConfig && historyDetailInfo.beforeEventTypeConfig.map((value, key) => {
                  return (
                    value.eventType
                  )
                }).join(',')
                }</td>
                <td>{historyDetailInfo.lastEventTypeConfig && historyDetailInfo.lastEventTypeConfig.map((value, key) => {
                  return (
                    value.eventType
                  )
                }).join(',')}</td>
              </tr>
              <tr>
                <th>이벤트 가중치 설정</th>
                <td>{historyDetailInfo.beforeEventTypeConfig && historyDetailInfo.beforeEventTypeConfig.map((value, key) => {
                  return (
                    value.eventTypeValue
                  )
                }).join(',')}</td>
                <td>{historyDetailInfo.lastEventTypeConfig && historyDetailInfo.lastEventTypeConfig.map((value, key) => {
                  return (
                    value.eventTypeValue
                  )
                }).join(',')}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>정산 설정 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
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
                <td>{historyDetailInfo.beforeCalculationConfig.contractStartDate}</td>
                <td>{historyDetailInfo.lastCalculationConfig.contractStartDate}</td>
              </tr>
              <tr>
                <th>정산 유형 및 정산 금액</th>
                <td>{historyDetailInfo.beforeCalculationConfig.calculationType+'('+historyDetailInfo.beforeCalculationConfig.calculationTypeValue+')'}</td>
                <td>{historyDetailInfo.lastCalculationConfig.calculationType+'('+historyDetailInfo.lastCalculationConfig.calculationTypeValue+')'}</td>
              </tr>
              <tr>
                <th>정산 비고</th>
                <td>{historyDetailInfo.beforeCalculationConfig.calculationEtc}</td>
                <td>{historyDetailInfo.lastCalculationConfig.calculationEtc}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>광고 상품 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
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
                <td>{historyDetailInfo.beforeNoExposedConfig.noExposedConfigType}</td>
                <td>{historyDetailInfo.lastNoExposedConfig.noExposedConfigType}</td>
              </tr>
              <tr>
                <th>매체 정보 설정</th>
                <td>{historyDetailInfo.beforeNoExposedConfig.noExposedConfigTypeValue}</td>
                <td>{historyDetailInfo.lastNoExposedConfig.noExposedConfigTypeValue}</td>
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

export default PlatformHistoryDetail
