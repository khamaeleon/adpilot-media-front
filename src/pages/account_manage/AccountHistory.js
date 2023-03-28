import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  inputStyle,
  RowSpan,
  SearchButton,
  SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  accountHistoryColumns,
  accountHistoryDataAtom,
  accountHistorySetting, searchAccountHistoryAtom,
  searchAccountParams,
  searchAccountType
} from "./entity";
import {accountHistoryTableData} from "../../services/AccountAdminAxios";
import {dateFormat} from "../../common/StringUtils";
import {ToastContainer} from "react-toastify";
import {tokenResultAtom} from "../login/entity";
import {AdminInfo} from "../layout";
import {userAccountHistoryTableData} from "../../services/AccountUserAxios";
import {AccountCondition} from "../../components/Account/Condition";


function AccountHistory() {
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useAtom(searchAccountHistoryAtom)

  useEffect(() => {
    handleHistoryTableData()
  }, [])

  const handleHistoryTableData = async () => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    if(tokenResultInfo.role !== 'NORMAL') { // 어드민 계정
      const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
      adminInfoState.accountProfile && accountHistoryTableData(userName,searchAccountHistoryParamsState).then(response => {
        response !== null && setAccountHistoryDataState(response)
      })
    } else {
      userAccountHistoryTableData(tokenResultInfo.id, searchAccountHistoryParamsState).then( response => {
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
