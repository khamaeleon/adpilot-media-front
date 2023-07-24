import {useAtomValue} from "jotai";
import {reportsInventoryDetail, reportsStaticsInventoryDetailColumn,} from "../../pages/reports/entity/inventory";
import {UserInfo} from "../../pages/layout";
import React, {useCallback, useState} from "react";
import {sort} from "./sortList";
import {
  selectAdminStaticsInventoryDetail,
  selectUserStaticsInventoryDetail
} from "../../services/reports/inventoryAxios";
import {selectStaticsMediaDetail} from "../../services/reports/mediaAxios"
import {ModalBody, ModalContainer, ModalHeader} from "../modal/Modal";
import {ReportsCondition} from "./Condition";
import Table from "../table";
import {
  reportsMediaDetailAtom,
  reportsStaticsMediaDetail,
  reportsStaticsMediaDetailColumn
} from "../../pages/reports/entity/media";
import {lockedRows, summaryReducer} from "../../pages/reports/entity/common";
import {tokenResultAtom} from "../../pages/login/entity";

/** 지변별 모달 컴포넌트 **/
export function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useState(reportsInventoryDetail)
  const [searchState, setSearchState] = useState(reportsInventoryDetail)
  const userInfoState = useAtomValue(UserInfo)
  const tokenInfoState = useAtomValue(tokenResultAtom)
  /**
   * 데이터 페칭 (함수없이 짧게 만듬)
   * @param event
   */
  const dataSource = useCallback( async ({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('DATE_DESC',sortInfo)
    }
    if(tokenInfoState.role !== 'NORMAL') {
      return await selectAdminStaticsInventoryDetail(userInfoState.id, props.inventoryId, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          return {data, count: response.totalCount}
        }
      })
    } else {
      return await selectUserStaticsInventoryDetail(userInfoState.id, props.inventoryId, condition).then(response => {
        if(response !== null) {
          const data = response.rows
          return {data, count: response.totalCount}
        }
      })
    }

  },[userInfoState,props.inventoryId,searchCondition]);

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  return (
    <div>
      <ModalHeader title={`${props.inventoryName !== undefined ?  props.inventoryName : '지면명'} 일자별 통계`}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchState={searchState} setSearchState={setSearchState} onSearch={onSearch} modalStyle={true}/>
          <Table columns={reportsStaticsInventoryDetailColumn}
                 lockedRows={lockedRows}
                 summaryReducer={summaryReducer}
                 data={dataSource}
                 pagination={true}
                 defaultSortInfo={{name:"historyDate", dir: -1}}
                 livePagination={true}
                 scrollThreshold={0.7}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}

/** 매체별 모달 컴포넌트**/
export function ReportsMediaModalComponent(props) {
  const [searchCondition, setSearchCondition] = useState(reportsMediaDetailAtom)
  const [searchState, setSearchState] = useState(reportsMediaDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMediaDetail)

  /**
   * 데이터 페칭 (함수없이 짧게 만듬)
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('DATE_DESC',sortInfo)
    }
    return await selectStaticsMediaDetail(props.userId, condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    })
  }, [props.userId,searchCondition]);

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  return (
    <div>
      <ModalHeader title={`${props.siteName !== undefined ?  props.siteName : '매체명'} 일자별 통계`}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchState={searchState} setSearchState={setSearchState} onSearch={onSearch} modalStyle={true}/>
          <Table columns={reportsStaticsMediaDetailColumn}
                 lockedRows={lockedRows}
                 summaryReducer={summaryReducer}
                 defaultSortInfo={{name:"historyDate", dir: -1}}
                 data={dataSource}
                 pagination={true}
                 livePagination={true}
                 scrollThreshold={0.7}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}


