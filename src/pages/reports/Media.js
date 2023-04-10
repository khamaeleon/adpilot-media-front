import React, {useCallback, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import {reportsMediaAtom, reportsStaticsInventoryByMediaColumn, reportsStaticsMediaColumn,} from "./entity/media";
import {modalController} from "../../store";
import {selectStaticsInventoryByMedia, selectStaticsMedia,} from "../../services/reports/mediaAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {useAtom, useSetAtom} from "jotai";
import {sort} from "../../components/reports/sortList";
import {ReportsMediaModalComponent} from "../../components/reports/ModalComponents";

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
  const [, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  /**
   * 기본 데이타 페칭 (인피니티 포함)
   * @param event
   */
  const dataSource = useCallback( async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
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
  const handleFetchDetailData = useCallback(async ({userId,skip,limit,sortInfo}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',null)
    }
    const fetchData = await selectStaticsInventoryByMedia(userId,condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
    return fetchData
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
                     rowHeight={70}
                     pagination
                     livePagination
                     scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}
