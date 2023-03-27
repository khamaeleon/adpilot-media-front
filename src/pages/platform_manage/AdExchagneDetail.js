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
import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {selAdExChangeHistoryInfo} from "../../services/HistoryAxios";
import moment from "moment";
const AdExChangeDetailInfo = atom(null)
function PlatformAdExchangeDetail(){
  const location  = useLocation();
  const [adExChangeDetailInfoState,setAdExChangeDetailInfoState] = useAtom(AdExChangeDetailInfo)

  useEffect(() => {
    console.log(location.state)
    const params ={
      revId: location.state.revId,
      inventoryExchangeId:  location.state.inventoryExchangeId
    }
    selAdExChangeHistoryInfo(params).then(response => {
      console.log(response)
      setAdExChangeDetailInfoState(response)
    })
  },[])

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <BoardTapTitle>연동사 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>연동사명</th>
                <th>연동사 아이디</th>
                <th>연동사 코드</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.exchangePlatformType}</td>
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.exchangePlatformId}</td>
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.id}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
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
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.inventoryName}</td>
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.username}</td>
                <td>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.inventoryId}</td>
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
                <col width='15%' />
                <col width='35%' />
                <col width='15%' />
                <col width='35%' />
              </colgroup>
              <tbody>
              <tr>
                <th className={'border-r'}>변경일시</th>
                <td className={'border-r'} style={{borderTop:0}}>{adExChangeDetailInfoState !==null && moment(adExChangeDetailInfoState.currentRevision.revisionDateTime).format('YYYY년 MM월 DD일  HH시mm분ss초') }</td>
                <th className={'border-r'}>변경자</th>
                <td style={{borderTop:0}}>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.modifiedBy}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>연동 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              { adExChangeDetailInfoState !==null &&
                <tr>
                  <td>{adExChangeDetailInfoState.previousRevision !==null ? adExChangeDetailInfoState.previousRevision.publish ? 'ON':'OFF' :'-'}</td>
                  <td>{adExChangeDetailInfoState.currentRevision !==null ? adExChangeDetailInfoState.currentRevision.publish ? 'ON':'OFF' :'-'}</td>
                </tr>
              }
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>KEY / VALUE 값 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <tbody>
                <tr>
                  <th rowSpan={2}>이전 내역</th>
                </tr>
                { adExChangeDetailInfoState !==null && adExChangeDetailInfoState.previousRevision  !==null && adExChangeDetailInfoState.previousRevision.params.map((data, index) =>{
                  return (
                    <div key={index}>
                      <td>KEY</td>
                      <td>{data.key}</td>
                      <td>VALUE</td>
                      <td>{data.value}</td>
                    </div>
                  )

                  })
                }
                <tr>
                  <th rowSpan={2}>변경 내역</th>
                </tr>
                { adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision  !==null  && adExChangeDetailInfoState.currentRevision.parmas !==null && adExChangeDetailInfoState.currentRevision.params.map((data, index) =>{
                  return (
                    <div key={index}>
                      <td>KEY</td>
                      <td>{data.key}</td>
                      <td>VALUE</td>
                      <td>{data.value}</td>
                    </div>
                  )
                })
                }
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>송출 순서 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              {
                adExChangeDetailInfoState !==null &&
                <tr>
                  <td>{adExChangeDetailInfoState.previousRevision !==null ? adExChangeDetailInfoState.previousRevision.sortNumber  :'-'}</td>
                  <td>{adExChangeDetailInfoState.currentRevision !==null ? adExChangeDetailInfoState.currentRevision.sortNumber  :'-'}</td>
                </tr>
              }
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
