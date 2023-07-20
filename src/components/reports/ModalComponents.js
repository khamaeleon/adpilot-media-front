import {useAtom, useAtomValue} from "jotai";
import {
  reportsInventoryDetail,
  reportsStaticsInventoryDetailColumn,
} from "../../pages/reports/entity/inventory";
import {UserInfo} from "../../pages/layout";
import React, {useCallback, useEffect} from "react";
import {sort} from "./sortList";
import {selectStaticsInventoryDetail} from "../../services/reports/inventoryAxios";
import {selectStaticsMediaDetail} from "../../services/reports/mediaAxios"
import {ModalBody, ModalContainer, ModalHeader} from "../modal/Modal";
import {ReportsCondition} from "./Condition";
import Table from "../table";
import {useResetAtom} from "jotai/utils";
import {
  reportsMediaDetailAtom,
  reportsStaticsMediaDetail,
  reportsStaticsMediaDetailColumn
} from "../../pages/reports/entity/media";
import {lockedRows, summaryReducer} from "../../pages/reports/entity/common";
import {useState} from "react";

/** 지변별 모달 컴포넌트 **/
export function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useState(reportsInventoryDetail)
  const [searchState, setSearchState] = useState(reportsInventoryDetail)
  const userInfoState = useAtomValue(UserInfo)
  /**
   * 데이터 페칭 (함수없이 짧게 만듬)
   * @param event
   */
  const dataSource = useCallback( async ({skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    return await selectStaticsInventoryDetail(userInfoState.id, props.inventoryId, condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    })
  },[userInfoState,props.inventoryId,searchCondition]);

  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  return (
    <div>
      <ModalHeader title={'지면명 일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchState={searchState} setSearchState={setSearchState} onSearch={onSearch} modalStyle={true}/>
          <Table columns={reportsStaticsInventoryDetailColumn}
                 lockedRows={lockedRows}
                 summaryReducer={summaryReducer}
                 data={dataSource}
                 pagination={true}
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
      sortType: sort('DATE_ASC',sortInfo)
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
      <ModalHeader title={'매체명 일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchState={searchState} setSearchState={setSearchState} onSearch={onSearch} modalStyle={true}/>
          <Table columns={reportsStaticsMediaDetailColumn}
                 lockedRows={lockedRows}
                 summaryReducer={summaryReducer}
                 data={dataSource}
                 pagination={true}
                 livePagination={true}
                 scrollThreshold={0.7}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}


