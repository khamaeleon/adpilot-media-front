import React, {useCallback, useEffect, useState} from "react";
import {Board, BoardHeader, BoardSearchResult, ReportsDetail,} from "../../assets/GlobalStyles";
import {reportsMedia, reportsStaticsInventoryByMediaColumn, reportsStaticsMediaColumn,} from "./entity/media";
import {modalController} from "../../store";
import {selectStaticsInventoryByMedia, selectStaticsMedia,} from "../../services/reports/mediaAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {useAtomValue, useSetAtom} from "jotai";
import {sort} from "../../components/reports/sortList";
import {ReportsMediaModalComponent} from "../../components/reports/ModalComponents";
import {lockedRows, rowDetailsDataAtom, summaryReducer, tableIdAtom} from "./entity/common";
import {UserInfo} from "../layout";

/** 매체별 모달 전달자 **/
export function ReportsMediaModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsMediaModalComponent userId={props.userId} siteName={props.siteName}/>
      }
    })
  }
  useEffect(()=>{
    return () => {
      setModal({isShow:false});
    }
  },[])
  return (
    <ReportsDetail onClick={(e) => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}

/** 매체별 보고서 **/
export default function  ReportsMedia(){
  const [searchCondition, setSearchCondition] = useState(reportsMedia)
  const [searchState, setSearchState] = useState(reportsMedia)
  const [, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const userInfoState = useAtomValue(UserInfo)
  const setRowDetailData = useSetAtom(rowDetailsDataAtom)
  const tableId = useAtomValue(tableIdAtom)
  /**
   * 기본 데이타 페칭 (인피니티 포함)
   * @param event
   */
  const fetchData = () => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: 1,
      sortType: sort('INVENTORY_NAME_DESC',null)
    }
    selectStaticsInventoryByMedia(tableId?.userId, condition).then(response => {
      const data = response.rows
      console.log(data)
      setRowDetailData(data)
    })
  }

  useEffect(() => {
    if(tableId !== null) {
      fetchData()
    }
  }, [tableId,searchCondition]);

  /**
   * 상세 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = useCallback(fetchData,[])

  const dataSource = useCallback( async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('SITE_NAME_DESC',sortInfo)
    }
    return await selectStaticsMedia(condition).then(response => {
      let data = response.rows
      if(userInfoState?.id !== ''){
        data = data.filter(d=>d.userId === userInfoState?.id);
      }
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })
  },[searchCondition, userInfoState]);


  const onSearch = () => {
    setSearchCondition({
      ...searchState
    })
  }

  return(
    <Board>
      <BoardHeader>매체별 보고서</BoardHeader>
      <ReportsCondition searchState={searchState} setSearchState={setSearchState} onSearch={onSearch}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsMediaColumn}
                     lockedRows={lockedRows}
                     summaryReducer={summaryReducer}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsInventoryByMediaColumn}
                     idProperty={'userId'}
                     defaultSortInfo={{name:"siteName", dir: -1}}
                     onLoadingChange={setLoading}
                     totalCount={[totalCount,'보고서']}
                     pagination
                     livePagination
                     scrollThreshold={0.7}/>
      </BoardSearchResult>
    </Board>
  )
}
