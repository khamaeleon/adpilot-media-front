import React, {useCallback, useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  ReportsDetail,
  BoardSearchResult,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsMediaAtom,
  reportsStaticsMedia,
  reportsMediaDetailAtom,
  reportsStaticsMediaColumn,
  reportsStaticsMediaDetail,
  reportsStaticsMediaDetailColumn,
  reportsStaticsInventoryByMediaColumn,
} from "./entity";
import { useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {
  selectStaticsMedia,
  selectStaticsMediaDetail,
  selectStaticsInventoryByMedia,
} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";
import {useSetAtom} from "jotai";
import {sort} from "./sortList";
/** 매체별 모달 컴포넌트**/
function ReportsMediaModalComponent(props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMediaDetail)
  /**
   * 데이터 페칭 (함수없이 짧게 만듬)
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: limit,
      currentPage: skip+1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    const fetchData = await selectStaticsMediaDetail(props.userId, condition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsMedia.rows
    }
  }, [props.userId,searchCondition, dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsMediaDetailColumn}
                 data={dataSource}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}
/** 매체별 모달 전달자 **/
export function ReportsMediaModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = async () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsMediaModalComponent userId={props.userId}/>
      }
    })
  }

  return (
    <ReportsDetail onClick={(e) => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}
/** 매체별 보고서 **/
export default function  ReportsMedia(){
  const [searchCondition, setSearchCondition] = useAtom(reportsMediaAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsMedia)
  const [, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  /**
   * 기본 데이타 페칭 (인피니티 포함)
   * @param event
   */
  const dataSource = useCallback( async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: limit,
      currentPage: skip+1,
      sortType: sort('SITE_NAME_ASC',sortInfo)
    }
    const fetchData = await selectStaticsMedia(condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    });
    return fetchData
  },[searchCondition]);
  /**
   * 상세 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = useCallback(async ({userId}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: 1,
      sortType: sort('INVENTORY_NAME_ASC',null)
    }
    const fetchData = await selectStaticsInventoryByMedia(userId,condition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsMedia.rows
    }
  },[])

  return(
    <Board>
      <BoardHeader>매체별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsMediaColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsInventoryByMediaColumn}
                     idProperty={'userId'}
                     onLoadingChange={setLoading}
                     totalCount={[totalCount,'보고서']}
                     pagination
                     livePagination
                     scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}
