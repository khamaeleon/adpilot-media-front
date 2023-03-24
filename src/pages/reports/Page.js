import React, {useCallback, useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  ReportsDetail,
  BoardSearchResult,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsInventoryAtom,
  reportsStaticsInventory,
  reportsInventoryDetailAtom,
  reportsStaticsInventoryColumn,
  reportsStaticsInventoryDetail,
  reportsStaticsInventoryDetailColumn,
} from "./entity";
import { useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {
  selectStaticsAll,
  selectStaticsInventory,
  selectStaticsInventoryDetail, selectStaticsMedia,
} from "../../services/ReportsAxios";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";
import {useSetAtom} from "jotai";
import {AdminInfo} from "../layout";
import {selUserByUserId} from "../../services/ManageUserAxios";
import {sort} from "./sortList";
import {tokenResultAtom} from "../login/entity";
/** 지변별 모달 컴포넌트 **/
function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsInventoryDetail)
  const [userId, setUserId] = useState('')
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)
  const tokenUserInfo = useAtomValue(tokenResultAtom)

  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL'){
      if(localStorage.getItem('mediaUsername')) {
        selUserByUserId(localStorage.getItem('mediaUsername')).then(response => {
          setUserId(response?.id)
        })
      } else{
        setUserId('')
      }
    } else {
      selUserByUserId(tokenUserInfo.id).then(response => {
        setUserId(response?.id)
      })
    }
  }, [adminInfoState]);

  const dataSource = useCallback( async ({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: limit,
      currentPage: skip+1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    const fetchData = await selectStaticsInventoryDetail(userId,props.inventoryId, condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    });
    return fetchData

  },[props.inventoryId,searchCondition,dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsInventoryDetailColumn}
                 data={dataSource}/>
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
function ReportsPage(props){
  const {userId} = props
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryAtom)
  const dataStaticsInventory = useAtomValue(reportsStaticsInventory)
  const [totalCount, setTotalCount] = useState(0)
  const handleSearchCondition = async({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: limit,
      currentPage: skip+1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    const fetchData = await selectStaticsInventory(userId, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
    return fetchData
  }

  const dataSource = useCallback(handleSearchCondition ,[searchCondition,dataStaticsInventory]);

  return(
    <Board>
      <BoardHeader>지면별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <Table columns={reportsStaticsInventoryColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}/>
      </BoardSearchResult>
    </Board>
  )
}

export default ReportsPage
