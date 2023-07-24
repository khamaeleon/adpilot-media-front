import React, {useCallback, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {reportsInventory, reportsStaticsInventoryColumn, reportsUserStaticsInventoryColumn,} from "./entity/inventory";
import {useAtomValue, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {selectAdminStaticsInventory, selectUserStaticsInventory,} from "../../services/reports/inventoryAxios";
import {ReportsCondition} from "../../components/reports/Condition";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {ReportsInventoryModalComponent} from "../../components/reports/ModalComponents";
import {lockedRows, summaryReducer} from "./entity/common";
import {tokenResultAtom} from "../login/entity";

/** 지면별 모달 파라미터 전달**/
export function ReportsInventoryModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = async () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsInventoryModalComponent inventoryId={props.inventoryId} inventoryName={props.inventoryName}/>
      }
    })
  }

  return (
    <ReportsDetail onClick={async(e) => {
      e.stopPropagation()
      await handleClick()
    }}/>
  )
}
/** 지면별 보고서 **/
function ReportsPage(){
  const userInfoState = useAtomValue(UserInfo)
  const [searchCondition, setSearchCondition] = useState(reportsInventory)
  const [searchState, setSearchState] = useState(reportsInventory)
  const [totalCount, setTotalCount] = useState(0)
  const tokenInfoState = useAtomValue(tokenResultAtom)
  const [creativeInfo, setCreativeInfo] = useState({})
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    if(tokenInfoState.role !== 'NORMAL') {
      return await selectAdminStaticsInventory(creativeInfo.id, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    } else {
      return await selectUserStaticsInventory(tokenInfoState.id, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          setTotalCount(response.totalCount)
          return {data, count: response.totalCount}
        }
      })
    }
  }

  const dataSource = useCallback(handleSearchCondition ,[searchCondition, creativeInfo]);

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  const handleSearchAdvertiser = (data) => {
    console.log(data)
    setCreativeInfo(data)
  }

  const handleClickReset = () => {
    setCreativeInfo({})
  }
  return(
    <Board>
      <BoardHeader>지면별 보고서</BoardHeader>
      <ReportsCondition searchMediaInfo={creativeInfo} searchMedia={handleSearchAdvertiser} searchMediaReset={handleClickReset} searchState={searchState} setSearchState={setSearchState} onSearch={onSearch}/>
      <BoardSearchResult>
        <Table columns={userInfoState.email !== '' ? reportsUserStaticsInventoryColumn : reportsStaticsInventoryColumn}
               lockedRows={lockedRows}
               summaryReducer={summaryReducer}
               totalCount={[totalCount,'보고서']}
               defaultSortInfo={{name:"inventoryName", dir: -1}}
               data={dataSource}
               pagination={true}
               livePagination={true}
               scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}

export default ReportsPage
