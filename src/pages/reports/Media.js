import React, {useCallback, useEffect, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import {reportsMediaAtom, reportsStaticsInventoryByMediaColumn, reportsStaticsMediaColumn,} from "./entity/media";
import {modalController} from "../../store";
import {selectStaticsInventoryByMedia, selectStaticsMedia,} from "../../services/reports/mediaAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {useAtom, useSetAtom} from "jotai";
import {sort} from "../../components/reports/sortList";
import {ReportsMediaModalComponent} from "../../components/reports/ModalComponents";
import {useResetAtom} from "jotai/utils";
import {lockedRows, summaryReducer} from "./entity/common";

/** 매체별 모달 전달자 **/
export function ReportsMediaModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = () => {
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
  const resetAtom = useResetAtom(reportsMediaAtom)

  useEffect(() => {
    return () => {
      resetAtom()
    }
  }, []);
  /**
   * 기본 데이타 페칭 (인피니티 포함)
   * @param event
   */
  const dataSource = useCallback( async ({skip, sortInfo, limit}) => {
    console.log(sortInfo)
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('SITE_NAME_ASC',sortInfo)
    }
    return await selectStaticsMedia(condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
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
    return await selectStaticsInventoryByMedia(userId, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
  },[searchCondition])

  return(
    <Board>
      <BoardHeader>매체별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsMediaColumn}
                     lockedRows={lockedRows}
                     summaryReducer={summaryReducer}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsInventoryByMediaColumn}
                     idProperty={'userId'}
                     defaultSortInfo={{name:"inventoryName", dir: -1}}
                     onLoadingChange={setLoading}
                     totalCount={[totalCount,'보고서']}
                     pagination
                     livePagination
                     scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}
