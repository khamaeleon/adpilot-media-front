import {useAtom, useAtomValue} from "jotai";
import {
  reportsInventoryDetailAtom,
  reportsMediaDetailAtom,
  reportsStaticsInventoryDetailColumn,
  reportsStaticsMediaDetail,
  reportsStaticsMediaDetailColumn
} from "../../pages/reports/entity";
import {UserInfo} from "../../pages/layout";
import React, {useCallback, useEffect} from "react";
import {sort} from "../../pages/reports/sortList";
import {selectStaticsInventoryDetail, selectStaticsMediaDetail} from "../../services/ReportsAxios";
import {ModalBody, ModalContainer, ModalHeader} from "../modal/Modal";
import {ReportsCondition} from "./Condition";
import Table from "../table";
import {useResetAtom} from "jotai/utils";

/** 지변별 모달 컴포넌트 **/
export function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryDetailAtom)
  const userInfoState = useAtomValue(UserInfo)
  const resetSearchCondition = useResetAtom(reportsInventoryDetailAtom)
  /**
   * 검색조건 초기화
   */
  useEffect(() => {
    resetSearchCondition()
  }, []);

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
    const fetchData = await selectStaticsInventoryDetail(userInfoState.id,props.inventoryId, condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    });
    return fetchData
  },[userInfoState,props.inventoryId,searchCondition]);

  return (
    <div>
      <ModalHeader title={'지면별 보고서 상세'}/>
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

/** 매체별 모달 컴포넌트**/
export function ReportsMediaModalComponent(props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMediaDetail)
  const resetSearchCondition = useResetAtom(reportsMediaDetailAtom)
  /**
   * 검색조건 초기화
   */
  useEffect(() => {
    resetSearchCondition()
  }, []);
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
    const fetchData = await selectStaticsMediaDetail(props.userId, condition).then(response => {
      const data = response.rows
      return {data, count: response.totalCount}
    })
    return fetchData
  }, [props.userId,searchCondition, dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'매체별 통계 상세'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsMediaDetailColumn}
                 data={dataSource}
                 pagination={true}
                 livePagination={true}
                 scrollThreshold={0.7}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}