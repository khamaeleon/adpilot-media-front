import {Board, BoardHeader, BoardTableContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {accountDataColumns, accountDataSetting, accountHistoryDataAtom, searchAccountParams} from "./entity";
import {accountCreateInvoiceRecord, accountHistoryTableData} from "../../services/account/AccountAdminAxios";
import {SearchUser} from "../../components/common/SearchUser";
import {AdminInfo} from "../layout";
import {confirmAlert} from "react-confirm-alert";
import {AccountCondition} from "../../components/Account/Condition";

function AccountData() {
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)

  const handleHistoryTableData = async () => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
    const fetchData = await accountHistoryTableData(userName,searchAccountHistoryParamsState).then(response => {
      const data = response
      response !== null && setAccountHistoryDataState(response)
      return data
    })
    return fetchData
  }
  useEffect(() => {
    handleHistoryTableData()
  }, []);


  /**
   * 모달안에 매체 검색 선택시
   */
  const handleHistoryAdd = (params) => {
    accountCreateInvoiceRecord(params).then(response => {
      response ? handleHistoryTableData() : confirmAlert({
        title: '이력 추가',
        message: '정산 프로필이 없습니다.',
        buttons: [
          {
            label: '확인',
          }
        ]
      });
    })
  }

  return (
    <>
      <Board>
        <BoardHeader>데이터 관리</BoardHeader>
        <AccountCondition searchAccount={searchAccountHistoryParamsState} setSearchAccount={setSearchAccountHistoryParamsState} handleHistoryTableData={handleHistoryTableData}/>
        <BoardTableContainer>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}><SearchUser title={'이력 추가'} className={'listUp'} onSubmit={handleHistoryAdd} btnStyle={'historyAddButton'} historyAdd={true}/></div>
          <Table columns={accountDataColumns}
                 data={accountHistoryDataState}
                 emptyText={'정산 데이터 관리 내역이 없습니다.'}
                 settings={accountDataSetting}
          />
        </BoardTableContainer>
      </Board>
    </>
  )
}

export default AccountData
