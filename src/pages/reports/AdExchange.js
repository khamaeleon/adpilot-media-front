import React, {useCallback, useEffect, useState} from "react";
import {useAtom, useAtomValue} from "jotai";
import {Board, BoardHeader, BoardSearchResult,} from "../../assets/GlobalStyles";
import {
  reportsAdExchangeAtom,
  reportsStaticsAdExchangeByInventoryColumn,
  reportsStaticsAdExchangeColumn,
} from "./entity/adexchange";
import {selectStaticsAdExchange, selectStaticsAdExchangeByInventory,} from "../../services/reports/adExchangeAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";
import {sort} from "../../components/reports/sortList";
import {UserInfo} from "../layout";
import {useResetAtom} from "jotai/utils";

/**
 * 스타일
 * @param event
 */
const groupStyle = {
  textAlign: 'center',
}

const groups = [
  {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
  {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
]
/** 외부연동수신 보고서 **/
export default function ReportsAdExchange() {
  const [searchCondition, setSearchCondition] = useAtom(reportsAdExchangeAtom)
  const [totalCount, setTotalCount] = useState(0)
  const userInfoState = useAtomValue(UserInfo)
  const resetAtom = useResetAtom(reportsAdExchangeAtom)

  useEffect(() => {
    return () => {
      resetAtom()
    }
  }, []);
  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = useCallback(async ({inventoryId}) => {
    console.log(inventoryId)
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: 1,
      sortType: sort('INVENTORY_NAME_ASC',null)
    }
    return await selectStaticsAdExchangeByInventory(userInfoState.id, inventoryId, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })

  },[searchCondition])

  /**
   * 기본 데이타
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 30,
      currentPage: skip/limit === 0 ? 1 : (skip/limit) + 1,
      sortType: sort('INVENTORY_NAME_ASC',sortInfo)
    }
    return await selectStaticsAdExchange(userInfoState.id, condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    })

  }, [userInfoState,searchCondition]);

  return (
    <Board>
      <BoardHeader>외부 연동 수신 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsAdExchangeColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsAdExchangeByInventoryColumn}
                     detailGroups={groups}
                     idProperty={'inventoryId'}
                     totalCount={[totalCount, '보고서']}
                     groups={groups}
                     style={{minHeight: 500}}/>
      </BoardSearchResult>
    </Board>
  )
}
