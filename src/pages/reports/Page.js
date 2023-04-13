import React, {useCallback, useEffect, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {reportsInventoryAtom, reportsStaticsInventoryColumn,} from "./entity/inventory";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {selectStaticsInventory,} from "../../services/reports/inventoryAxios";
import {ReportsCondition} from "../../components/reports/Condition";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {ReportsInventoryModalComponent} from "../../components/reports/ModalComponents";
import {useResetAtom} from "jotai/utils";

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
  const [totalCount, setTotalCount] = useState(0)
  const resetAtom = useResetAtom(reportsInventoryAtom)

  useEffect(() => {
    return () => {
      resetAtom()
    }
  }, []);

  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    return await selectStaticsInventory(userInfoState.id, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
  }

  const dataSource = useCallback(handleSearchCondition ,[searchCondition]);

  return(
    <Board>
      <BoardHeader>지면별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <Table columns={reportsStaticsInventoryColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}
               pagination={true}
               livePagination={true}
               scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}

export default ReportsPage
