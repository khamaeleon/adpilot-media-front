import React, {useCallback, useEffect, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsInventoryAtom,
  reportsInventoryDetailAtom,
  reportsStaticsInventory,
  reportsStaticsInventoryColumn,
  reportsStaticsInventoryDetail,
  reportsStaticsInventoryDetailColumn, userIdAtom,
} from "./entity";
import {useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {
  selectStaticsInventory,
  selectStaticsInventoryDetail,
  selectStaticsUserInventory, selectStaticsUserInventoryDetail,
} from "../../services/ReportsAxios";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";
import {useSetAtom} from "jotai";
import {sort} from "./sortList";
/** 지변별 모달 컴포넌트 **/
function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsInventoryDetail)
  const userId = useAtomValue(userIdAtom)

  const dataSource = useCallback( async ({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    if(userId !== '' && userId !== undefined) {
      const fetchData = await selectStaticsUserInventoryDetail(userId, props.inventoryId, condition).then(response => {
        const data = response.rows
        return {data, count: response.totalCount}
      });
      return fetchData
    } else {
      const fetchData = await selectStaticsInventoryDetail(props.inventoryId, condition).then(response => {
        const data = response.rows
        return {data, count: response.totalCount}
      });
      return fetchData
    }

  },[props.inventoryId,searchCondition,dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsInventoryDetailColumn}
                 data={dataSource}
                 pagination={true}
                 livePagination={true}
                 scrollThreshold={0.7}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}
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
  const userId = useAtomValue(userIdAtom)
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
    if(userId !== '' && userId !== undefined) {
      const fetchData = await selectStaticsUserInventory(userId, condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      })
      return fetchData
    } else {
      const fetchData = await selectStaticsInventory(condition).then(response => {
        const data = response.rows
        setTotalCount(response.totalCount)
        return {data, count: response.totalCount}
      })
      return fetchData
    }
  }

  const dataSource = useCallback(handleSearchCondition ,[searchCondition,dataStaticsInventory]);

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
