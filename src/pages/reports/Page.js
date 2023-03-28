import React, {useCallback, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsInventoryAtom,
  reportsInventoryDetailAtom,
  reportsStaticsInventory,
  reportsStaticsInventoryColumn,
  reportsStaticsInventoryDetail,
  reportsStaticsInventoryDetailColumn,
} from "./entity";
import {useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {selectStaticsInventory, selectStaticsInventoryDetail,} from "../../services/ReportsAxios";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";
import {useSetAtom} from "jotai";
import {sort} from "./sortList";
import {UserInfo} from "../layout";
import {ReportsInventoryModalComponent} from "../../components/reports/ModalComponents";

/** 지면별 모달 파라미터 전달**/
export function ReportsInventoryModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = async () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsInventoryModalComponent inventoryId={props.inventoryId}/>
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
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryAtom)
  const dataStaticsInventory = useAtomValue(reportsStaticsInventory)
  const [totalCount, setTotalCount] = useState(0)
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    const fetchData = await selectStaticsInventory(userInfoState.id,condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
    return fetchData
  }

  const dataSource = useCallback(handleSearchCondition ,[userInfoState,dataStaticsInventory]);

  return(
    <Board>
      <BoardHeader>지면별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <Table columns={reportsStaticsInventoryColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}
               rowHeight={70}
               pagination={true}
               livePagination={true}
               scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}

export default ReportsPage
