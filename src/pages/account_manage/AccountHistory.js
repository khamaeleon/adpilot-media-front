import {Board, BoardHeader, BoardTableContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {accountHistoryColumns, accountHistoryDataAtom, accountHistorySetting, searchAccountParams} from "./entity";
import {accountHistoryTableData} from "../../services/account/AccountAdminAxios";
import {ToastContainer} from "react-toastify";
import {tokenResultAtom} from "../login/entity";
import {AdminInfo} from "../layout";
import {userAccountHistoryTableData} from "../../services/account/AccountUserAxios";
import {AccountCondition} from "../../components/Account/Condition";


function AccountHistory() {
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)

  useEffect(() => {
    handleHistoryTableData()
  }, [])

  const handleHistoryTableData = async () => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    if(tokenResultInfo.role !== 'NORMAL') { // 어드민 계정
      const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
      accountHistoryTableData(userName,searchAccountHistoryParamsState).then(response => {
        response !== null && setAccountHistoryDataState(response)
      })
    } else {
      userAccountHistoryTableData(tokenResultInfo.username, searchAccountHistoryParamsState).then( response => {
        response !== null && setAccountHistoryDataState(response)
      })
    }
  }

  return (
    <>
      <Board>
        <BoardHeader>정산 이력</BoardHeader>
        <AccountCondition handleHistoryTableData={handleHistoryTableData} searchAccount={searchAccountHistoryParamsState} setSearchAccount={setSearchAccountHistoryParamsState} />
        <BoardTableContainer>
          <Table columns={accountHistoryColumns}
                 data={accountHistoryDataState}
                 settings={accountHistorySetting}
                 showHoverRows={false}
                 activeCell={[0]}
                 emptyText={'정산 이력 내역이 없습니다.'}/>
        </BoardTableContainer>
      </Board>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </>
  )
}

export default AccountHistory
