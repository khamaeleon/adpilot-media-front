import {BoardTableContainer, BoardTap, BoardTapTitle, SubmitButton, SubmitContainer} from "../../assets/GlobalStyles";
import {atom, useAtom} from "jotai";
import {eventTypeAll} from "./entity/common";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {selHistoryInfo} from "../../services/platform/HistoryAxios";
import moment from "moment/moment";

const HistoryDetailInfo = atom(null)

function PlatformHistoryDetail() {
  const navigate = useNavigate()
  const {state} = useLocation();
  const [historyDetailInfoState, setHistoryDetailInfoState] = useAtom(HistoryDetailInfo)
  useEffect(() => {
    selHistoryInfo(state).then(response => {
      setHistoryDetailInfoState(response)
    })
  }, [])

  return (
    <>
      <BoardTapTitle>지면 정보</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='30%'/>
              <col width='30%'/>
              <col width='40%'/>
            </colgroup>
            <thead>
            <tr>
              <th className={'border-r'}>지면명</th>
              <th className={'border-r'}>아이디</th>
              <th>지면코드</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td
                className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.inventoryName}</td>
              <td
                className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.username}</td>
              <td>{historyDetailInfoState !== null && historyDetailInfoState.inventoryId}</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>이력 정보</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='35%'/>
              <col width='15%'/>
              <col width='35%'/>
            </colgroup>
            <tbody>
            <tr>
              <th className={'border-r'}>변경일시</th>
              <td className={'border-r'}
                  style={{borderTop: 0}}>{historyDetailInfoState !== null && moment(historyDetailInfoState.currentRevision.modifiedAt).format('YYYY년 MM월 DD일  HH시mm분ss초')}</td>
              <th className={'border-r'}>변경자</th>
              <td
                style={{borderTop: 0}}>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.modifiedBy}</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>게재 상태 설정이력</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='30%'/>
              <col width='35%'/>
              <col width='35%'/>
            </colgroup>
            <tbody>
            <tr>
              <th className={'border-r'} rowSpan='2'>게재상태</th>
              <th className={'border-r'}>이전내역</th>
              <th>변경내역</th>
            </tr>
            <tr>
              <td
                className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision ? historyDetailInfoState.previousRevision.publishYn ? '게재중' : '게재중지' : '-'}</td>
              <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.publishYn ? '게재중' : '게재중지'}</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>이벤트 설정 이력</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='30%'/>
              <col width='35%'/>
              <col width='35%'/>
            </colgroup>
            <thead>
            <tr>
              <th className={'border-r'}>항목명</th>
              <th className={'border-r'}>이전 내역</th>
              <th>변경 내역</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className={'border-r border-t'}>이벤트 설정</th>
              <td
                className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision ? historyDetailInfoState.previousRevision.allowEvents.map((value) => {
                return (
                  eventTypeAll.find(type => type.value === value.eventType).label
                )
              }).join(',') : '-'}</td>
              <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.allowEvents.map((value) => {
                return (
                  eventTypeAll.find(type => type.value === value.eventType).label
                )
              }).join(',')}</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>이벤트 가중치 설정</th>
              <td
                className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision ? historyDetailInfoState.previousRevision.allowEvents.map((value) => {
                return (
                  value.exposureWeight
                )
              }).join(',') : '-'}</td>
              <td>
                {historyDetailInfoState !== null &&
                  historyDetailInfoState.currentRevision.allowEvents.map((value) => {
                    return (
                      value.exposureWeight
                    )
                  }).join(',')
                }
              </td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>정산 설정 이력</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='20%'/>
              <col width='25%'/>
              <col width='30%'/>
              <col width='25%'/>
            </colgroup>
            <thead>
              <tr>
                <th className={'border-r'}>항목명</th>
                <th className={'border-r'}>계약 기간</th>
                <th className={'border-r'}>정산 유형 및 정산 금액</th>
                <th>정산 비고</th>
              </tr>
            </thead>
            <tbody>
              {historyDetailInfoState !== null && historyDetailInfoState.previousRevision !== null ? historyDetailInfoState.previousRevision.feeCalculations.map((data, index) => {
                  const {length} = historyDetailInfoState.previousRevision.feeCalculations;
                  return (
                  <tr key={index}>
                    {index === 0 &&
                      <th className={'border-r border-t'} rowSpan={length}>이전항목</th>
                    }
                    <td className={'border-r'}>{data.contractStartDate}</td>
                    <td className={'border-r'}>{data.calculationType+'('+data.calculationValue+')'}</td>
                    <td>{data.etc}</td>
                  </tr>
                )
              }) :
                <tr>
                  <th className={'border-r border-t'}>이전항목</th>
                  <td className={'border-r'}>-</td>
                  <td className={'border-r'}>-</td>
                  <td>-</td>
                </tr>
              }

              {historyDetailInfoState !== null && historyDetailInfoState.currentRevision !== null ? historyDetailInfoState.currentRevision.feeCalculations.map((data, index) => {
                  const {feeCalculations} = historyDetailInfoState.currentRevision;
                  return (
                  <tr key={index}>
                    {index === 0 &&
                      <th className={'border-r border-t'}  rowSpan={feeCalculations.length}>변경항목</th>
                    }
                    <td className={'border-r'}>{data.contractStartDate}</td>
                    <td className={'border-r'}>{data.calculationType+'('+data.calculationValue+')'}</td>
                    <td>{data.etc}</td>
                  </tr>
                )
              }) :
                <tr>
                  <th className={'border-r border-t'}>변경항목</th>
                  <td className={'border-r'}>-</td>
                  <td className={'border-r'}>-</td>
                  <td>-</td>
                </tr>
              }
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>지면 상세 설정 이력</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width='30%'/>
              <col width='35%'/>
              <col width='35%'/>
            </colgroup>
            <thead>
            <tr>
              <th className={'border-r'}>지면명</th>
              <th className={'border-r'}>이전 내역</th>
              <th>변경 내역</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className={'border-r border-t'}>광고 미송출 대체 설정</th>
              <td className={'border-r'}>
                {historyDetailInfoState !== null && historyDetailInfoState.previousRevision !== null &&
                  <>
                    <span>{historyDetailInfoState.previousRevision.nonExposureConfigType}</span>
                    {historyDetailInfoState.previousRevision.nonExposureConfigValue !== null && <span>({historyDetailInfoState.previousRevision.nonExposureConfigValue})</span>}
                  </>
                }
              </td>
              <td>
                {historyDetailInfoState !== null && historyDetailInfoState.currentRevision !== null &&
                  <>
                    <span>{historyDetailInfoState.currentRevision.nonExposureConfigType}</span>
                    {historyDetailInfoState.currentRevision.nonExposureConfigValue !== null && <span>({historyDetailInfoState.currentRevision.nonExposureConfigValue})</span>}
                  </>
                }
              </td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>

      <SubmitContainer>
        <SubmitButton onClick={() => navigate('/board/platformHistory')}>목록</SubmitButton>
      </SubmitContainer>
    </>
  )
}

export default PlatformHistoryDetail
