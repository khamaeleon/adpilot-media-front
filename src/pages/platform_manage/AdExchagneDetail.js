import {BoardTableContainer, BoardTap, BoardTapTitle, SubmitButton, SubmitContainer} from "../../assets/GlobalStyles";
import {atom, useAtom} from "jotai";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {selAdExChangeHistoryInfo} from "../../services/platform/HistoryAxios";
import moment from "moment";

const AdExChangeDetailInfo = atom(null)
function PlatformAdExchangeDetail(){
  const location  = useLocation();
  const [adExChangeDetailInfoState,setAdExChangeDetailInfoState] = useAtom(AdExChangeDetailInfo)
  const navigate = useNavigate()

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
    <>
      <BoardTapTitle>연동사 정보</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width={'33%'} />
              <col width={'33%'} />
              <col width={'33%'} />
            </colgroup>
            <thead>
              <tr>
                <th className={'border-r'}>연동사명</th>
                <th className={'border-r'}>연동사 아이디</th>
                <th>연동사 코드</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={'border-r'}>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.exchangePlatformType}</td>
                <td className={'border-r'}>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision.exchangePlatformId}</td>
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
            <colgroup>
              <col width={'25%'} />
              <col width={'25%'} />
              <col width={'50%'} />
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
              <td className={'border-r'}>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.inventoryName}</td>
              <td className={'border-r'}>{adExChangeDetailInfoState !==null && adExChangeDetailInfoState.username}</td>
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
            <colgroup>
              <col width='50%' />
              <col width='50%' />
            </colgroup>
            <thead>
              <tr>
                <th className={'border-r'}>이전 내역</th>
                <th>변경 내역</th>
              </tr>
            </thead>
            <tbody>
            { adExChangeDetailInfoState !==null &&
              <tr>
                <td className={'border-r'}>{adExChangeDetailInfoState.previousRevision !==null ? adExChangeDetailInfoState.previousRevision.publishYn ? 'ON':'OFF' :'-'}</td>
                <td>{adExChangeDetailInfoState.currentRevision !==null ? adExChangeDetailInfoState.currentRevision.publishYn ? 'ON':'OFF' :'-'}</td>
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
            <colgroup>
              <col width='30%' />
              <col width='35%' />
              <col width='35%' />
            </colgroup>
            <thead>
              <tr>
                <th className={'border-r'}>항목명</th>
                <th className={'border-r'}>key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              { adExChangeDetailInfoState !==null && adExChangeDetailInfoState.previousRevision  !==null && adExChangeDetailInfoState.previousRevision.params !== null ? adExChangeDetailInfoState.previousRevision.params.map((data, index) =>{
                  const {length} = adExChangeDetailInfoState.previousRevision.params;
                  return (
                    <tr key={index}>
                      {index === 0 &&
                        <th className={'border-r border-t'} rowSpan={length}>이전항목</th>
                      }
                      <td className={'border-r'}>{data.key}</td>
                      <td>{data.value}</td>
                    </tr>
                  )
                }) :
                <tr>
                  <th className={'border-r border-t'}>이전항목</th>
                  <td className={'border-r'}>-</td>
                  <td>-</td>
                </tr>
              }
              { adExChangeDetailInfoState !==null && adExChangeDetailInfoState.currentRevision  !==null  && adExChangeDetailInfoState.currentRevision.parmas !==null && adExChangeDetailInfoState.currentRevision.params !== null ? adExChangeDetailInfoState?.currentRevision.params.map((data, index) =>{
                  const {params} = adExChangeDetailInfoState?.currentRevision;
                  return (
                    <tr key={index}>
                      {index === 0 &&
                        <th className={'border-r border-t'}  rowSpan={params.length}>변경항목</th>
                      }
                      <td className={'border-r'}>{data.key}</td>
                      <td>{data.value}</td>
                    </tr>
                  )
                }) :
                <tr>
                  <th className={'border-r border-t'}>변경항목</th>
                  <td className={'border-r'}>-</td>
                  <td>-</td>
                </tr>
              }
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <BoardTapTitle>송출 순서 설정</BoardTapTitle>
      <BoardTap>
        <BoardTableContainer>
          <table>
            <colgroup>
              <col width={'50%'} />
              <col width={'50%'} />
            </colgroup>
            <thead>
              <tr>
                <th className={'border-r'}>이전 내역</th>
                <th>변경 내역</th>
              </tr>
            </thead>
            <tbody>
            {
              adExChangeDetailInfoState !==null &&
              <tr>
                <td className={'border-r'}>{adExChangeDetailInfoState.previousRevision !==null ? adExChangeDetailInfoState.previousRevision.exchangeOrder  :'-'}</td>
                <td>{adExChangeDetailInfoState.currentRevision !==null ? adExChangeDetailInfoState.currentRevision.exchangeOrder  :'-'}</td>
              </tr>
            }
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>

      <SubmitContainer>
        <SubmitButton onClick={() => navigate('/board/platformAdExchange')}>목록</SubmitButton>
      </SubmitContainer>
    </>
  )
}

export default PlatformAdExchangeDetail
